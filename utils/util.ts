export const convertDateToString = (date: Date) => {
  return date.toLocaleDateString('en-us', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
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
