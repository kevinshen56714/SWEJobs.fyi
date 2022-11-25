import { GetStaticPaths, GetStaticProps } from 'next'
import { checkTodayData, getDailyStatsAndCount } from '../../../../utils/firebase-admin'
import {
  convertDateToString,
  getPreviousDateString,
  getTopSortedSkills,
} from '../../../../utils/util'
import { useEffect, useState } from 'react'

import { BarChart } from '../../../../components/BarChart'
import { CustomHead } from '../../../../components/CustomHead'
import { DropdownMenu } from '../../../../components/DropdownMenu'
import Link from 'next/link'
import { SkillType } from '../../../../types/Skills'
import { SkillTypeTabGroup } from '../../../../components/Tabs'
import { cities } from '../../..'
import classNames from 'classnames'
import { mockStats } from '../../../../data/mockStats'
import { skillsByType } from '../../../../utils/analysis'
import { useRouter } from 'next/router'

export const WeeklyVsDailyTabGroup = (props: { currentPath: string }) => {
  const [_, parentPath, currentCity, currentType, currentTrend] = props.currentPath.split('/')
  const options = [
    { title: 'Daily (past week)', URIComponent: 'daily-trends' },
    { title: 'Weekly (past month)', URIComponent: 'weekly-trends' },
  ]
  return (
    <ul className="z-10 mt-4 flex flex-wrap items-center justify-center gap-1 overflow-hidden rounded-lg bg-gray-100 px-1 py-0.5 text-sm font-medium text-gray-900 shadow-sm">
      {options.map(({ title, URIComponent }, i) => {
        const currentTab = URIComponent === currentTrend
        return (
          <li key={i}>
            <Link
              href={`/${parentPath}/${currentCity}/${currentType}/${URIComponent}`}
              className={classNames(
                {
                  'active bg-cyan-700 text-white': currentTab,
                  'border-transparent hover:bg-gray-50': !currentTab,
                },
                'inline-block cursor-pointer rounded-lg p-2'
              )}
            >
              {title}
            </Link>
          </li>
        )
      })}
    </ul>
  )
}

export default function Trends(props: { trends: { date: { [skill: string]: number } } }) {
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
              router.push({ pathname: `/trends/${city}/${type}/daily-trends` })
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
        <div className="hidden h-[560px] w-[960px] max-w-full sm:-mt-5 sm:block">
          <BarChart
            data={trends}
            smallView={false}
            allKeys={skillToShow === 'All' ? allKeys : [skillToShow]}
            city={city as string}
          ></BarChart>
        </div>
        <div className="h-[560px] w-full sm:-mt-5 sm:hidden">
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
  let todayStr = convertDateToString(new Date())

  // load mock randomized data for development
  if (process.env.NODE_ENV === 'development') {
    const trends = getLast7Days(todayStr)
    const mockData = mockStats[skillType as string]
    Object.keys(trends).map((date) => {
      const randomizedData = {}
      Object.keys(mockData).forEach((skill) => {
        randomizedData[skill] = Math.abs(
          Math.floor(mockData[skill] / 10 + (Math.random() - 0.5) * 200)
        )
      })
      trends[date] = randomizedData
    })

    return { props: { trends } }
  }

  console.log(`fetching daily trends for ${city}, ${skillType}`)

  // if jobs haven't been updated today, shift back by 1 day
  const todayDataAvailable = await checkTodayData(city, todayStr)
  if (!todayDataAvailable) todayStr = getPreviousDateString(todayStr, 1)
  const trends = getLast7Days(todayStr)

  // get daily trends for this week
  await Promise.all(
    Object.keys(trends).map(async (dateStr) => {
      const [skillCounts] = await getDailyStatsAndCount(city, dateStr)
      skillsByType[skillType as string].forEach((skill) => {
        if (skill instanceof Array) skill = skill[0]
        trends[dateStr][skill] = skillCounts[skill] || 0
      })
      const sortedData = getTopSortedSkills(trends[dateStr], 15)
      trends[dateStr] = sortedData
    })
  )

  // Pass collection data to the page via props
  return { props: { trends } }
}

// create an empty object for each date of last 7 days
const getLast7Days = (todayStr: string) => {
  const last7Days = {}
  for (let i = 6; i >= 0; i--) {
    const dateStr = getPreviousDateString(todayStr, i)
    last7Days[dateStr] = {}
  }
  return last7Days
}
