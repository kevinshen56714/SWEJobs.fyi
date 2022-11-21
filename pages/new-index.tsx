import { checkTodayData, getDailyStatsAndCount } from '../utils/firebase-admin'
import { convertDateToString, getPreviousDateString, getTopSortedSkills } from '../utils/util'

import { Badge } from '../components/Badge'
import { CustomHead } from '../components/CustomHead'
import { DropdownMenu } from '../components/DropdownMenu'
import { GetStaticProps } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { SkillType } from '../types/Skills'
import mainSchematic from '../public/main-schematic.svg'
import { mockStats } from '../data/mockStats'
import { skillsByType } from '../utils/analysis'
import { useRouter } from 'next/router'
import { useState } from 'react'

export const cities = [
  { city: 'SJ', name: 'San Jose, CA' },
  { city: 'SF', name: 'San Francisco, CA' },
  { city: 'LA', name: 'Los Angeles, CA' },
  { city: 'SEA', name: 'Seattle, WA' },
  { city: 'NY', name: 'New York, NY' },
  { city: 'AU', name: 'Austin, TX' },
]

export default function Home(props: {
  stats: { [city: string]: { [type in SkillType]: { [skill: string]: number } } }
}) {
  const { stats } = props
  const router = useRouter()
  const [selectedCity, setSelectedCity] = useState(cities[0].city)

  return (
    <div>
      <CustomHead title="SWEJobs.fyi - Software Engineer Jobs and Trends Tracker"></CustomHead>
      <main className="mt-20 flex flex-col items-center justify-center">
        <div className="flex flex-col items-center gap-3 md:flex-row">
          <h1 className="text-2xl font-medium">Break down software engineering jobs for you</h1>
          <div className="gap-5">
            <Image className="w-[30rem] max-w-full" src={mainSchematic} alt="SWEJobs.fyi" />
          </div>
          <div className="text-center md:text-left"></div>
        </div>
        <div className="flex w-full flex-col items-start gap-5 py-20">
          <h1 className="text-2xl font-medium">The best website for software engineering jobs</h1>
        </div>
        <div className="flex w-full flex-col items-start gap-5 py-20">
          <div className="w-full">
            <div className="flex flex-col sm:flex-row">
              <div className="w-50 flex-1">
                <h3 className="rounded-md bg-white/50 px-2 py-2 text-lg group-hover:bg-white/60">
                  Weekly Trends
                </h3>
              </div>
              <div className="w-50 flex-1">
                <div
                  className=" group h-64 overflow-hidden rounded-xl border bg-[url('/trends-page-snapshot.png')] bg-cover shadow-sm hover:cursor-pointer"
                  onClick={() =>
                    router.push(
                      `/trends/${cities[0].city}/${Object.keys(skillsByType)[0]}/daily-trends`
                    )
                  }
                ></div>
              </div>
            </div>
            <div className="mt-10 flex flex-col sm:flex-row">
              <div className="w-50 flex-1">
                <h3 className="rounded-md bg-white/50 px-2 py-2 text-lg group-hover:bg-white/60">
                  Monthly Stats
                </h3>
              </div>
              <div className="w-50 flex-1">
                <div
                  className="group	h-64 overflow-hidden rounded-xl border bg-[url('/stats-page-snapshot.png')] bg-cover shadow-sm hover:cursor-pointer"
                  onClick={() =>
                    router.push(`/stats/${cities[0].city}/${Object.keys(skillsByType)[0]}`)
                  }
                ></div>
              </div>
            </div>
          </div>
          <div className="mt-20 flex w-full flex-col items-center gap-2 bg-gray-50 py-20 sm:px-20">
            <div className="w-full text-lg">
              Choose a city:
              <div className="max-w-[12rem] md:mx-2 md:inline-block">
                <DropdownMenu
                  options={cities.map((city) => city.name)}
                  selected={cities.filter((city) => city.city === selectedCity)[0].name}
                  onChangeCallback={(name) =>
                    setSelectedCity(cities.filter((city) => city.name === name)[0].city)
                  }
                ></DropdownMenu>
              </div>
              and click on any of the skills below!
            </div>
            <div className="flex flex-wrap rounded-md border p-4 shadow-sm">
              {Object.values(stats[selectedCity]).map((skills) =>
                Object.keys(skills).map((skill, i) => (
                  <div key={i} className="mt-0.5">
                    <Badge
                      value={skill}
                      onClickCallBack={(skill) =>
                        router.push(
                          `/jobs/${selectedCity}/24?skills=${encodeURIComponent(skill as string)}`
                        )
                      }
                    >
                      <div className="my-0.5 flex h-4 w-4 items-center justify-center rounded-md bg-white/40">
                        {skills[skill]}
                      </div>
                    </Badge>
                  </div>
                ))
              )}
            </div>
            <p className="mt-5 text-gray-500">
              Just{' '}
              <Link className="underline" href={`/jobs/${selectedCity}/24`}>
                check all jobs
              </Link>{' '}
              or{' '}
              <Link className="underline" href="/about/about-data">
                learn more
              </Link>{' '}
              about how this works
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}

// This also gets called at build time
export const getStaticProps: GetStaticProps = async () => {
  // load mock data for development
  if (process.env.NODE_ENV === 'development') {
    // create an object with each city in cities as a key and mockStats as the value
    const stats = cities.reduce((acc, city) => {
      acc[city.city] = mockStats
      return acc
    }, {} as { [city: string]: { [type in SkillType]: { [skill: string]: number } } })
    return { props: { stats } }
  }

  const cityStats: { [city: string]: [{ [skill: string]: number }, number] } = {}
  await Promise.all(
    cities.map(async (city) => {
      let todayStr = convertDateToString(new Date())
      // if jobs haven't been updated today, shift back by 1 day
      const todayDataAvailable = await checkTodayData(city.city, todayStr)
      if (!todayDataAvailable) todayStr = getPreviousDateString(todayStr, 1)
      cityStats[city.city] = await getDailyStatsAndCount(city.city, todayStr)
    })
  )

  const stats: { [city: string]: { [type in SkillType]: { [skill: string]: number } } } = {}

  Object.keys(cityStats).forEach((city) => {
    stats[city] = {} as { [type in SkillType]: { [skill: string]: number } }
    const [skillCounts, totalCount] = cityStats[city]
    Object.keys(skillsByType).forEach((type) => {
      const skillCountsByType: { [skill: string]: number } = {}
      skillsByType[type].flat().forEach((skill: string) => {
        skillCountsByType[skill] = skillCounts[skill] || 0
      })
      stats[city][type] = getTopSortedSkills(skillCountsByType)
    })
  })

  // Pass collection data to the page via props
  return { props: { stats } }
}
