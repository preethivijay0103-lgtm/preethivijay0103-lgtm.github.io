// All dates are 'YYYY-MM-DD' strings for the India calendar day. IST has no daylight saving,
// so a fixed +5:30 offset is exact.
const IST_OFFSET_MS = 330 * 60 * 1000
export const CUTOFF_HOUR_IST = 21

const DAY_NAMES = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']
const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

function toUtcMidnight(iso: string): Date {
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(Date.UTC(y, m - 1, d))
}

function toIso(date: Date): string {
  return date.toISOString().slice(0, 10)
}

function addDays(iso: string, days: number): string {
  const date = toUtcMidnight(iso)
  date.setUTCDate(date.getUTCDate() + days)
  return toIso(date)
}

export function isWeekday(iso: string): boolean {
  const day = toUtcMidnight(iso).getUTCDay()
  return day >= 1 && day <= 5
}

function nextWeekday(iso: string): string {
  let day = iso
  while (!isWeekday(day)) day = addDays(day, 1)
  return day
}

export function istToday(now: Date): string {
  return toIso(new Date(now.getTime() + IST_OFFSET_MS))
}

function istHour(now: Date): number {
  return new Date(now.getTime() + IST_OFFSET_MS).getUTCHours()
}

// Tomorrow if ordered before 9 pm IST, otherwise the day after; never Saturday or Sunday.
export function earliestStart(now: Date): string {
  const daysAhead = istHour(now) < CUTOFF_HOUR_IST ? 1 : 2
  return nextWeekday(addDays(istToday(now), daysAhead))
}

export function startOptions(now: Date, count = 10): string[] {
  const options: string[] = []
  let day = earliestStart(now)
  while (options.length < count) {
    options.push(day)
    day = nextWeekday(addDays(day, 1))
  }
  return options
}

export function planDates(start: string, days: number): string[] {
  const dates: string[] = []
  let day = nextWeekday(start)
  while (dates.length < days) {
    dates.push(day)
    day = nextWeekday(addDays(day, 1))
  }
  return dates
}

export function isValidStart(start: string, now: Date): boolean {
  return isWeekday(start) && start >= earliestStart(now)
}

export function formatDay(iso: string): string {
  const date = toUtcMidnight(iso)
  return `${DAY_NAMES[date.getUTCDay()]} ${date.getUTCDate()} ${MONTH_NAMES[date.getUTCMonth()]}`
}

const WEEKDAY_ID: Record<number, 'mon' | 'tue' | 'wed' | 'thu' | 'fri'> = {
  1: 'mon',
  2: 'tue',
  3: 'wed',
  4: 'thu',
  5: 'fri',
}

export function isoWeekdayId(iso: string): 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | null {
  return WEEKDAY_ID[toUtcMidnight(iso).getUTCDay()] ?? null
}

export function nextDateForDay(dayId: 'mon' | 'tue' | 'wed' | 'thu' | 'fri', now: Date): string | null {
  const want = { mon: 1, tue: 2, wed: 3, thu: 4, fri: 5 }[dayId]
  return startOptions(now, 10).find((iso) => toUtcMidnight(iso).getUTCDay() === want) ?? null
}
