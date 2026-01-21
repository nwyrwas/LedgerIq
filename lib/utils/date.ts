import { format, startOfMonth, endOfMonth, subMonths, isWithinInterval } from 'date-fns'

export function formatDate(date: Date, formatStr: string = 'MMM d, yyyy'): string {
  return format(date, formatStr)
}

export function getMonthRange(date: Date = new Date()) {
  return {
    start: startOfMonth(date),
    end: endOfMonth(date),
  }
}

export function getLastNMonths(n: number) {
  const months = []
  for (let i = 0; i < n; i++) {
    const date = subMonths(new Date(), i)
    months.unshift({
      date,
      label: format(date, 'MMM yyyy'),
      ...getMonthRange(date),
    })
  }
  return months
}

export function isDateInRange(date: Date, start: Date, end: Date): boolean {
  return isWithinInterval(date, { start, end })
}
