import { Clock, MapPin, Menu as MenuIcon, MessageCircle, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { PLACEHOLDER_WHATSAPP, brand } from '../config/brand'
import { whatsappUrl } from '../features/order/whatsapp'
import { ButtonLink } from '../ui'

const NAV = [
  { to: '/menu', label: 'Menu' },
  { to: '/prices', label: 'Prices' },
  { to: '/how-it-works', label: 'How it works' },
  { to: '/cancellation-policy', label: 'Cancellation policy' },
]

function navClass({ isActive }: { isActive: boolean }) {
  return `rounded-full px-3 py-2 text-sm font-medium transition ${
    isActive ? 'bg-leaf-100 text-leaf-900' : 'text-stone-700 hover:text-leaf-900'
  }`
}

export function Layout() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    setOpen(false)
    window.scrollTo(0, 0)
  }, [pathname])

  return (
    <div className="flex min-h-screen flex-col">
      {import.meta.env.DEV && brand.whatsappNumber === PLACEHOLDER_WHATSAPP && (
        <p className="bg-amber-300 px-4 py-1 text-center text-xs font-medium text-amber-950">
          Set your WhatsApp number in src/config/brand.ts before going live.
        </p>
      )}

      <header className="sticky top-0 z-30 border-b border-leaf-900/10 bg-cream/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
          <Link to="/" className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-leaf-900 font-display text-lg font-bold text-cream">
              {brand.name.charAt(0)}
            </span>
            <span className="font-display text-xl font-bold text-leaf-900">{brand.name}</span>
          </Link>

          <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
            {NAV.map((item) => (
              <NavLink key={item.to} to={item.to} className={navClass}>
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <span className="hidden sm:block">
              <ButtonLink to="/register" className="px-5 py-2.5">
                Register and order
              </ButtonLink>
            </span>
            <button
              type="button"
              className="rounded-full p-2 text-leaf-900 hover:bg-leaf-50 md:hidden"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              onClick={() => setOpen((value) => !value)}
            >
              {open ? <X size={22} /> : <MenuIcon size={22} />}
            </button>
          </div>
        </div>

        {open && (
          <nav className="border-t border-leaf-900/10 bg-cream px-4 pb-4 md:hidden" aria-label="Mobile">
            <div className="flex flex-col gap-1 pt-2">
              {NAV.map((item) => (
                <NavLink key={item.to} to={item.to} className={navClass}>
                  {item.label}
                </NavLink>
              ))}
              <ButtonLink to="/register" className="mt-2">
                Register and order
              </ButtonLink>
            </div>
          </nav>
        )}
      </header>

      <main className="flex-1">
        <Outlet />
      </main>

      <footer className="bg-leaf-950 text-leaf-100">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-3">
          <div>
            <p className="font-display text-2xl font-bold text-white">{brand.name}</p>
            <p className="mt-2 text-sm text-leaf-100/80">{brand.tagline}</p>
          </div>
          <div className="space-y-3 text-sm">
            <p className="flex items-start gap-2">
              <MapPin size={18} className="mt-0.5 shrink-0" />
              Pickup from our gate, {brand.pickupArea}
            </p>
            <p className="flex items-start gap-2">
              <Clock size={18} className="mt-0.5 shrink-0" />
              {brand.pickupDays}, {brand.pickupHours}. Order by {brand.orderCutoff}.
            </p>
            <a
              href={whatsappUrl('Hi, I have a question about the breakfast box.')}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 font-semibold text-white underline-offset-4 hover:underline"
            >
              <MessageCircle size={18} /> Chat with us on WhatsApp
            </a>
          </div>
          <nav className="flex flex-col gap-2 text-sm" aria-label="Footer">
            {NAV.map((item) => (
              <Link key={item.to} to={item.to} className="hover:text-white">
                {item.label}
              </Link>
            ))}
            <Link to="/register" className="hover:text-white">
              Register and order
            </Link>
          </nav>
        </div>
        <p className="border-t border-white/10 px-4 py-5 text-center text-xs text-leaf-100/70">
          Home-cooked food, not medical advice. Tell us about any allergy before your first box.
        </p>
      </footer>
    </div>
  )
}
