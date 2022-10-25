import { GetStaticPaths, GetStaticProps } from 'next'
import { collectionGroup, getCount, query, where } from 'firebase/firestore/lite'

import { CityTabs } from '../../components/CityTabs'
import { MyResponsivePie } from '../../components/PieChart'
import { cities } from '../jobs/[city]'
import { db } from '../../utils/firebase'
import { mockStats } from '../../data/mockStats'
import { skillsByType } from '../../utils/analysis'
import { useRouter } from 'next/router'

export default function Trends({ stats }) {
  const router = useRouter()
  const { city } = router.query
  return (
    <>
      <CityTabs currentCity={city} />
      <div className="flex flex-wrap gap-1">
        {Object.keys(stats).map((type, i) => (
          <div key={i}>
            <h1 className="w mt-8 text-center text-lg font-medium"> {type} </h1>
            <div className="h-[360px] w-[480px]">
              <MyResponsivePie data={stats[type]}></MyResponsivePie>
            </div>
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
                <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
                  <tr>
                    <th scope="col" className="py-3 px-6">
                      Skill
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Count
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {Object.keys(stats[type]).map((skill, i) => {
                    const count = stats[type][skill]
                    return (
                      <tr
                        className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
                        key={i}
                      >
                        <td
                          scope="row"
                          className="active max-w-[16.5rem] truncate whitespace-nowrap py-2 px-6 font-medium text-cyan-600 hover:cursor-pointer hover:underline dark:text-blue-500"
                        >
                          {skill}
                        </td>
                        <td className="max-w-[25rem] py-2 px-6">{count}</td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

// This function gets called at build time
export const getStaticPaths: GetStaticPaths = async () => {
  // Get the paths we want to pre-render based on posts
  const paths = cities.map((city) => ({
    params: { city },
  }))

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false }
}

// This also gets called at build time
export const getStaticProps: GetStaticProps = async (context) => {
  // load mock data for development
  if (process.env.NODE_ENV === 'development') {
    return { props: { stats: mockStats } }
  }

  const { city } = context.params

  const stats = {}
  for (const type in skillsByType) {
    stats[type] = {}
    for (let i = 0; i < skillsByType[type].length; i++) {
      let skill = skillsByType[type][i]
      if (skill instanceof Array) skill = skill[0]
      stats[type][skill] = await getSkillCount(city, skill)
    }
    const soredStats = Object.fromEntries(
      Object.entries(stats[type]).sort((a: [string, number], b: [string, number]) => b[1] - a[1])
    )
    stats[type] = soredStats
  }

  // Pass collection data to the page via props
  return { props: { stats } }
}

const getSkillCount = async (city: string | string[], skill: string) => {
  const collGroup = collectionGroup(db, 'jobs')
  const skillQuery = query(
    collGroup,
    where('skills', 'array-contains', skill),
    where('city', '==', city)
  )
  const snapshot = await getCount(skillQuery)
  return snapshot.data().count
}
