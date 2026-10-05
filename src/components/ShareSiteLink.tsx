import { Check, Share2 } from 'lucide-react'
import { useCallback, useState } from 'react'
import { brand } from '../config/brand'

export function getSiteShareUrl(): string {
  const configured = brand.siteUrl.trim()
  if (configured) return configured.replace(/\/$/, '')
  if (typeof window !== 'undefined') return window.location.origin
  return ''
}

type Props = {
  className?: string
}

export function ShareSiteLink({ className = '' }: Props) {
  const [copied, setCopied] = useState(false)

  const onShare = useCallback(async () => {
    const url = getSiteShareUrl()
    if (!url) return

    const title = `${brand.name} · Gym breakfast`

    try {
      if (typeof navigator.share === 'function') {
        await navigator.share({ title, text: brand.tagline, url })
        return
      }
      await navigator.clipboard.writeText(url)
      setCopied(true)
      window.setTimeout(() => setCopied(false), 2200)
    } catch {
      // User dismissed the share sheet or copy failed.
    }
  }, [])

  const url = getSiteShareUrl()
  if (!url) return null

  const displayUrl = url.replace(/^https?:\/\//, '')

  return (
    <div className={`flex flex-col items-start gap-1.5 ${className}`}>
      <a
        href={url}
        target="_blank"
        rel="noreferrer"
        className="text-sm font-medium text-cream/85 underline-offset-4 hover:text-spice-800 hover:underline"
      >
        {displayUrl}
      </a>
      <button
        type="button"
        onClick={onShare}
        className="inline-flex items-center gap-2 font-semibold text-spice-800 underline-offset-4 hover:underline"
      >
        {copied ? <Check size={18} aria-hidden /> : <Share2 size={18} aria-hidden />}
        {copied ? 'Link copied' : 'Share this site'}
      </button>
    </div>
  )
}
