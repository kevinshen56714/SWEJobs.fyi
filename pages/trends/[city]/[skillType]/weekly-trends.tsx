import { GetStaticPaths, GetStaticProps } from 'next'
import {
  convertDateToString,
  getPreviousDateString,
  getTopSortedSkills,
} from '../../../../utils/util'
import { useEffect, useState } from 'react'

import { BarChart } from '../../../../components/BarChart'
import { CustomHead } from '../../../../components/CustomHead'
import { DropdownMenu } from '../../../../components/DropdownMenu'
import { SkillType } from '../../../../types/Skills'
import { SkillTypeTabGroup } from '../../../../components/Tabs'
import { WeeklyVsDailyTabGroup } from './daily-trends'
import { cities } from '../../..'
import { getDailyStatsAndCount } from '../../../../utils/firebase-admin'
import { mockStats } from '../../../../data/mockStats'
import { skillsByType } from '../../../../utils/analysis'
import { useRouter } from 'next/router'

export default function Trends(props: { trends: { week: { [skill: string]: number } } }) {
  const { trends } = props
  const router = useRouter()
  const { city, skillType } = router.query
  const cityName = cities.find((c) => c.city === city)?.name

  const [skillToShow, setSkillToShow] = useState('All')
  const [allKeys, setAllKeys] = useState<string[]>([])

  useEffect(() => {
    const allKeysSet = new Set<string>()
    Object.keys(trends).forEach((date) => {
      Object.keys(trends[date]).forEach((skill) => {
        if (trends[date][skill] !== 0) allKeysSet.add(skill)
      })
    })
    setAllKeys(Array.from(allKeysSet))
    return () => setSkillToShow('All') // reset skillToShow when data changes
  }, [trends])

  return (
    <>
      <CustomHead
        title={`${cityName} ${skillType} Trends | SWEJobs.fyi`}
        description={`Check out the latest software engineer skill trends in ${cityName}. We track latest US software engineer jobs and compile weekly trends and monthly stats - our data is updated constantly.`}
      ></CustomHead>
      <div className="hidden lg:block">
        <SkillTypeTabGroup currentPath={router.asPath} />
      </div>
      <div className="flex flex-col items-center lg:mt-4">
        <div className="flex items-center gap-3 lg:hidden">
          <h1 className="text-lg font-medium">Category:</h1>
          <DropdownMenu
            options={Object.values(SkillType)}
            selected={skillType as string}
            onChangeCallback={(type) =>
              router.push({ pathname: `/trends/${city}/${type}/weekly-trends` })
            }
          ></DropdownMenu>
        </div>
        <h1 className="hidden text-lg font-medium lg:block">{skillType}</h1>
        <div className="flex items-center gap-2">
          <p>Show</p>
          <DropdownMenu
            options={['All', ...allKeys]}
            selected={skillToShow}
            onChangeCallback={setSkillToShow}
          ></DropdownMenu>
          <p> in the chart</p>
        </div>
        <WeeklyVsDailyTabGroup currentPath={router.asPath}></WeeklyVsDailyTabGroup>
        <div className="hidden h-[560px] w-full max-w-full sm:-mt-5 sm:block">
          <BarChart
            data={trends}
            smallView={false}
            allKeys={skillToShow === 'All' ? allKeys : [skillToShow]}
            city={city as string}
          ></BarChart>
        </div>
        <div className="h-[560px] w-full max-w-full sm:-mt-5 sm:hidden">
          <BarChart
            data={trends}
            smallView={true}
            allKeys={skillToShow === 'All' ? allKeys : [skillToShow]}
            city={city as string}
          ></BarChart>
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

  // load mock randomized data for development
  if (process.env.NODE_ENV === 'development') {
    const mockData = mockStats[skillType as string]
    const trends: { [week: string]: { [skill: string]: number } } = {}
    // get weekly trends for the last 4 weeks
    for (let i = 4; i >= 1; i--) {
      const sundayStr = getSundayOfAWeek(i)

      // accumulate counts for the 7 days of the week
      let weekDates = [] as string[]
      for (let j = 0; j < 7; j++) {
        const dateStr = getPreviousDateString(sundayStr, j)
        weekDates = [...weekDates, dateStr]
      }
      const sortedStats = getTopSortedSkills(mockData)
      trends[`${weekDates[6].split(',')[0]}-${weekDates[0].split(',')[0]}`] = sortedStats
    }

    Object.keys(trends).map((week) => {
      const randomizedData = {}
      Object.keys(mockData).forEach((skill) => {
        randomizedData[skill] = Math.abs(
          Math.floor(mockData[skill] / 10 + (Math.random() - 0.5) * 200)
        )
      })
      trends[week] = randomizedData
    })
    return { props: { trends } }
  }

  console.log(`fetching weekly trends for ${city}, ${skillType}`)

  const trends: { [week: string]: { [skill: string]: number } } = {}
  // get weekly trends for the last 4 weeks
  for (let i = 4; i >= 1; i--) {
    const sundayStr = getSundayOfAWeek(i)

    // accumulate counts for the 7 days of the week
    let weekDates = [] as string[]
    for (let j = 0; j < 7; j++) {
      const dateStr = getPreviousDateString(sundayStr, j)
      weekDates = [...weekDates, dateStr]
    }
    const weeklyStats = await Promise.all(
      weekDates.map((date) => getDailyStatsAndCount(city as string, date))
    )
    const unsortedStats = weeklyStats.reduce((acc, cur) => {
      const [stats, count] = cur
      Object.keys(stats).forEach((skill) => {
        if (skillsByType[skillType as string].flat().includes(skill)) {
          acc[skill] ? (acc[skill] += stats[skill]) : (acc[skill] = stats[skill])
        }
      })
      return acc
    }, {} as { [skill: string]: number })
    const sortedStats = getTopSortedSkills(unsortedStats, 20)
    trends[`${weekDates[6].split(',')[0]}-${weekDates[0].split(',')[0]}`] = sortedStats
  }

  // Pass collection data to the page via props
  return { props: { trends } }
}

// get all the dates of last week
const getSundayOfAWeek = (weekAgo: number) => {
  const today = new Date()
  const last = today.getDate() - today.getDay() - 7 * (weekAgo - 1)
  const sunday = new Date(today.setDate(last))
  return convertDateToString(sunday)
}
