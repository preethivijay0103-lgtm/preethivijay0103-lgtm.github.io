import { ChevronRight, Mail, MapPin, Menu as MenuIcon, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
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

function mobileNavClass({ isActive }: { isActive: boolean }) {
  return `flex items-center justify-between rounded-2xl px-4 py-3 text-lg font-bold ring-1 transition ${
    isActive
      ? 'bg-[#fbfff1] text-leaf-900 ring-[#c7ec16]'
      : 'bg-white text-leaf-900 ring-[#eadfd9] hover:bg-[#fbfff1] hover:ring-[#c7ec16]'
  }`
}

export function Layout() {
  const [open, setOpen] = useState(false)
  const headerRef = useRef<HTMLElement>(null)
  const [menuTop, setMenuTop] = useState(0)
  const { pathname } = useLocation()
  const [searchParams] = useSearchParams()
  const isMobileOrTablet = useIsMobileOrTablet()
  const menuWeekOpen = pathname === '/menu' && isMenuWeekOpen(searchParams)
  const showFooter = pathname !== '/menu'
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

  useEffect(() => {
    const el = headerRef.current
    if (!el) return
    const update = () => {
      const height = el.getBoundingClientRect().height
      setMenuTop(height)
      document.documentElement.style.setProperty('--site-header-offset', `${Math.max(height - 1, 0)}px`)
    }
    update()
    const observer = new ResizeObserver(update)
    observer.observe(el)
    window.addEventListener('resize', update)
    return () => {
      observer.disconnect()
      window.removeEventListener('resize', update)
    }
  }, [])

  return (
    <div
      className={`checks flex min-h-screen flex-col bg-cream text-ink ${showMobileCta ? 'has-mobile-cta' : ''} ${showFooter ? '' : 'no-footer'}`}
    >
      {import.meta.env.DEV && (brand.whatsappNumber as string) === PLACEHOLDER_WHATSAPP && (
        <p className="bg-spice-800 px-4 py-1 text-center text-xs font-bold text-leaf-900">
          Set your WhatsApp number in src/config/brand.ts before going live.
        </p>
      )}

      <header
        ref={headerRef}
        className={`site-header sticky top-0 bg-cream ${
          open ? 'z-[100] border-b-0' : 'z-40 border-b border-leaf-900/10'
        }`}
      >
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
              onClick={() => {
                setMenuTop(headerRef.current?.getBoundingClientRect().height ?? 0)
                setOpen((value) => !value)
              }}
            >
              {open ? <X size={22} /> : <MenuIcon size={22} />}
            </button>
          </div>
        </div>

      </header>

      {open && (
        <button
          type="button"
          className="fixed inset-0 z-[90] bg-leaf-950/55 lg:hidden"
          aria-label="Close menu"
          onClick={() => setOpen(false)}
        />
      )}

      {open && (
        <nav
          className="fixed inset-x-0 z-[95] border-b-4 border-[#c7ec16] bg-cream px-4 pb-5 pt-1 shadow-[0_16px_40px_rgba(84,16,77,0.16)] lg:hidden"
          style={{ top: Math.max(menuTop - 1, 0) }}
          aria-label="Mobile"
        >
          <div className="flex flex-col gap-2.5 pt-3">
            {NAV.map((item) => (
              <NavLink key={item.to} to={item.to} className={mobileNavClass}>
                {item.label}
                <ChevronRight size={18} strokeWidth={2.5} className="shrink-0 opacity-70" />
              </NavLink>
            ))}
            <ButtonLink to="/register" className="mt-1 min-h-12 justify-center py-3.5 text-base">
              Register and order
            </ButtonLink>
          </div>
        </nav>
      )}


      <main className="flex-1">
        <TabTransition transitionKey={pathname} className="min-h-full">
          <Outlet />
        </TabTransition>
      </main>
      <LaunchOfferModal />

      {showMobileCta && !open && (
        <div
          className="site-mobile-cta fixed inset-x-0 bottom-0 z-40 border-t border-leaf-900/10 bg-cream/95 px-4 pt-2.5 backdrop-blur lg:hidden"
          role="region"
          aria-label="Order on mobile"
        >
          <ButtonLink to="/register" className="min-h-12 w-full justify-center py-3.5 text-sm">
            Register and order
          </ButtonLink>
        </div>
      )}

      {showFooter && (
      <footer className="checks-plum text-cream">
        <div className="mx-auto max-w-md px-5 pt-10 pb-2 sm:px-6">
          <p className="font-display text-[2rem] leading-none font-black tracking-tight">
            Lite<span className="text-spice-800">Weight</span>
          </p>
          <p className="mt-2 text-sm text-cream/70">Made by {brand.founders}</p>

          <div className="mt-6 flex items-center gap-2.5 rounded-2xl bg-white/10 px-3 py-2.5 ring-1 ring-white/15">
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-spice-800 text-leaf-900">
              <MapPin size={16} strokeWidth={2.2} />
            </span>
            <div>
              <p className="text-[11px] text-cream/65">Pickup from</p>
              <p className="font-display text-sm leading-snug font-bold">{brand.pickupArea}</p>
            </div>
          </div>

          <a
            href={whatsappUrl('Hi, I have a question about the breakfast box.')}
            target="_blank"
            rel="noreferrer"
            className="mt-5 flex min-h-12 items-center justify-center gap-2 rounded-full bg-spice-800 px-4 py-3.5 text-base font-bold text-leaf-900"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.71.306 1.263.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.435 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413z" />
            </svg>
            {brand.phoneDisplay.replace(/(\d{5})(\d{4,})/, '$1 $2')}
          </a>

          <a
            href={`mailto:${brand.grievanceEmail}`}
            className="mt-3 flex items-center justify-center gap-2 rounded-full px-4 py-3 text-sm font-semibold text-cream/90 ring-1 ring-white/20"
          >
            <Mail size={16} className="text-cream/70" />
            {brand.grievanceEmail}
          </a>

          <p className="mt-5 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-sm text-cream/80">
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
          <p className="mt-3 text-center text-xs leading-relaxed text-cream/55">
            Home-cooked food, not medical advice. Tell us about any allergy before your first box.
          </p>
        </div>
      </footer>
      )}
    </div>
  )
}
