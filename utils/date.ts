const WEEKS = ['Mon', 'Tues', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

const mask = (value: number, n: number = 2) => {
  return String(value).padStart(n, '0');
}

export const hhDdMMyyyy = (date: Date = new Date()) => {
  return `${mask(date.getHours())}:${mask(date.getMinutes())} / ${mask(date.getDate())}/${mask(date.getMonth() + 1)}/${date.getFullYear()}`
}

export const hhMm = (date: Date = new Date()) => {
  return `${mask(date.getHours())}:${mask(date.getMinutes())}`
}

export const ddMMDYYYYHhMm = (date: Date = new Date()) => {
  return `${WEEKS[date.getDay() - 1]}, ${MONTHS[date.getMonth()]} ${mask(date.getDate())}, ${date.getFullYear()} ${mask(date.getHours())}:${mask(date.getMinutes())}`
}

export const ddMMYyyy = (date: Date = new Date()) => {
  // @ts-ignore
  return `${date.toLocaleString().replaceAll('/', '.').split(',')[0]}`;
}

export const daysInMonth = (month: number, year: number) => {
  return new Date(year, month, 0).getDate();
}

export const dayOfWeek = (month: number, year: number) => {
  return new Date(year, month, 0).getDay();
}