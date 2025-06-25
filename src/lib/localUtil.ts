export const baseUrl = process.env.API_BASE_URL
export function dateShownFormat(date: string, dtStyle: string = 'long') {
  const nd = new Date(date)
  return new Intl.DateTimeFormat('en-US', { dateStyle: dtStyle }).format(nd)
}
export function dateSent(date: Date = new Date()) {
  return date.toISOString().split('T')[0]
}
export function timeShownFormat(time: string) {
  const nd = new Date(time)
  return new Intl.DateTimeFormat('en-US', { timeStyle: 'short', hourCycle: 'h24' }).format(nd)
}
export function formatNum(number: number | string) {
  const num = Number(number)
  return new Intl.NumberFormat('en-US').format(num)
}
export function formatCurrency(number: number | string) {
  const num = Number(number)
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'IDR', currencyDisplay: 'code', minimumFractionDigits: 0 }).format(num)
}
