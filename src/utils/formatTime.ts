import { format } from 'date-fns'
// import { es } from 'date-fns/locale'

export function fDate (date: string) {
  const timeInMS = new Date(date).getTime()
  return format(new Date(timeInMS), 'MMMM dd yyyy')
}

export function fDateTime (date: string) {
  return format(new Date(date), 'dd MMM yyyy HH:mm')
}