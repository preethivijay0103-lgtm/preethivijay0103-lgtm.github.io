import { useBreakpoint } from './use-breakpoint'

export type DeviceType = 'mobile' | 'tablet' | 'desktop'

/** Mobile < md, tablet < lg, else desktop — same cutoffs as Reward Store remotes. */
export function useDeviceType(): DeviceType {
  const breakpoint = useBreakpoint()
  if (breakpoint === 'base' || breakpoint === 'sm') return 'mobile'
  if (breakpoint === 'md') return 'tablet'
  return 'desktop'
}

export function useIsMobileOrTablet(): boolean {
  return useDeviceType() !== 'desktop'
}
