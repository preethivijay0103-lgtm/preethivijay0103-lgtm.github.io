import { Field, Form, Formik } from 'formik'
import type { FormikErrors, FormikTouched } from 'formik'
import { CircleCheck, MessageCircle } from 'lucide-react'
import { useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import * as yup from 'yup'
import { brand } from '../config/brand'
import { DIETS, LAUNCH_OFF_PERCENT, PLANS, SIZES, formatRupees, planTotal, salePricePerDay } from '../features/catalog/data'
import type { Diet, PlanId, Size } from '../features/catalog/data'
import { formatDay, isValidStart, planDates, startOptions } from '../features/order/dates'
import { loadDetails, saveDetails } from '../features/order/storage'
import { orderMessage, whatsappUrl } from '../features/order/whatsapp'
import type { OrderDetails } from '../features/order/whatsapp'
import { Button, Card, Section, Toggle, inputClass } from '../ui'

type FormValues = OrderDetails & { policy: boolean }

export function normalisePhone(value: string): string {
  const digits = value.replace(/\D/g, '')
  return digits.length === 12 && digits.startsWith('91') ? digits.slice(2) : digits
}

const schema = yup.object({
  name: yup.string().trim().min(2, 'Please enter your name').required('Please enter your name'),
  phone: yup
    .string()
    .required('Please enter your mobile number')
    .test('phone', 'Enter a 10-digit Indian mobile number', (value) => /^[6-9]\d{9}$/.test(normalisePhone(value ?? ''))),
  area: yup.string().trim().required('Tell us your area, PG or gym'),
  start: yup
    .string()
    .required('Pick a start day')
    .test('cutoff', 'This day has passed the 9 pm cutoff. Please pick another day.', (value) =>
      Boolean(value && isValidStart(value, new Date())),
    ),
  notes: yup.string().max(300, 'Please keep notes under 300 characters'),
  policy: yup.boolean().oneOf([true], 'Please accept the Terms, Privacy Policy, and cancellation policy'),
})

function FieldError({
  name,
  errors,
  touched,
}: {
  name: keyof FormValues
  errors: FormikErrors<FormValues>
  touched: FormikTouched<FormValues>
}) {
  const message = touched[name] ? errors[name] : undefined
  return message ? <p className="mt-1 text-sm text-red-700">{String(message)}</p> : null
}

function Label({ htmlFor, children }: { htmlFor?: string; children: ReactNode }) {
  return (
    <label htmlFor={htmlFor} className="mb-2 block text-sm font-semibold text-leaf-900">
      {children}
    </label>
  )
}

function sendToSheet(order: OrderDetails) {
  if (!brand.sheetWebhookUrl) return
  void fetch(brand.sheetWebhookUrl, {
    method: 'POST',
    mode: 'no-cors',
    body: JSON.stringify({ ...order, total: planTotal(order.size, order.plan), sentAt: new Date().toISOString() }),
  }).catch(() => undefined)
}

export function Register() {
  const options = useMemo(() => startOptions(new Date()), [])
  const [sentUrl, setSentUrl] = useState<string | null>(null)

  const saved = loadDetails()
  const initialValues: FormValues = {
    name: saved.name ?? '',
    phone: saved.phone ?? '',
    area: saved.area ?? '',
    size: saved.size ?? 'lean',
    diet: saved.diet ?? 'nonveg',
    eatsEgg: saved.eatsEgg ?? false,
    drink: 'day',
    plan: 'trial',
    start: options[0],
    notes: saved.notes ?? '',
    policy: false,
  }

  if (sentUrl) {
    return (
      <Section>
        <Card className="mx-auto max-w-xl p-8 text-center">
          <CircleCheck className="mx-auto text-leaf-700" size={48} />
          <h1 className="mt-4 text-3xl font-bold text-leaf-900">Almost done</h1>
          <p className="mt-3 text-stone-600">
            WhatsApp should have opened with your order. Press send, and we will reply to confirm your
            order and share UPI details.
          </p>
          <a
            href={sentUrl}
            target="_blank"
            rel="noreferrer"
            className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-[#1EBE5B]"
          >
            <MessageCircle size={18} /> WhatsApp did not open? Tap here
          </a>
          <p className="mt-6 text-sm text-stone-500">
            <button type="button" className="underline" onClick={() => setSentUrl(null)}>
              Change my order
            </button>
          </p>
        </Card>
      </Section>
    )
  }

  return (
    <Section
      eyebrow="Register and order"
      title="Your breakfast box"
      subtitle="Fill this in once. When you press send, your order opens in WhatsApp for us to confirm. You pay by UPI on WhatsApp."
    >
      <Formik<FormValues>
        initialValues={initialValues}
        validationSchema={schema}
        onSubmit={(values) => {
          const phone = normalisePhone(values.phone)
          const order: OrderDetails = { ...values, phone: `+91 ${phone}` }
          saveDetails({
            name: values.name.trim(),
            phone,
            area: values.area.trim(),
            size: values.size,
            diet: values.diet,
            eatsEgg: values.eatsEgg,
            drink: 'day',
            notes: values.notes.trim(),
          })
          sendToSheet(order)
          const url = whatsappUrl(orderMessage(order))
          setSentUrl(url)
          window.open(url, '_blank', 'noopener')
        }}
      >
        {({ values, errors, touched, setFieldValue, isSubmitting }) => {
          const dates = planDates(values.start, PLANS[values.plan].days)
          return (
            <Form noValidate className="grid gap-8 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)]">
              <Card className="space-y-6 p-6 sm:p-8">
                <div className="grid gap-6 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="name">Your name</Label>
                    <Field id="name" name="name" autoComplete="name" className={inputClass} placeholder="Priya" />
                    <FieldError name="name" errors={errors} touched={touched} />
                  </div>
                  <div>
                    <Label htmlFor="phone">WhatsApp number</Label>
                    <div className="flex">
                      <span className="inline-flex items-center rounded-l-2xl bg-stone-100 px-3 text-stone-600 ring-1 ring-stone-300">
                        +91
                      </span>
                      <Field
                        id="phone"
                        name="phone"
                        type="tel"
                        inputMode="numeric"
                        autoComplete="tel-national"
                        className={`${inputClass} rounded-l-none`}
                        placeholder="98765 43210"
                      />
                    </div>
                    <FieldError name="phone" errors={errors} touched={touched} />
                  </div>
                </div>

                <div>
                  <Label htmlFor="area">Area, PG or gym</Label>
                  <Field
                    id="area"
                    name="area"
                    className={inputClass}
                    placeholder="e.g. Choodasandra, or the gym you go to"
                  />
                  <FieldError name="area" errors={errors} touched={touched} />
                </div>

                <div>
                  <Label>Size</Label>
                  <div role="radiogroup" aria-label="Size" className="grid gap-3 sm:grid-cols-2">
                    {(Object.keys(SIZES) as Size[]).map((size) => (
                      <ChoiceCard
                        key={size}
                        selected={values.size === size}
                        onSelect={() => setFieldValue('size', size)}
                        title={`${SIZES[size].label} — ${SIZES[size].proteinGrams} g protein`}
                        text={`${formatRupees(salePricePerDay(size))} a day. ${SIZES[size].blurb}`}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <Label>Food</Label>
                  <Toggle<Diet>
                    label="Diet"
                    value={values.diet}
                    onChange={(diet) => setFieldValue('diet', diet)}
                    options={[
                      { value: 'nonveg', label: DIETS.nonveg.label },
                      { value: 'veg', label: DIETS.veg.label },
                    ]}
                  />
                  {values.diet === 'veg' && (
                    <label className="mt-3 flex items-center gap-2 text-sm text-stone-700">
                      <Field type="checkbox" name="eatsEgg" className="h-4 w-4 accent-leaf-700" />
                      I eat egg
                    </label>
                  )}
                </div>

                <div>
                  <Label>Plan</Label>
                  <div role="radiogroup" aria-label="Plan" className="grid gap-3 sm:grid-cols-2">
                    {(Object.keys(PLANS) as PlanId[]).map((plan) => (
                      <ChoiceCard
                        key={plan}
                        selected={values.plan === plan}
                        onSelect={() => setFieldValue('plan', plan)}
                        title={`${PLANS[plan].label}, ${formatRupees(planTotal(values.size, plan))}`}
                        text={PLANS[plan].note}
                      />
                    ))}
                  </div>
                </div>

                <div>
                  <Label htmlFor="start">First box on</Label>
                  <Field as="select" id="start" name="start" className={inputClass}>
                    {options.map((day) => (
                      <option key={day} value={day}>
                        {formatDay(day)}
                      </option>
                    ))}
                  </Field>
                  <p className="mt-1 text-xs text-stone-500">
                    Order by {brand.orderCutoff}. {brand.pickupDays} only.
                  </p>
                  <FieldError name="start" errors={errors} touched={touched} />
                </div>

                <div>
                  <Label htmlFor="notes">Allergies or notes (optional)</Label>
                  <Field
                    as="textarea"
                    id="notes"
                    name="notes"
                    rows={3}
                    className={inputClass}
                    placeholder="e.g. no peanuts, less spicy"
                  />
                  <FieldError name="notes" errors={errors} touched={touched} />
                </div>
              </Card>

              <div className="lg:sticky lg:top-24 lg:self-start">
                <Card className="overflow-hidden">
                  <div className="bg-leaf-900 p-6 text-white">
                    <p className="text-sm text-leaf-100">Your order</p>
                    <p className="mt-1 font-display text-4xl font-bold">
                      {formatRupees(planTotal(values.size, values.plan))}
                    </p>
                    <p className="mt-1 text-sm text-leaf-100">
                      {PLANS[values.plan].days} x {formatRupees(salePricePerDay(values.size))}, {LAUNCH_OFF_PERCENT}% off while we start
                    </p>
                  </div>
                  <dl className="space-y-2 p-6 text-sm">
                    <Row label="Box" value="Breakfast box" />
                    <Row label="Size" value={SIZES[values.size].label} />
                    <Row
                      label="Food"
                      value={values.diet === 'veg' && values.eatsEgg ? 'Veg (eats egg)' : DIETS[values.diet].label}
                    />
                    <Row label="Drink" value="That day's drink" />
                    <Row label="Plan" value={PLANS[values.plan].label} />
                    <Row label="Days" value={dates.map(formatDay).join(', ')} />
                    <Row label="Pickup" value={`Gym ${brand.pickupHours}, or delivery ${brand.deliveryHours}`} />
                  </dl>
                  <div className="space-y-4 border-t border-stone-100 p-6">
                    <label className="flex items-start gap-3 text-sm text-stone-700">
                      <Field type="checkbox" name="policy" className="mt-0.5 h-5 w-5 shrink-0 accent-leaf-700" />
                      <span>
                        I have read and accept the{' '}
                        <Link to="/terms-and-conditions" target="_blank" className="font-semibold text-leaf-900 underline">
                          Terms and Conditions
                        </Link>
                        ,{' '}
                        <Link to="/privacy-policy" target="_blank" className="font-semibold text-leaf-900 underline">
                          Privacy Policy
                        </Link>
                        , and{' '}
                        <Link to="/cancellation-policy" target="_blank" className="font-semibold text-leaf-900 underline">
                          cancellation policy
                        </Link>
                      </span>
                    </label>
                    <FieldError name="policy" errors={errors} touched={touched} />
                    <Button
                      type="submit"
                      variant="whatsapp"
                      className="w-full py-4 text-base"
                      disabled={!values.policy || isSubmitting}
                    >
                      <MessageCircle size={20} /> Send order on WhatsApp
                    </Button>
                    <p className="text-center text-xs text-stone-500">
                      Nothing is charged here. We confirm and take UPI payment on WhatsApp.
                    </p>
                  </div>
                </Card>
              </div>
            </Form>
          )
        }}
      </Formik>
    </Section>
  )
}

function ChoiceCard({
  selected,
  onSelect,
  title,
  text,
}: {
  selected: boolean
  onSelect: () => void
  title: string
  text: string
}) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={selected}
      onClick={onSelect}
      className={`rounded-2xl p-4 text-left transition ${
        selected ? 'bg-leaf-50 ring-2 ring-leaf-700' : 'bg-white ring-1 ring-stone-300 hover:ring-leaf-700/50'
      }`}
    >
      <p className="font-semibold text-leaf-900">{title}</p>
      <p className="mt-1 text-sm text-stone-600">{text}</p>
    </button>
  )
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-stone-500">{label}</dt>
      <dd className="text-right font-medium text-ink">{value}</dd>
    </div>
  )
}
