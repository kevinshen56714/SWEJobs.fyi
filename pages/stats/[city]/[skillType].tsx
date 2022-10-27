import { CityTabs, SkillTypeTabs } from '../../../components/Tabs'
import { GetStaticPaths, GetStaticProps } from 'next'
import { collectionGroup, getCount, query, where } from 'firebase/firestore/lite'

import { PieChart } from '../../../components/PieChart'
import { SkillType } from '../../../types/Skills'
import { cities } from '../..'
import { db } from '../../../utils/firebase'
import { getTopSortedSkills } from '../../../utils/util'
import { mockStats } from '../../../data/mockStats'
import { skillsByType } from '../../../utils/analysis'
import { useRouter } from 'next/router'

export default function Stats(props: { stats: { [skill: string]: number } }) {
  const { stats } = props
  const router = useRouter()
  const { skillType } = router.query
  return (
    <>
      <CityTabs currentPath={router.asPath} />
      <SkillTypeTabs currentPath={router.asPath} />
      <div className="flex flex-wrap gap-1">
        <div className="max-w-full">
          <h1 className="w mt-8 text-center text-lg font-medium"> {skillType} </h1>
          <div className="h-[360px] w-[480px] max-w-full sm:hidden">
            <PieChart data={stats} smallView={true}></PieChart>
          </div>
          <div className="hidden h-[360px] w-[480px] max-w-full sm:block">
            <PieChart data={stats} smallView={false}></PieChart>
          </div>
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-left text-sm text-gray-500">
              <thead className="bg-gray-50 text-xs uppercase text-gray-700">
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
                {Object.keys(stats).map((skill, i) => {
                  return stats[skill] ? (
                    <tr className="border-b bg-white hover:bg-gray-50" key={i}>
                      <td
                        scope="row"
                        className="active max-w-[16.5rem] truncate whitespace-nowrap py-2 px-6 font-medium text-cyan-600 hover:cursor-pointer hover:underline"
                      >
                        {skill}
                      </td>
                      <td className="max-w-[25rem] py-2 px-6">{stats[skill]}</td>
                    </tr>
                  ) : null // don't list the skill if it has a count number of 0
                })}
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

  let stats = {}
  const allSkills = skillsByType[skillType as string]
  for (let i = 0; i < allSkills.length; i++) {
    let skill = allSkills[i]
    if (skill instanceof Array) skill = skill[0]
    stats[skill] = await getSkillCount(city, skill)
  }
  stats = getTopSortedSkills(stats)

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
