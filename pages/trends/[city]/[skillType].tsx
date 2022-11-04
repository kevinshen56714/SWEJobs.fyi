import { GetStaticPaths, GetStaticProps } from 'next'
import { checkTodayData, db } from '../../../utils/firebase'
import { convertDateToString, getPreviousDateString, getTopSortedSkills } from '../../../utils/util'
import { doc, getDoc } from 'firebase/firestore/lite'
import { useEffect, useState } from 'react'

import { BarChart } from '../../../components/BarChart'
import { DropdownMenu } from '../../../components/DropdownMenu'
import Head from 'next/head'
import { SkillType } from '../../../types/Skills'
import { SkillTypeTabGroup } from '../../../components/Tabs'
import { cities } from '../..'
import { mockStats } from '../../../data/mockStats'
import { skillsByType } from '../../../utils/analysis'
import { useRouter } from 'next/router'

export default function Trends(props: { trendsData: { date: { [skill: string]: number } } }) {
  const { trendsData } = props
  const router = useRouter()
  const { city, skillType } = router.query

  const [skillToShow, setSkillToShow] = useState('All')
  const [allKeys, setAllKeys] = useState<string[]>([])

  useEffect(() => {
    const allKeysSet = new Set<string>()
    Object.keys(trendsData).forEach((date) => {
      Object.keys(trendsData[date]).forEach((skill) => {
        if (trendsData[date][skill] !== 0) allKeysSet.add(skill)
      })
    })
    setAllKeys(Array.from(allKeysSet))
    return () => setSkillToShow('All') // reset skillToShow when data changes
  }, [trendsData])

  return (
    <>
      <Head>
        <title>
          {`${cities.find((c) => c.city === city)?.name} ${skillType} Trends | SWEJobs.fyi`}
        </title>
        <meta
          name="description"
          content={`Check out the latest Software Engineer Skill Trends in ${
            cities.find((c) => c.city === city)?.name
          }`}
        />
      </Head>
      <SkillTypeTabGroup currentPath={router.asPath} />
      <div className="mt-8 flex flex-col items-center">
        <h1 className="text-lg font-medium"> {skillType} </h1>
        <DropdownMenu
          options={['All', ...allKeys]}
          selected={skillToShow}
          onChangeCallback={setSkillToShow}
        ></DropdownMenu>
        <div className="hidden h-[560px] w-full max-w-full sm:block">
          <BarChart
            data={trendsData}
            smallView={false}
            allKeys={skillToShow === 'All' ? allKeys : [skillToShow]}
            city={city as string}
          ></BarChart>
        </div>
        <div className="h-[560px] w-full max-w-full sm:hidden">
          <BarChart
            data={trendsData}
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
    const trendsData = getLast7Days(todayStr)
    const mockData = mockStats[skillType as string]
    Object.keys(trendsData).map((date) => {
      const randomizedData = {}
      Object.keys(mockData).forEach((skill) => {
        randomizedData[skill] = Math.abs(
          Math.floor(mockData[skill] / 10 + (Math.random() - 0.5) * 200)
        )
      })
      trendsData[date] = randomizedData
    })
    return { props: { trendsData } }
  }

  console.log(`fetching trends for ${city}, ${skillType}`)

  // if jobs haven't been updated today, shift back by 1 day
  const todayDataAvailable = await checkTodayData(city, todayStr)
  if (!todayDataAvailable) todayStr = getPreviousDateString(todayStr, 1)
  const trendsData = getLast7Days(todayStr)

  // get last 7 days of data
  await Promise.all(
    Object.keys(trendsData).map(async (dateStr) => {
      const skillCounts = await getDailySkillCounts(city, dateStr)
      skillsByType[skillType as string].forEach((skill) => {
        if (skill instanceof Array) skill = skill[0]
        trendsData[dateStr][skill] = skillCounts[skill] || 0
      })
      const sortedData = getTopSortedSkills(trendsData[dateStr], 15)
      trendsData[dateStr] = sortedData
    })
  )
  // Pass collection data to the page via props
  return { props: { trendsData } }
}

// create an empty object for each date of last 7 days
const getLast7Days = (todayStr: string) => {
  const last7Days = {}
  for (let i = 6; i >= 0; i--) {
    const date = new Date(todayStr)
    date.setDate(date.getDate() - i)
    const dateStr = convertDateToString(new Date(date))
    last7Days[dateStr] = {}
  }
  return last7Days
}

const getDailySkillCounts = async (city: string | string[], dateStr: string) => {
  const docRef = doc(db, dateStr, city as string)
  const docSnap = await getDoc(docRef)
  return docSnap.data()['stats']
}
