export const DateInputFormat = (date: Date | null | undefined) => {
  if (!date) return ''
  let currentDate = new Date(date)

  const formatDate = new Intl.DateTimeFormat('es', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    // add UTC to avoid timezone issues
    timeZone: 'UTC',
  })

  const formattedDate = formatDate.format(currentDate)
  return formattedDate.replaceAll('/', '-').split('-').reverse().join('-')
}