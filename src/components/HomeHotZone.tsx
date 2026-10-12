import type { ReactNode } from 'react'
import { HOME_ZONES, type HomeZoneId } from '../features/home/heatmap'

type Props = {
  zone: HomeZoneId
  children: ReactNode
  className?: string
  id?: string
}

export function HomeHotZone({ zone, children, className = '', id }: Props) {
  const meta = HOME_ZONES[zone]
  return (
    <div
      id={id}
      data-hotzone={zone}
      data-heat={meta.intensity}
      data-hotzone-label={`${meta.intensity}/5 · ${meta.label}`}
      data-hotzone-tip={meta.action}
      className={`home-hot-zone ${className}`.trim()}
    >
      {children}
    </div>
  )
}
