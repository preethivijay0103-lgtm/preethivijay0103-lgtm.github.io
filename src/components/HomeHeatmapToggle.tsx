import { useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'

/** Add ?heatmap=1 to the home URL to show predicted attention overlays (dev / review). */
export function HomeHeatmapToggle() {
  const [params] = useSearchParams()
  const on = params.get('heatmap') === '1'

  useEffect(() => {
    document.documentElement.classList.toggle('home-heatmap-on', on)
    return () => document.documentElement.classList.remove('home-heatmap-on')
  }, [on])

  if (!on) return null

  return (
    <div
      className="pointer-events-none fixed top-[calc(var(--site-header-offset)+0.5rem)] right-3 z-[60] max-w-[11rem] rounded-xl bg-leaf-900/95 px-3 py-2 text-[10px] leading-snug text-cream shadow-lg lg:max-w-xs lg:text-xs"
      aria-hidden
    >
      <p className="font-bold text-spice-800">Attention heatmap</p>
      <p className="mt-1 opacity-90">Red = peak · yellow = high · green = mid · blue = low</p>
      <p className="mt-1 opacity-75">Remove ?heatmap=1 to hide</p>
    </div>
  )
}
