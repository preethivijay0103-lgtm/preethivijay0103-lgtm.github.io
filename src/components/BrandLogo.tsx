import { useEffect, useState } from 'react'
import { brand } from '../config/brand'

type Props = {
  size?: 'sm' | 'md'
  tone?: 'dark' | 'light'
}

function Wordmark({ size, tone = 'dark' }: { size: 'sm' | 'md'; tone?: 'dark' | 'light' }) {
  const onPlum = tone === 'light'
  const large = size === 'md'
  const markSize = large ? 'h-12 w-12 rounded-2xl' : 'h-10 w-10 rounded-[0.85rem]'
  const liteSize = large ? 'text-[1.35rem]' : 'text-[1.15rem]'
  const weightSize = large ? 'text-lg' : 'text-base'

  return (
    <div className="flex items-center gap-2.5">
      <div
        className={`grid shrink-0 place-items-center ${markSize} bg-leaf-900 shadow-[0_4px_14px_rgb(74_29_72/0.2)]`}
        aria-hidden
      >
        <svg viewBox="0 0 32 32" className="h-[70%] w-[70%]" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M7 24V8h4.5l5 11.5V8H21v16h-4.2l-5.3-12.2V24H7z"
            fill="#c5e12a"
          />
          <path
            d="M17.5 24 22 8h3.8l2.2 7.5L30 8h3.5l-5.8 16h-4.2l-2.4-8.2L19.2 24h-1.7z"
            fill="#c5e12a"
            opacity="0.95"
          />
        </svg>
      </div>
      <div className="font-sans leading-none">
        <p className={`${liteSize} font-bold tracking-tight ${onPlum ? 'text-cream' : 'text-leaf-900'}`}>
          {brand.wordmark.line1}
          <span className="text-spice-800">.</span>
        </p>
        <p className={`${weightSize} -mt-0.5 font-bold tracking-tight text-spice-800`}>
          {brand.wordmark.line2}
        </p>
      </div>
    </div>
  )
}

export function BrandLogo({ size = 'sm', tone = 'dark' }: Props) {
  const [imageOk, setImageOk] = useState(false)
  const height = size === 'md' ? 'h-[3.25rem] sm:h-[3.75rem]' : 'h-9 sm:h-10'

  useEffect(() => {
    const probe = new Image()
    probe.onload = () => setImageOk(true)
    probe.onerror = () => setImageOk(false)
    probe.src = brand.logoSrc
  }, [])

  /** PNG is dark-on-cream; on plum use the cream wordmark so Lite stays readable. */
  if (tone === 'light' || !imageOk) {
    return <Wordmark size={size} tone={tone === 'light' ? 'light' : 'dark'} />
  }

  return (
    <img
      src={brand.logoSrc}
      alt={brand.name}
      width={320}
      height={80}
      decoding="async"
      onError={() => setImageOk(false)}
      className={`${height} w-auto max-w-[min(58vw,11.5rem)] object-contain object-left sm:max-w-[13rem]`}
    />
  )
}
