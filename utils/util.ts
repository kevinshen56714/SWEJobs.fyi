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

// get top skills sorted by count
export const getTopSortedSkills = (data: { [skill: string]: number }, top?: number) => {
  let sortedSkills = Object.keys(data).sort((a, b) => data[b] - data[a])
  if (top) sortedSkills = sortedSkills.slice(0, top)
  const sortedData = {}
  sortedSkills.forEach((skill) => {
    // don't list the skill if it has a count number of 0
    if (data[skill] > 0) sortedData[skill] = data[skill]
  })
  return sortedData
}
