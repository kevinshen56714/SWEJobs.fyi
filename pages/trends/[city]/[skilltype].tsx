import { CityTabs, SkillTypeTabs } from '../../../components/Tabs'
import { GetStaticPaths, GetStaticProps } from 'next'
import {
  Timestamp,
  collection,
  collectionGroup,
  getCount,
  query,
  where,
} from 'firebase/firestore/lite'

import { BarChart } from '../../../components/BarChart'
import { SkillType } from '../../../types/Skills'
import { cities } from '../..'
import { convertDateToString } from '../../../utils/util'
import { db } from '../../../utils/firebase'
import { skillsByType } from '../../../utils/analysis'
import { useRouter } from 'next/router'

export default function Trends({ stats }) {
  const router = useRouter()
  const { city, skilltype } = router.query
  return (
    <>
      <CityTabs currentPath={router.asPath} />
      <SkillTypeTabs currentPath={router.asPath} />
      <div>
        <h1 className="mt-8 text-center text-lg font-medium"> {skilltype} </h1>
        <div className="h-[560px] w-full max-w-full">
          <BarChart data={stats}></BarChart>
        </div>
      </div>
    </>
  )
}

// This function gets called at build time
export const getStaticPaths: GetStaticPaths = async () => {
  // Get the paths we want to pre-render based on posts
  const paths = cities.flatMap(({ city }) =>
    Object.values(SkillType).map((skilltype) => ({
      params: { city, skilltype },
    }))
  )

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false }
}

// This also gets called at build time
export const getStaticProps: GetStaticProps = async (context) => {
  // load mock data for development
  // if (process.env.NODE_ENV === 'development') {
  //   return { props: { stats: mockStats } }
  // }

  const { city, skilltype } = context.params
  console.log(`fetching trends for ${city}, ${skilltype}`)
  let todayStr = convertDateToString(new Date())
  const todayDataAvailable = await checkTodayData(city, todayStr)
  if (!todayDataAvailable) {
    const today = new Date(todayStr)
    today.setDate(today.getDate() - 1)
    todayStr = convertDateToString(today)
  }
  const stats = {}

  // get last 7 days of data
  for (let i = 6; i >= 0; i--) {
    const date = new Date(todayStr)
    date.setDate(date.getDate() - i)
    const dateStr = new Date(date).toLocaleDateString('en-us', {
      month: 'short',
      day: 'numeric',
    })
    stats[dateStr] = {}

    const allSkills = skillsByType[skilltype as string]
    for (let i = 0; i < allSkills.length; i++) {
      let skill = allSkills[i]
      if (skill instanceof Array) skill = skill[0]
      stats[dateStr][skill] = await getDailySkillCount(city, skill, date)
    }
    const soredStats = Object.fromEntries(
      Object.entries(stats[dateStr])
        .sort((a: [string, number], b: [string, number]) => b[1] - a[1])
        .slice(0, 10) // get only top ten
    )
    stats[dateStr] = soredStats
  }

  // Pass collection data to the page via props
  return { props: { stats } }
}

const getDailySkillCount = async (city: string | string[], skill: string, date: Date) => {
  const collGroup = collectionGroup(db, 'jobs')
  const nextDate = new Date()
  nextDate.setDate(date.getDate() + 1)
  const skillQuery = query(
    collGroup,
    where('skills', 'array-contains', skill),
    where('city', '==', city),
    where('createdAt', '>=', Timestamp.fromDate(date)),
    where('createdAt', '<', Timestamp.fromDate(nextDate))
  )
  const snapshot = await getCount(skillQuery)
  return snapshot.data().count
}

const checkTodayData = async (city: string | string[], todayStr: string) => {
  const coll = collection(db, `${todayStr}/${city}/jobs`)
  const q = query(coll, where('city', '==', city))
  const snapshot = await getCount(q)
  return snapshot.data().count > 0
}
