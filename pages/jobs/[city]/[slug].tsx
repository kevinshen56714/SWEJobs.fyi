import { GetStaticPaths, GetStaticProps } from 'next'
import { QuerySnapshot, collection, getDocs } from 'firebase/firestore/lite'
import { checkTodayData, db } from '../../../utils/firebase'
import { convertDateToString, getPreviousDateString } from '../../../utils/util'
import { useMemo, useState } from 'react'

import { DropdownMenu } from '../../../components/DropdownMenu'
import { Job } from '../../../types/Jobs'
import Link from 'next/link'
import { SkillType } from '../../../types/Skills'
import { categorizeSkills } from '../../../utils/analysis'
import { cities } from '../..'
import classNames from 'classnames'
import { mockJobs } from '../../../data/mockJobs'
import { useRouter } from 'next/router'

const SkillBadge = ({ children, type }) => {
  if (type === SkillType.LANGUAGE) return
  return (
    <span
      className={classNames(
        {
          'bg-[#cbf3f0] text-black':
            type === SkillType.FRONTEND || type === SkillType.NATIVE_OR_CROSS,
          'bg-[#2ec4b5a3] text-black': type === SkillType.BACKEND,
          'bg-[#ffbf69] text-black': type === SkillType.DATABASE,
          'bg-[#ff9f1c] text-black': type === SkillType.CLOUD_INFRA,
          'bg-[#bde6ff] text-black': type === SkillType.AI_ML || type === SkillType.GRAPHICS,
        },
        'my-0.5 mr-2 rounded-lg px-1.5 py-[1px] text-xs font-medium'
      )}
    >
      {children}
    </span>
  )
}

const slugs = { 24: 'Within 24 hours', 48: '24-48 hours', 72: '48-72 hours' }
const sortByDropdownOptions = ['Sort By', 'Company name (A-Z)', 'Company name (Z-A)']

const getTimeElapsed = (createdAt: string) => {
  const createdAtDate = new Date(createdAt)
  const now = new Date()
  const elapsed = Math.floor((now.getTime() - createdAtDate.getTime()) / (1000 * 60 * 60))
  return elapsed < 1 ? 'within an hour ago' : `${elapsed} hours ago`
}

export default function JobPosts(props: { jobs: Job[] }) {
  const [sortBy, setSortBy] = useState<string>('Sort By')
  const router = useRouter()
  const { city, slug } = router.query

  const jobs = useMemo(() => {
    if (sortBy === 'Sort By') {
      return [...props.jobs]
    } else {
      const isAscending = sortBy === 'Company name (A-Z)'
      return props.jobs.sort((a, b) => {
        if (a.company < b.company) return isAscending ? -1 : 1
        if (a.company > b.company) return isAscending ? 1 : -1
        return 0
      })
    }
  }, [props.jobs, sortBy])

  return (
    <div>
      <ul className="flex flex-wrap gap-2 text-sm font-medium">
        {Object.keys(slugs).map((slugOption, i) => {
          const currentTab = slugOption === slug
          return (
            <li key={i}>
              <Link href={`/jobs/${city}/${slugOption}`}>
                <a
                  className={classNames(
                    {
                      'active border-cyan-600 text-cyan-600': currentTab,
                      'border-transparent hover:border-gray-300 hover:text-gray-600': !currentTab,
                    },
                    'inline-block cursor-pointer rounded-t-lg border-b-2 p-2.5'
                  )}
                >
                  {slugs[slugOption]}
                </a>
              </Link>
            </li>
          )
        })}
      </ul>
      <div className="my-2 flex w-full items-end justify-between">
        <div className="text-sm text-gray-500">{`Showing ${
          jobs.length
        } jobs (updated: ${getTimeElapsed(jobs[0].createdAt)})`}</div>
        <DropdownMenu
          options={sortByDropdownOptions}
          selected={sortBy}
          onChangeCallback={(selected) => setSortBy(selected)}
        ></DropdownMenu>
      </div>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-left text-sm text-gray-500">
          <thead className="bg-gray-50 text-xs uppercase text-gray-700">
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
            {jobs.map((job, i) => {
              const { company, link, loc, salary, skills, title } = job
              return (
                <tr className="border-b bg-white hover:bg-gray-50" key={i}>
                  <td
                    scope="row"
                    className="active max-w-[16.5rem] truncate whitespace-nowrap py-2 px-6 font-medium text-cyan-600 hover:cursor-pointer hover:underline"
                  >
                    <a href={link}>
                      {company}
                      <p className="truncate text-left text-sm font-normal text-gray-500">{loc}</p>
                    </a>
                  </td>
                  <td className="max-w-xs truncate whitespace-nowrap py-2 px-6 font-medium text-gray-900 hover:cursor-pointer hover:underline">
                    <a href={link}>
                      {title}
                      <p className="text-left text-sm font-normal text-gray-700">
                        {skills[SkillType.LANGUAGE].join(', ')}
                      </p>
                    </a>
                  </td>
                  <td className="max-w-[25rem] py-2 px-6">
                    <div className="flex flex-wrap">
                      {Object.keys(skills).map((type) =>
                        skills[type].map((skill, i) => (
                          <SkillBadge key={i} type={type}>
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
  // Get the paths we want to pre-render based on cities and times
  const paths = cities.flatMap(({ city }) =>
    Object.keys(slugs).map((slug) => ({
      params: { city, slug },
    }))
  )

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false }
}

// This also gets called at build time
export const getStaticProps: GetStaticProps = async (context) => {
  const { city, slug } = context.params
  let shiftDateBy = Number(slug) / 24 - 1

  // load mock data for development
  if (process.env.NODE_ENV === 'development') {
    const curatedMockData = mockJobs.map((mockJob) => {
      let { company, link, loc, salary, skills, title } = mockJob
      return {
        company,
        createdAt: convertDateToString(new Date()),
        link,
        loc,
        salary,
        skills: categorizeSkills(skills),
        title,
      }
    })
    // make curatedMockData x times longer based on shiftDateBy to test pagination
    const mockData = Array.from({ length: shiftDateBy + 1 }, () => curatedMockData).flat()

    return { props: { jobs: mockData } }
  }

  // if jobs haven't been updated today, shift back by 1 day
  let dateStr = convertDateToString(new Date())
  const todayDataAvailable = await checkTodayData(city, dateStr)
  if (!todayDataAvailable) shiftDateBy += 1

  dateStr = getPreviousDateString(dateStr, shiftDateBy)

  const querySnapshot = await getDocs(collection(db, `${dateStr}/${city}/jobs`))
  const jobs = assembleJobObject(querySnapshot)
  console.log(`There are ${jobs.length} jobs in ${city} today`)
  // Pass collection data to the page via props
  return { props: { jobs } }
}

const assembleJobObject = (snapshot: QuerySnapshot) => {
  return snapshot.docs.map((doc) => {
    const { company, createdAt, link, loc, remote, salary, skills, title } = doc.data()
    return {
      company,
      createdAt: convertDateToString(createdAt.toDate()),
      link,
      loc: loc.split('+')[0],
      remote,
      salary,
      skills: categorizeSkills(skills),
      title,
    }
  })
}
