import { ArrowRight } from 'lucide-react'
import { useEffect, useState } from 'react'
import { formatRupees, planTotal } from '../features/catalog/data'
import { ButtonLink } from '../ui'

/** Desktop: floating trial CTA after scrolling past the hero. */
export function HomeStickyTrialCta() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const threshold = 520
    const onScroll = () => setVisible(window.scrollY > threshold)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!visible) return null

  const trial = formatRupees(planTotal('core', 'trial'))

  return (
    <div
      className="pointer-events-none fixed inset-x-0 bottom-6 z-40 hidden justify-center px-4 lg:flex"
      role="region"
      aria-label="Quick order"
    >
      <div className="pointer-events-auto flex items-center gap-3 rounded-full bg-leaf-900 px-2 py-2 pl-5 text-cream shadow-xl ring-1 ring-white/10">
        <p className="text-sm font-medium">
          <span className="font-bold text-spice-800">{trial}</span> 3-day trial
        </p>
        <ButtonLink to="/register" className="home-pulse !px-5 !py-2.5 text-sm">
          Register <ArrowRight size={16} />
        </ButtonLink>
      </div>
    </div>
  )
}
