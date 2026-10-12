import { PartyPopper, Sparkles, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CUSTOMIZATION_ENABLED } from '../config/customization'
import { Button } from '../ui'

const SESSION_KEY = 'lite-weight-launch-offer-v2'

const CONFETTI = [
  { left: '6%', delay: '0s', color: '#c5e12a', drift: '18px', width: '10px', height: '18px' },
  { left: '14%', delay: '0.12s', color: '#f4b7df', drift: '-22px', width: '8px', height: '14px' },
  { left: '22%', delay: '0.28s', color: '#fff6e8', drift: '28px', width: '12px', height: '12px' },
  { left: '31%', delay: '0.05s', color: '#c5e12a', drift: '-12px', width: '7px', height: '16px' },
  { left: '39%', delay: '0.2s', color: '#ffd166', drift: '24px', width: '10px', height: '10px' },
  { left: '48%', delay: '0.08s', color: '#f4b7df', drift: '-30px', width: '9px', height: '18px' },
  { left: '56%', delay: '0.32s', color: '#c5e12a', drift: '16px', width: '11px', height: '11px' },
  { left: '64%', delay: '0.16s', color: '#fff6e8', drift: '-18px', width: '8px', height: '15px' },
  { left: '72%', delay: '0.24s', color: '#ffd166', drift: '20px', width: '10px', height: '16px' },
  { left: '81%', delay: '0.04s', color: '#f4b7df', drift: '-26px', width: '12px', height: '12px' },
  { left: '89%', delay: '0.18s', color: '#c5e12a', drift: '14px', width: '8px', height: '17px' },
  { left: '95%', delay: '0.3s', color: '#fff6e8', drift: '-10px', width: '9px', height: '9px' },
  { left: '10%', delay: '0.4s', color: '#ffd166', drift: '32px', width: '7px', height: '13px' },
  { left: '44%', delay: '0.36s', color: '#c5e12a', drift: '-8px', width: '11px', height: '8px' },
  { left: '76%', delay: '0.42s', color: '#f4b7df', drift: '22px', width: '8px', height: '14px' },
]

export function LaunchOfferModal() {
  const navigate = useNavigate()
  const [open, setOpen] = useState(false)

  useEffect(() => {
    if (sessionStorage.getItem(SESSION_KEY)) return
    setOpen(true)
  }, [])

  useEffect(() => {
    if (!open) return
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') close()
    }
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  function close() {
    sessionStorage.setItem(SESSION_KEY, '1')
    setOpen(false)
  }

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-center overflow-hidden p-4 sm:items-center">
      <button
        type="button"
        className="absolute inset-0 bg-leaf-950/80 backdrop-blur-[2px]"
        aria-label="Close offer"
        onClick={close}
      />
      {CONFETTI.map((piece, index) => (
        <span
          key={index}
          className="launch-confetti pointer-events-none absolute top-0 rounded-sm"
          style={{
            left: piece.left,
            width: piece.width,
            height: piece.height,
            background: piece.color,
            animationDelay: piece.delay,
            ['--drift' as string]: piece.drift,
          }}
        />
      ))}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="launch-offer-title"
        className="launch-pop relative w-full max-w-sm rounded-[2rem] bg-cream p-7 text-center text-leaf-900 shadow-[0_24px_80px_rgba(45,18,44,0.45)] ring-4 ring-spice-800"
      >
        <button
          type="button"
          className="absolute top-3 right-3 grid h-9 w-9 place-items-center rounded-full text-leaf-900/60 hover:bg-leaf-900/5"
          aria-label="Close"
          onClick={close}
        >
          <X size={18} />
        </button>
        <div className="launch-sparkle mx-auto grid h-14 w-14 place-items-center rounded-full bg-spice-800 text-leaf-900">
          <PartyPopper size={28} strokeWidth={2.2} />
        </div>
        <p className="mt-4 text-sm font-extrabold tracking-[0.18em] text-leaf-900/55 uppercase">Yay, we are live</p>
        <h2 id="launch-offer-title" className="mt-1 font-display text-6xl font-black leading-none text-leaf-900">
          Launch prices
          <span className="mt-1 block font-display text-3xl italic font-black text-leaf-900">on full boxes</span>
        </h2>
        <p className="mt-3 inline-flex items-center justify-center gap-1 text-sm font-semibold text-leaf-900/80">
          <Sparkles size={16} className="text-leaf-900" />
          {CUSTOMIZATION_ENABLED
            ? 'Core 25% · Strong & Elite 30%. Custom add-ons stay full price.'
            : 'Core 25% · Strong & Elite 30%.'}
        </p>
        <div className="mt-6 grid gap-2">
          <Button
            className="home-pulse w-full py-3.5 text-base"
            onClick={() => {
              close()
              navigate('/register')
            }}
          >
            Grab launch prices
          </Button>
          <Button variant="ghost" className="w-full" onClick={close}>
            Keep browsing
          </Button>
        </div>
      </div>
    </div>
  )
}
