import { GetStaticPaths, GetStaticProps } from 'next'
import { convertDateToString, getTopSortedSkills } from '../../utils/util'
import { useEffect, useState } from 'react'

import { BarChart } from '../../components/BarChart'
import { CustomHead } from '../../components/CustomHead'
import { DropdownMenu } from '../../components/DropdownMenu'
import { SkillType } from '../../types/Skills'
import { SkillTypeTabGroup } from '../../components/Tabs'
import { cities } from '..'
import { getDailyStatsAndCount } from '../../utils/firebase-admin'
import { mockStats } from '../../data/mockStats'
import { skillsByType } from '../../utils/analysis'
import { useRouter } from 'next/router'

export default function Trends(props: {
  jobCount: { date: { [skill: string]: number } }
  jobOccurence: { date: { [skill: string]: number } }
}) {
  const { jobCount, jobOccurence } = props
  const router = useRouter()
  const { skillType } = router.query

  const [skillToShow, setSkillToShow] = useState('All')
  const [allKeys, setAllKeys] = useState<string[]>([])

  useEffect(() => {
    const allKeysSet = new Set<string>()
    Object.keys(jobCount).forEach((date) => {
      Object.keys(jobCount[date]).forEach((skill) => {
        if (jobCount[date][skill] !== 0) allKeysSet.add(skill)
      })
    })
    setAllKeys(Array.from(allKeysSet))
    return () => setSkillToShow(Array.from(allKeysSet)[0]) // reset skillToShow when data changes
  }, [jobCount])

  return (
    <>
      <CustomHead
        title={`${skillType} Trends | SWEJobs.fyi`}
        description={`Check out the latest software engineer skill trends. We track latest US software engineer jobs and compile weekly trends and monthly stats - our data is updated constantly.`}
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
            onChangeCallback={(type) => router.push({ pathname: `/trends/${type}` })}
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
        <div className="hidden h-[560px] w-[960px] max-w-full sm:block">
          <BarChart
            data={jobCount}
            smallView={false}
            allKeys={skillToShow === 'All' ? allKeys : [skillToShow]}
          ></BarChart>
        </div>
        <div className="hidden h-[560px] w-[960px] max-w-full sm:block">
          <BarChart
            data={jobOccurence}
            smallView={false}
            allKeys={skillToShow === 'All' ? allKeys : [skillToShow]}
          ></BarChart>
        </div>
        <div className="h-[560px] w-full sm:hidden">
          <BarChart
            data={jobCount}
            smallView={true}
            allKeys={skillToShow === 'All' ? allKeys : [skillToShow]}
          ></BarChart>
        </div>
        <div className="h-[560px] w-full sm:hidden">
          <BarChart
            data={jobOccurence}
            smallView={true}
            allKeys={skillToShow === 'All' ? allKeys : [skillToShow]}
          ></BarChart>
        </div>
      </div>
    </>
  )
}

// This function gets called at build time
export const getStaticPaths: GetStaticPaths = async () => {
  // Get the paths we want to pre-render based on cities and skillTypes
  const paths = Object.values(SkillType).map((skillType) => ({
    params: { skillType },
  }))

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false }
}

// This also gets called at build time
export const getStaticProps: GetStaticProps = async (context) => {
  const { skillType } = context.params
  const jobCount = {}
  const jobOccurence = {}

  // load mock data for development
  //   if (process.env.NODE_ENV === 'development') {
  //     const dateStrings = getDateStrings()
  //     const mockData = mockStats[skillType as string]
  //     dateStrings.forEach((date) => {
  //       const randomizedData = {}
  //       Object.keys(mockData).forEach((skill) => {
  //         randomizedData[skill] = Math.abs(
  //           Math.floor(mockData[skill] / 10 + (Math.random() - 0.5) * 200)
  //         )
  //       })
  //       trends[date] = randomizedData
  //     })

  //     return { props: { trends } }
  //   }

  const dateStrings = getDateStrings()
  for (let i = 0; i < dateStrings.length; i++) {
    const date = dateStrings[i]
    const [stats, count] = await getDailyStatsAndCount('SJ', date)
    const jobCountStats = {}
    const jobOccurenceStats = {}
    Object.keys(stats).forEach((skill) => {
      if (skillsByType[skillType as string].flat().includes(skill)) {
        jobCountStats[skill] = stats[skill]
        jobOccurenceStats[skill] = Math.round((stats[skill] / count) * 10000) / 100
      }
    })
    jobCount[date] = getTopSortedSkills(jobCountStats)
    jobOccurence[date] = getTopSortedSkills(jobOccurenceStats)
  }

  // sum up daily stats to get monthly stats
  // let totalJobs = 0
  // const unsortedStats = dailyStats.reduce((acc, cur) => {
  //   const [stats, count] = cur
  //   totalJobs += count
  //   Object.keys(stats).forEach((skill) => {
  //     if (skillsByType[skillType as string].flat().includes(skill)) {
  //       acc[skill] ? (acc[skill] += stats[skill]) : (acc[skill] = stats[skill])
  //     }
  //   })
  //   return acc
  // }, {} as { [skill: string]: number })

  // // convert counts to percentages
  // Object.keys(unsortedStats).forEach((skill) => {
  //   unsortedStats[skill] = Math.round((unsortedStats[skill] / totalJobs) * 10000) / 100
  // })

  // const trends = getTopSortedSkills(unsortedStats)

  // Pass collection data to the page via props
  return { props: { jobCount, jobOccurence } }
}

const getDateStrings = () => {
  const dateStrings: string[] = []

  const yesterday = new Date()
  yesterday.setDate(yesterday.getDate() - 1)

  // Set the start date to October 16, 2022
  const startDate = new Date(2022, 9, 16) // 9 is October in JavaScript dates

  // Use a for loop to add each date to the array as a string
  for (const date = startDate; date <= yesterday; date.setDate(date.getDate() + 1)) {
    dateStrings.push(convertDateToString(date))
  }

  return dateStrings
}
