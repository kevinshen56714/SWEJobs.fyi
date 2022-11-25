import { GetStaticPaths, GetStaticProps } from 'next'
import { checkTodayData, getDailyStatsAndCount } from '../../../utils/firebase-admin'
import { convertDateToString, getPreviousDateString, getTopSortedSkills } from '../../../utils/util'
import { useEffect, useMemo, useState } from 'react'

import { CustomHead } from '../../../components/CustomHead'
import { DropdownMenu } from '../../../components/DropdownMenu'
import { PieChart } from '../../../components/PieChart'
import { SkillType } from '../../../types/Skills'
import { SkillTypeTabGroup } from '../../../components/Tabs'
import { cities } from '../..'
import { mockStats } from '../../../data/mockStats'
import { skillsByType } from '../../../utils/analysis'
import { useRouter } from 'next/router'

export default function Stats(props: { stats: { [skill: string]: number } }) {
  const { stats } = props
  const router = useRouter()
  const { city, skillType } = router.query
  const cityName = cities.find((c) => c.city === city)?.name
  const numSkills = Object.keys(stats).length

  const [numSkillsInChart, setNumSkillsInChart] = useState(10)
  const [showAll, setShowAll] = useState(false)

  useEffect(() => {
    setNumSkillsInChart(numSkills > 10 ? 10 : numSkills)
    setShowAll(false)
  }, [numSkills])

  const topSkills = useMemo(
    () => getTopSortedSkills(stats, numSkillsInChart),
    [stats, numSkillsInChart]
  )
  console.log('Stats rerendered')

  return (
    <>
      <CustomHead
        title={`${cityName} ${skillType} Stats | SWEJobs.fyi`}
        description={`Check out the latest software engineer skill stats in ${cityName}. We track latest US software engineer jobs and compile weekly trends and monthly stats - our data is updated constantly.`}
      ></CustomHead>
      <div className="hidden lg:block">
        <SkillTypeTabGroup currentPath={router.asPath} />
      </div>
      <div className="flex flex-col items-center lg:mt-8">
        <div className="flex items-center gap-3 lg:hidden">
          <h1 className="text-lg font-medium">Category:</h1>
          <DropdownMenu
            options={Object.values(SkillType)}
            selected={skillType as string}
            onChangeCallback={(type) => router.push({ pathname: `/stats/${city}/${type}` })}
          ></DropdownMenu>
        </div>
        <h1 className="hidden text-lg font-medium lg:block">{skillType}</h1>
        <div className="flex items-center gap-2">
          <p>Show top</p>
          <DropdownMenu
            options={Array.from(Array(Object.keys(stats).length).keys())
              .map((x) => x + 1)
              .filter((x) => x > 1)} // meanless to show only 1 skill
            selected={numSkillsInChart}
            onChangeCallback={setNumSkillsInChart}
          ></DropdownMenu>
          <p> skills in the chart</p>
        </div>
        <div className="text-gray-500">
          ({getPreviousDateString(convertDateToString(new Date()), 30)} -{' '}
          {convertDateToString(new Date())})
        </div>
        <div className="flex w-full flex-wrap items-start justify-center gap-1">
          <div className="h-[340px] w-[480px] max-w-full sm:hidden">
            <PieChart data={topSkills} smallView={true}></PieChart>
          </div>
          <div className="hidden h-[450px] w-[600px] max-w-full sm:block">
            <PieChart data={topSkills} smallView={false}></PieChart>
          </div>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-left text-sm text-gray-500">
              <thead className="bg-gray-50 text-gray-700">
                <tr>
                  <th scope="col" className="py-3 px-6 font-semibold">
                    Skill
                  </th>
                  <th scope="col" className="max-w-[8rem] py-3 px-6 font-semibold">
                    Occurrence per 100 jobs
                  </th>
                </tr>
              </thead>
              <tbody>
                {Object.keys(stats).map((skill, i) => {
                  const isHidden = numSkills > numSkillsInChart && i >= numSkillsInChart && !showAll
                  return isHidden ? null : (
                    <tr className="border-b bg-white text-gray-800 hover:bg-gray-50" key={i}>
                      <td
                        scope="row"
                        className="truncate whitespace-nowrap py-2 px-6 font-medium hover:cursor-pointer"
                      >
                        {skill}
                      </td>
                      <td className="py-2 px-6 text-center">{stats[skill]}</td>
                    </tr>
                  )
                })}
                {numSkills > numSkillsInChart && (
                  <tr
                    className="border-b bg-white hover:bg-gray-50"
                    onClick={() => setShowAll(!showAll)}
                  >
                    <td
                      scope="row"
                      colSpan={2}
                      className="truncate whitespace-nowrap py-2 px-6 text-center font-medium text-cyan-600 hover:cursor-pointer hover:underline"
                    >
                      {showAll ? 'Show Less' : `Show All (${numSkills})`}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  )
}

// This function gets called at build time
export const getStaticPaths: GetStaticPaths = async () => {
  // Get the paths we want to pre-render based on cities and skillTypes
  const paths = cities.flatMap(({ city }) =>
    Object.values(SkillType).map((skillType) => ({
      params: { city, skillType },
    }))
  )

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false }
}

// This also gets called at build time
export const getStaticProps: GetStaticProps = async (context) => {
  const { city, skillType } = context.params

  // load mock data for development
  if (process.env.NODE_ENV === 'development') {
    return { props: { stats: mockStats[skillType as string] } }
  }

  const last30Days = await getLast30DayStr(city as string)
  const dailyStats = await Promise.all(
    last30Days.map((date) => getDailyStatsAndCount(city as string, date))
  )

  // sum up daily stats to get monthly stats
  let totalJobs = 0
  const unsortedStats = dailyStats.reduce((acc, cur) => {
    const [stats, count] = cur
    totalJobs += count
    Object.keys(stats).forEach((skill) => {
      if (skillsByType[skillType as string].flat().includes(skill)) {
        acc[skill] ? (acc[skill] += stats[skill]) : (acc[skill] = stats[skill])
      }
    })
    return acc
  }, {} as { [skill: string]: number })

  // convert counts to percentages
  Object.keys(unsortedStats).forEach((skill) => {
    unsortedStats[skill] = Math.round((unsortedStats[skill] / totalJobs) * 10000) / 100
  })

  const stats = getTopSortedSkills(unsortedStats)

  // Pass collection data to the page via props
  return { props: { stats } }
}

// create an array with each date of last 30 days
const getLast30DayStr = async (city: string) => {
  let todayStr = convertDateToString(new Date())
  // if jobs haven't been updated today, shift back by 1 day
  const todayDataAvailable = await checkTodayData(city, todayStr)
  if (!todayDataAvailable) todayStr = getPreviousDateString(todayStr, 1)

  let last30Days = [] as string[]
  for (let i = 29; i >= 0; i--) {
    const dateStr = getPreviousDateString(todayStr, i)
    last30Days = [...last30Days, dateStr]
  }
  return last30Days
}
