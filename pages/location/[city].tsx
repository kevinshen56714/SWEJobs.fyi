import { useState } from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { collection, getDocs, QuerySnapshot } from 'firebase/firestore/lite'
import { db } from '../../data/firebase'
import { getSkillsInJobDescription } from '../../data/analysis'
import fakeData from '../../data/devData.json'
import { Jobs } from '../../types/Jobs'
import { SkillType } from '../../types/Skills'
import classNames from 'classnames'

export const cities = ['SF', 'SJ', 'SEA', 'LA', 'NY', 'AU']

const SkillBadge = ({ children, type }) => {
  if (type === SkillType.LANGUAGE) return
  return (
    <span
      className={classNames(
        {
          'bg-[#ffffff] text-black': type === SkillType.LANGUAGE,
          'bg-[#cbf3f0] text-black': type === SkillType.FRONTEND,
          'bg-[#2ec4b5a3] text-black': type === SkillType.BACKEND,
          'bg-[#ffbf69] text-black': type === SkillType.DEVOPS,
          'bg-[#ff9f1c] text-black': type === SkillType.DATAML,
        },
        'my-0.5 mr-2 rounded-lg px-1.5 py-[1px] text-xs font-medium'
      )}
    >
      {children}
    </span>
  )
}

export default function JobPosts({ todayJobs, yesterdayJobs, twoDaysAgoJobs }: Jobs) {
  const router = useRouter()
  const [time, setTime] = useState(0)
  const { city } = router.query
  const tabs = [
    { title: 'Within 24 hours', jobs: todayJobs },
    { title: '24-48 hours', jobs: yesterdayJobs },
    { title: '48-72 hours', jobs: twoDaysAgoJobs },
  ]

  return (
    <div>
      <div className="border-b border-gray-200 py-2 text-center text-sm font-medium text-gray-500 dark:border-gray-700 dark:text-gray-400">
        <ul className="-mb-px flex flex-wrap">
          {tabs.map(({ title }, i) => {
            const currentTab = i === time
            return (
              <li className="mr-2" key={i}>
                <a
                  onClick={() => setTime(i)}
                  className={classNames(
                    {
                      'active border-cyan-600 text-cyan-600 dark:border-cyan-500 dark:text-cyan-500':
                        currentTab,
                      'border-transparent hover:border-gray-300 hover:text-gray-600 dark:hover:text-gray-300':
                        !currentTab,
                    },
                    'inline-block cursor-pointer rounded-t-lg border-b-2 p-2.5'
                  )}
                >
                  {title}
                  <span className="ml-2 rounded-lg bg-[#cbf3f0] px-1 py-0.5 text-xs font-semibold text-black dark:bg-blue-200 dark:text-blue-800">
                    {tabs[i].jobs.length}
                  </span>
                </a>
              </li>
            )
          })}
        </ul>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-left text-sm text-gray-500 dark:text-gray-400">
          <thead className="bg-gray-50 text-xs uppercase text-gray-700 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="py-3 px-6">
                Company
              </th>
              <th scope="col" className="py-3 px-6">
                Role
              </th>
              <th scope="col" className="py-3 px-6">
                Skills
              </th>
            </tr>
          </thead>
          <tbody>
            {tabs[time].jobs.map((job, i) => {
              const { companyName, companyLocation, jobLink, jobTitle, salary, skills } = job
              return (
                <tr
                  className="border-b bg-white hover:bg-gray-50 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-600"
                  key={i}
                >
                  <td
                    scope="row"
                    className="active max-w-[16.5rem] truncate whitespace-nowrap py-2 px-6 font-medium text-cyan-600 hover:cursor-pointer hover:underline dark:text-blue-500"
                  >
                    <a href={jobLink}>
                      {companyName}
                      <p className="truncate text-left text-sm font-normal text-gray-500 dark:text-gray-400">
                        {companyLocation.split('+')[0]}
                      </p>
                    </a>
                  </td>
                  <td className="max-w-xs truncate whitespace-nowrap py-2 px-6 font-medium text-gray-900 hover:cursor-pointer hover:underline dark:text-white">
                    <a href={jobLink}>
                      {jobTitle}
                      <p className="text-left text-sm font-normal text-gray-700 dark:text-gray-400">
                        {skills[SkillType.LANGUAGE].join(', ')}
                      </p>
                    </a>
                  </td>
                  <td className="max-w-[25rem] py-2 px-6">
                    <div className="flex flex-wrap">
                      {Object.keys(skills).map((type) =>
                        skills[type].map((skill, i) => (
                          <SkillBadge key={i} type={Number(type)}>
                            {skill}
                          </SkillBadge>
                        ))
                      )}
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
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
  // if (process.env.NODE_ENV === 'development') {
  //   const fakeJobs = fakeData.fakeJobs
  //   fakeJobs.map((job) => {
  //     const jobDescription = job.jobDescriptionArr.join()
  //     job['skills'] = getSkillsInJobDescription(jobDescription)
  //   })
  //   return { props: { todayJobs: fakeJobs, yesterdayJobs: fakeJobs, twoDaysAgoJobs: fakeJobs } }
  // }

  const { city } = context.params
  const today = new Date()
  let [todayStr, yesterdayStr, twoDaysAgoStr] = convertDateToPreviousDays(today)
  let todayQuerySnapshot = await getDocs(collection(db, `indeed-${city}-${todayStr}`))
  if (todayQuerySnapshot.size === 0) {
    today.setDate(today.getDate() - 1)
    todayStr = convertDateToPreviousDays(today)[0]
    yesterdayStr = convertDateToPreviousDays(today)[1]
    twoDaysAgoStr = convertDateToPreviousDays(today)[2]
    todayQuerySnapshot = await getDocs(collection(db, `indeed-${city}-${todayStr}`))
  }

  const yesterdayQuerySnapshot = await getDocs(collection(db, `indeed-${city}-${yesterdayStr}`))
  const twoDaysAgoQuerySnapshot = await getDocs(collection(db, `indeed-${city}-${twoDaysAgoStr}`))

  const todayJobs = assembleJobObject(todayQuerySnapshot)
  const yesterdayJobs = assembleJobObject(yesterdayQuerySnapshot)
  const twoDaysAgoJobs = assembleJobObject(twoDaysAgoQuerySnapshot)
  console.log(`There are ${todayQuerySnapshot.size} jobs in ${city} today`)
  // Pass collection data to the page via props
  return { props: { todayJobs, yesterdayJobs, twoDaysAgoJobs } }
}

const assembleJobObject = (snapshot: QuerySnapshot) => {
  return snapshot.docs.map((doc) => {
    const { companyName, companyLocation, jobLink, jobDescription, jobTitle, salary } = doc.data()
    const skills = getSkillsInJobDescription(jobDescription)
    return { companyName, companyLocation, jobLink, jobTitle, salary, skills }
  })
}

const convertDateToString = (date: Date) => {
  return date.toLocaleDateString('en-us', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

const convertDateToPreviousDays = (today: Date) => {
  const todayStr = convertDateToString(today)

  const yesterday = new Date(today)
  yesterday.setDate(yesterday.getDate() - 1)
  const yesterdayStr = convertDateToString(yesterday)

  const twoDaysAgo = new Date(today)
  twoDaysAgo.setDate(twoDaysAgo.getDate() - 2)
  const twoDaysAgoStr = convertDateToString(twoDaysAgo)
  return [todayStr, yesterdayStr, twoDaysAgoStr]
}
