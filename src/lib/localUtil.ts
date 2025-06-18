export function dateShownFormat(date: string, dtStyle: string = 'long') {
  const nd = new Date(date)
  return new Intl.DateTimeFormat('en', { dateStyle: dtStyle }).format(nd)
}
export function timeShownFormat(time: string) {
  const nd = new Date(time)
  return new Intl.DateTimeFormat('en', { timeStyle: 'short', hourCycle: 'h24' }).format(nd)
}
export function formatCurrency(number: number) {
  const num = Number(number)
  return new Intl.NumberFormat('en', { style: 'currency', currency: 'IDR', currencyDisplay: 'code', minimumFractionDigits: 0 }).format(num)
}
