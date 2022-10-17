import { useState } from 'react'
import { GetStaticPaths, GetStaticProps } from 'next'
import { useRouter } from 'next/router'
import { collection, getDocs, QuerySnapshot } from 'firebase/firestore/lite'
import { db } from '../../data/firebase'
import { getSkillsInJobDescription } from '../../data/analysis'
import fakeData from '../../data/devData.json'
import { Jobs } from '../../types/Jobs'
import { SkillType } from '../../types/skills'

export const cities = ['SF', 'SJ', 'SEA', 'LA', 'NY', 'AU']

const SkillBadge = ({ children, type }) => {
  let colorClasses = ''
  switch (Number(type)) {
    case SkillType.LANGUAGE:
      colorClasses = 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300'
      break
    case SkillType.FRONTEND:
      colorClasses = 'bg-blue-100 text-blue-800 dark:bg-blue-200 dark:text-blue-800'
      break
    case SkillType.BACKEND:
      colorClasses = 'bg-green-100 text-green-800 dark:bg-green-200 dark:text-green-900'
      break
    case SkillType.DEVOPS:
      colorClasses = 'bg-yellow-100 text-yellow-800 dark:bg-yellow-200 dark:text-yellow-900'
      break
    case SkillType.DATAML:
      colorClasses = 'bg-red-100 text-red-800 dark:bg-red-200 dark:text-red-900'
      break
  }
  return (
    <span className={`text-xs font-semibold mr-2 my-0.5 px-1.5 py-0.5 rounded-lg ${colorClasses}`}>
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
      <div className="text-sm font-medium text-center py-2 text-gray-500 border-b border-gray-200 dark:text-gray-400 dark:border-gray-700">
        <ul className="flex flex-wrap -mb-px">
          {tabs.map(({ title }, i) => {
            const currentTab = i === time
            return (
              <li className="mr-2" key={i}>
                <a
                  onClick={() => setTime(i)}
                  className={`inline-block p-2.5 rounded-t-lg border-b-2 cursor-pointer ${
                    currentTab
                      ? 'text-blue-600 border-blue-600 active dark:text-blue-500 dark:border-blue-500'
                      : 'border-transparent hover:text-gray-600 hover:border-gray-300 dark:hover:text-gray-300'
                  } `}
                >
                  {title}
                  <span className="bg-blue-100 text-blue-800 text-xs font-semibold ml-2 px-1 py-0.5 rounded-lg dark:bg-blue-200 dark:text-blue-800">
                    {tabs[i].jobs.length}
                  </span>
                </a>
              </li>
            )
          })}
        </ul>
      </div>
      <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  key={i}
                >
                  <td
                    scope="row"
                    className="py-2 px-6 max-w-[16.5rem] truncate font-medium text-blue-600 active dark:text-blue-500 whitespace-nowrap hover:underline hover:cursor-pointer"
                  >
                    <a href={jobLink}>
                      {companyName}
                      <p className="font-normal text-sm truncate text-left text-gray-500 dark:text-gray-400">
                        {companyLocation.split('+')[0]}
                      </p>
                    </a>
                  </td>
                  <td className="py-2 px-6 max-w-xs truncate font-medium text-gray-900 whitespace-nowrap dark:text-white hover:underline hover:cursor-pointer">
                    <a href={jobLink}>
                      {jobTitle}
                      <p className="font-normal text-sm text-left text-gray-500 dark:text-gray-400">
                        {salary}
                      </p>
                    </a>
                  </td>
                  <td className="py-2 px-6 max-w-[25rem] flex flex-wrap">
                    {Object.keys(skills).map((type) =>
                      skills[type].map((skill, i) => (
                        <SkillBadge key={i} type={type}>
                          {skill}
                        </SkillBadge>
                      ))
                    )}
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
  if (process.env.NODE_ENV === 'development') {
    const fakeJobs = fakeData.fakeJobs
    fakeJobs.map((job) => {
      const jobDescription = job.jobDescriptionArr.join()
      job['skills'] = getSkillsInJobDescription(jobDescription)
    })
    return { props: { todayJobs: fakeJobs, yesterdayJobs: fakeJobs, twoDaysAgoJobs: fakeJobs } }
  }

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
