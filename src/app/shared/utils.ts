export function monthName(month: number) {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]
  return months[month - 1]
}

export function formatNumberCommas(num: string) {
  const beforePoint = num.split('.')
  const thousandsWithCommas = beforePoint[0].replace(
    /(\d)(?=(\d{3})+(?!\d))/g,
    '$1,'
  )
  return thousandsWithCommas + '.' + beforePoint[1]
}
