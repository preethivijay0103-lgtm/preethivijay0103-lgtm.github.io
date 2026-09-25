import { brand } from '../config/brand'
import { ButtonLink, Card, Section } from '../ui'

export const POLICY = [
  {
    title: 'Payment before cooking',
    text: 'We confirm every order on WhatsApp and share UPI details. Your first box is cooked only after payment is received.',
  },
  {
    title: 'Skipping a day',
    text: `Tell us on WhatsApp by ${brand.orderCutoff}. That box is not cooked and not charged, and the day moves to the end of your plan.`,
  },
  {
    title: 'Late or missed pickup',
    text: 'Boxes not collected by 9:00 am are kept chilled until 10:30 am. After that the box is charged, because it has already been cooked.',
  },
  {
    title: 'If we are late',
    text: 'If your box is not ready at 6:00 am, that day is not charged.',
  },
  {
    title: 'Refunds',
    text: 'Unused days are refunded to the same UPI account within 3 working days of your request.',
  },
  {
    title: 'Prices',
    text: 'Everyone pays the same listed price. We do not run discounts or offers.',
  },
  {
    title: 'Food safety',
    text: 'Keep the box cold and eat it the same morning. Tell us about allergies before your first box; our kitchen uses nuts, dairy, egg and sesame.',
  },
]

export function Policy() {
  return (
    <Section
      eyebrow="Cancellation policy"
      title="Clear rules, no surprises"
      subtitle="Please read this before you order. You will be asked to accept it when you register."
    >
      <Card className="divide-y divide-stone-100">
        {POLICY.map((item, index) => (
          <div key={item.title} className="flex gap-4 p-6">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-leaf-100 text-sm font-bold text-leaf-900">
              {index + 1}
            </span>
            <div>
              <h3 className="font-sans text-lg font-semibold text-leaf-900">{item.title}</h3>
              <p className="mt-1 text-stone-600">{item.text}</p>
            </div>
          </div>
        ))}
      </Card>
      <div className="mt-8">
        <ButtonLink to="/register">I understand, register and order</ButtonLink>
      </div>
    </Section>
  )
}
