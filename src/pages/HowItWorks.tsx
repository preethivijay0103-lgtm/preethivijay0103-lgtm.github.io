import { Bike, CalendarCheck, ChefHat, Flame, MapPin, MessageCircle, Utensils } from 'lucide-react'
import { brand } from '../config/brand'
import { ButtonLink, Card, Section } from '../ui'

const TIMELINE = [
  { icon: CalendarCheck, time: `By ${brand.orderCutoff}`, title: 'Order or skip', text: 'Register on the website, or message us on WhatsApp to skip a day.' },
  { icon: MessageCircle, time: 'Same evening', title: 'We confirm on WhatsApp', text: 'We check your order and share the UPI details. Cooking starts once paid.' },
  { icon: ChefHat, time: '4:30 am', title: 'We cook', text: 'Everything is made fresh that morning in our home kitchen.' },
  { icon: Flame, time: '5:30 am', title: 'Packed hot', text: 'Sealed box and drink bottle go into a bag with your name, still hot.' },
  { icon: MapPin, time: brand.pickupHours, title: 'Gym pickup', text: `Collect at the gym, ${brand.pickupArea}.` },
  { icon: Bike, time: brand.deliveryHours, title: 'Or we deliver', text: `Home or office delivery the same morning, ${brand.pickupArea}.` },
  { icon: Utensils, time: 'Same morning', title: 'You eat', text: 'Eat it the same morning while it is still warm, before or after training.' },
]

const FAQ = [
  { q: 'Do you deliver?', a: `Yes. Gym pickup is ${brand.pickupHours}, and delivery is ${brand.deliveryHours}. We cook from ${brand.pickupArea}. The exact pin is shared on WhatsApp.` },
  { q: 'Which days do you cook?', a: `${brand.pickupDays}. Saturday and Sunday are off.` },
  { q: 'Can I skip a day?', a: `Yes. Tell us on WhatsApp by ${brand.orderCutoff}. That day is not charged and moves to the end of your plan.` },
  { q: 'I am vegetarian but I eat egg.', a: 'Tick "I eat egg" when you register and we will plan your box around it.' },
  { q: 'Can I choose my drink?', a: 'No. Each morning has its own drink: fermented rice porridge, fruit juice, fermented pearl millet porridge, fermented finger millet porridge, or buttermilk.' },
  { q: 'I have an allergy.', a: 'Write it in the notes when you register. Our food uses nuts, dairy, egg and sesame, so please tell us before the first box.' },
  { q: 'How do I pay?', a: 'By UPI on WhatsApp after we confirm your order. There is no online payment on this website yet.' },
]

export function HowItWorks() {
  return (
    <>
      <Section eyebrow="How it works" title="From our kitchen to your gym bag" subtitle="A simple routine, every weekday morning.">
        <ol className="relative grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {TIMELINE.map(({ icon: Icon, time, title, text }, index) => (
            <li key={title}>
              <Card
                className={`h-full p-6 ${index === 0 ? 'checks-plum text-cream ring-0' : ''}`}
              >
                <div className="flex items-center gap-3">
                  <span
                    className={`grid h-11 w-11 place-items-center rounded-2xl ${
                      index === 0 ? 'bg-spice-800 text-leaf-900' : 'bg-leaf-100 text-leaf-900'
                    }`}
                  >
                    <Icon size={22} />
                  </span>
                  <span className="text-xs font-semibold tracking-wider uppercase text-spice-800">{time}</span>
                </div>
                <p className={`mt-4 text-lg font-semibold ${index === 0 ? 'text-cream' : 'text-leaf-900'}`}>
                  {title}
                </p>
                <p className={`mt-1 ${index === 0 ? 'text-cream/80' : 'text-stone-600'}`}>{text}</p>
              </Card>
            </li>
          ))}
        </ol>
      </Section>

      <Section eyebrow="Questions" title="Good to know" className="bg-white">
        <div className="grid gap-4 md:grid-cols-2">
          {FAQ.map((item) => (
            <details key={item.q} className="group rounded-2xl bg-cream p-5 ring-1 ring-stone-200 open:ring-leaf-700/40">
              <summary className="cursor-pointer list-none font-semibold text-leaf-900 marker:hidden">
                {item.q}
              </summary>
              <p className="mt-2 text-stone-600">{item.a}</p>
            </details>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap gap-3">
          <ButtonLink to="/register">Register and order</ButtonLink>
          <ButtonLink to="/cancellation-policy" variant="secondary">
            Read the cancellation policy
          </ButtonLink>
        </div>
      </Section>
    </>
  )
}
