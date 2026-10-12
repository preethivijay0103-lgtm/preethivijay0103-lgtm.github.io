import { useState } from 'react'
import { brand } from '../config/brand'

const ITEMS = [
  {
    q: 'When do I pick up?',
    a: `Gym pickup ${brand.pickupHours}, ${brand.pickupDays}. Delivery ${brand.deliveryHours}. ${brand.pickupArea}.`,
  },
  {
    q: 'When do I order?',
    a: `Message us by ${brand.orderCutoff}. We cook at 4:30 am, so the cutoff is the night before.`,
  },
  {
    q: 'Is veg cheaper than non-veg?',
    a: 'No. Veg and non-veg are the same price. You pick diet on the week menu.',
  },
]

/** Compact FAQ — same idea as origin landing-pages FAQ accordion. */
export function HomeFaq({ className = '' }: { className?: string }) {
  const [open, setOpen] = useState<number | null>(0)

  return (
    <section className={className} aria-label="Common questions">
      <p className="text-[10px] font-bold tracking-[0.24em] text-[#85b700] uppercase">Questions</p>
      <h2 className="mt-1 font-display text-2xl font-black text-[#54104d]">Before you start</h2>
      <div className="mt-4 overflow-hidden rounded-[1.35rem] border border-[#eadfd9] bg-[#fffdfa] shadow-[0_8px_26px_rgba(84,16,77,0.06)]">
        {ITEMS.map((item, index) => {
          const isOpen = open === index
          return (
            <div
              key={item.q}
              className={`${index > 0 ? 'border-t border-[#eadfd9]' : ''} ${
                isOpen ? 'bg-[#fbfff1]' : 'bg-[#fffdfa]'
              }`}
            >
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? null : index)}
                className="flex w-full min-h-12 items-center justify-between gap-3 px-4 py-4 text-left"
              >
                <span className="font-display text-base font-bold text-[#54104d]">{item.q}</span>
                <span
                  className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-sm font-black ${
                    isOpen
                      ? 'bg-[#c7ec16] text-[#54104d]'
                      : 'bg-[#fdebf5] text-[#54104d]'
                  }`}
                >
                  {isOpen ? '–' : '+'}
                </span>
              </button>
              {isOpen ? (
                <p className="px-4 pb-4 text-sm leading-relaxed text-[#8b6c88]">{item.a}</p>
              ) : null}
            </div>
          )
        })}
      </div>
    </section>
  )
}
