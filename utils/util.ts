export const convertDateToString = (date: Date) => {
  return date.toLocaleDateString('en-us', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export const getTopSortedSkills = (skillObj: { [skill: string]: number }) => {
  return Object.fromEntries(
    Object.entries(skillObj)
      .sort((a: [string, number], b: [string, number]) => b[1] - a[1])
      .slice(0, 15) // get only top 15
  )
}
