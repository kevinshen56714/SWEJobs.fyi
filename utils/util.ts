export const convertDateToString = (date: Date) => {
  return date.toLocaleDateString('en-us', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export const getPreviousDateString = (dateStr: string, daysAgo: number) => {
  const date = new Date(dateStr)
  date.setDate(date.getDate() - daysAgo)
  return convertDateToString(date)
}

// get top 12 skills sorted by count
export const getTopSortedSkills = (data: { [skill: string]: number }) => {
  const sortedSkills = Object.keys(data)
    .sort((a, b) => data[b] - data[a])
    .slice(0, 12)
  const sortedData = {}
  sortedSkills.forEach((skill) => {
    sortedData[skill] = data[skill]
  })
  return sortedData
}
