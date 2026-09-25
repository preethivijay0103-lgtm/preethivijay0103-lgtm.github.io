import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import type { LinkProps } from 'react-router-dom'

type Variant = 'primary' | 'secondary' | 'ghost' | 'whatsapp'

const base =
  'inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full px-6 py-3 text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-leaf-700 disabled:cursor-not-allowed disabled:opacity-50'

const variants: Record<Variant, string> = {
  primary: 'bg-spice-800 text-white shadow-sm hover:bg-spice-600',
  secondary: 'bg-white text-leaf-900 ring-1 ring-leaf-900/20 hover:bg-leaf-50',
  ghost: 'text-leaf-900 hover:bg-leaf-50',
  whatsapp: 'bg-[#25D366] text-white shadow-sm hover:bg-[#1EBE5B]',
}

export function buttonClass(variant: Variant = 'primary', extra = ''): string {
  return `${base} ${variants[variant]} ${extra}`
}

export function Button({
  variant = 'primary',
  className = '',
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: Variant }) {
  return <button className={buttonClass(variant, className)} {...props} />
}

export function ButtonLink({
  variant = 'primary',
  className = '',
  ...props
}: LinkProps & { variant?: Variant }) {
  return <Link className={buttonClass(variant, className)} {...props} />
}

export function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-3xl bg-white shadow-sm ring-1 ring-black/5 ${className}`}>{children}</div>
  )
}

export function Badge({
  children,
  tone = 'leaf',
}: {
  children: ReactNode
  tone?: 'leaf' | 'spice' | 'white'
}) {
  const tones = {
    leaf: 'bg-leaf-100 text-leaf-900',
    spice: 'bg-spice-100 text-spice-800',
    white: 'bg-white/90 text-leaf-900',
  }
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-semibold ${tones[tone]}`}
    >
      {children}
    </span>
  )
}

export function Section({
  id,
  eyebrow,
  title,
  subtitle,
  children,
  className = '',
}: {
  id?: string
  eyebrow?: string
  title?: ReactNode
  subtitle?: ReactNode
  children: ReactNode
  className?: string
}) {
  return (
    <section id={id} className={`py-14 sm:py-20 ${className}`}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        {(eyebrow || title || subtitle) && (
          <header className="mb-10 max-w-2xl">
            {eyebrow && (
              <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em] text-spice-800">
                {eyebrow}
              </p>
            )}
            {title && <h2 className="text-3xl font-bold text-leaf-900 sm:text-4xl">{title}</h2>}
            {subtitle && <p className="mt-3 text-base text-stone-600 sm:text-lg">{subtitle}</p>}
          </header>
        )}
        {children}
      </div>
    </section>
  )
}

export interface ToggleOption<T extends string> {
  value: T
  label: string
  hint?: string
}

export function Toggle<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string
  value: T
  options: ToggleOption<T>[]
  onChange: (value: T) => void
}) {
  return (
    <div role="radiogroup" aria-label={label} className="inline-flex rounded-full bg-leaf-50 p-1 ring-1 ring-leaf-900/10">
      {options.map((option) => {
        const active = option.value === value
        return (
          <button
            key={option.value}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => onChange(option.value)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition sm:px-5 ${
              active ? 'bg-leaf-900 text-white shadow' : 'text-leaf-900 hover:bg-white'
            }`}
          >
            {option.label}
            {option.hint && (
              <span className={`ml-1 font-normal ${active ? 'text-leaf-100' : 'text-stone-500'}`}>
                {option.hint}
              </span>
            )}
          </button>
        )
      })}
    </div>
  )
}

export const inputClass =
  'block w-full rounded-2xl border-0 bg-white px-4 py-3 text-base text-ink ring-1 ring-stone-300 placeholder:text-stone-400 focus:ring-2 focus:ring-leaf-700 focus:outline-none'
