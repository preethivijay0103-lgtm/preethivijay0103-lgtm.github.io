import { Clock, Mail, MapPin, Menu as MenuIcon, MessageCircle, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useLocation, useSearchParams } from 'react-router-dom'
import { PLACEHOLDER_WHATSAPP, brand } from '../config/brand'
import { isMenuWeekOpen } from '../features/menu/weekParams'
import { whatsappUrl } from '../features/order/whatsapp'
import { useIsMobileOrTablet } from '../hooks'
import { TabTransition } from './TabTransition'
import { BrandLogo } from './BrandLogo'
import { LaunchOfferModal } from './LaunchOfferModal'
import { ButtonLink } from '../ui'

const NAV = [
  { to: '/menu', label: 'Menu' },
  { to: '/prices', label: 'Prices' },
  { to: '/how-it-works', label: 'How it works' },
]

function navClass({ isActive }: { isActive: boolean }) {
  return `rounded-full px-3 py-2 text-sm font-semibold transition ${
    isActive ? 'bg-leaf-900 text-cream' : 'text-leaf-900 hover:bg-white'
  }`
}

export function Layout() {
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()
  const [searchParams] = useSearchParams()
  const isMobileOrTablet = useIsMobileOrTablet()
  const menuWeekOpen = pathname === '/menu' && isMenuWeekOpen(searchParams)
  const showMobileCta = isMobileOrTablet && pathname !== '/register' && !menuWeekOpen
  useEffect(() => {
    setOpen(false)
    window.scrollTo(0, 0)
  }, [pathname])

  useEffect(() => {
    document.title = `${brand.name} · Gym breakfast`
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('menu-open', open)
    return () => document.documentElement.classList.remove('menu-open')
  }, [open])

  return (
    <div
      className={`checks flex min-h-screen flex-col bg-cream text-ink ${showMobileCta ? 'has-mobile-cta' : ''}`}
    >
      {import.meta.env.DEV && (brand.whatsappNumber as string) === PLACEHOLDER_WHATSAPP && (
        <p className="bg-spice-800 px-4 py-1 text-center text-xs font-bold text-leaf-900">
          Set your WhatsApp number in src/config/brand.ts before going live.
        </p>
      )}

      <header className="site-header sticky top-0 z-30 border-b border-leaf-900/10 bg-cream/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 py-2 sm:px-6 lg:gap-4 lg:py-3">
          <Link
            to="/"
            className="rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-leaf-900/25"
            aria-label={`${brand.name} home`}
          >
            <BrandLogo />
          </Link>

          <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
            {NAV.map((item) => (
              <NavLink key={item.to} to={item.to} className={navClass}>
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <span className="hidden lg:contents">
              <ButtonLink to="/register" className="px-5 py-2.5">
                Register and order
              </ButtonLink>
            </span>
            <button
              type="button"
              className="rounded-full p-2 text-leaf-900 hover:bg-white lg:hidden"
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
              onClick={() => setOpen((value) => !value)}
            >
              {open ? <X size={22} /> : <MenuIcon size={22} />}
            </button>
          </div>
        </div>

        {open && (
          <nav className="border-t border-leaf-900/10 bg-cream px-4 pb-4 lg:hidden" aria-label="Mobile">
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
        <TabTransition transitionKey={pathname} className="min-h-full">
          <Outlet />
        </TabTransition>
      </main>
      <LaunchOfferModal />

      {showMobileCta && (
        <div
          className="site-mobile-cta fixed inset-x-0 bottom-0 z-40 border-t border-leaf-900/10 bg-cream/95 px-4 py-2 backdrop-blur lg:hidden"
          role="region"
          aria-label="Order on mobile"
        >
          <ButtonLink to="/register" className="w-full py-3 text-sm">
            Register and order
          </ButtonLink>
        </div>
      )}

      <footer className="checks-plum text-cream">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-10 sm:px-6 md:grid-cols-2">
          <div>
            <BrandLogo size="md" tone="light" />
            <p className="mt-4 text-sm text-cream/80">{brand.tagline}</p>
            <p className="mt-2 text-sm text-cream/80">Founders, {brand.founders}</p>
          </div>
          <div className="space-y-3 text-sm">
            <p className="flex items-start gap-2">
              <MapPin size={18} className="mt-0.5 shrink-0 text-spice-800" />
              Pickup from {brand.pickupArea}
            </p>
            <p className="flex items-start gap-2">
              <Clock size={18} className="mt-0.5 shrink-0 text-spice-800" />
              {brand.pickupDays}. Gym pickup {brand.pickupHours}. Delivery {brand.deliveryHours}.
              Order by {brand.orderCutoff}.
            </p>
            <a
              href={whatsappUrl('Hi, I have a question about the breakfast box.')}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 font-semibold text-spice-800 underline-offset-4 hover:underline"
            >
              <MessageCircle size={18} /> WhatsApp {brand.phoneDisplay}
            </a>
            <a
              href={`mailto:${brand.grievanceEmail}`}
              className="inline-flex items-center gap-2 font-semibold text-spice-800 underline-offset-4 hover:underline"
            >
              <Mail size={18} /> {brand.grievanceEmail}
            </a>
          </div>
        </div>
        <div className="border-t border-white/10 px-4 py-5 text-center text-xs text-cream/70">
          <p className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1">
            <Link to="/terms-and-conditions" className="underline-offset-4 hover:underline">
              Terms
            </Link>
            <span aria-hidden="true">·</span>
            <Link to="/privacy-policy" className="underline-offset-4 hover:underline">
              Privacy
            </Link>
            <span aria-hidden="true">·</span>
            <Link to="/cancellation-policy" className="underline-offset-4 hover:underline">
              Cancellation
            </Link>
          </p>
          <p className="mt-2">Home-cooked food, not medical advice. Tell us about any allergy before your first box.</p>
        </div>
      </footer>
    </div>
  )
}
