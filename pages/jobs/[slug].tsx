import { ChevronDownIcon, XCircleIcon } from '@heroicons/react/24/outline'
import { GetStaticPaths, GetStaticProps } from 'next'
import { categorizeSkills, skillsByType } from '../../utils/analysis'
import { checkTodayData, getDailyJobs, getLatestJobs } from '../../utils/firebase-admin'
import { convertDateToString, getPreviousDateString } from '../../utils/util'
import { useEffect, useMemo, useState } from 'react'

import { Badge } from '../../components/Badge'
import { CustomHead } from '../../components/CustomHead'
import { Disclosure } from '@headlessui/react'
import { DropdownMenu } from '../../components/DropdownMenu'
import { FilterData } from '../../types/Filter'
import { Job } from '../../types/Jobs'
import Link from 'next/link'
import { SideFilterSection } from '../../components/SideFilterSection'
import { SkillType } from '../../types/Skills'
import Tooltip from '../../components/Tooltip'
import { cities } from '..'
import classNames from 'classnames'
import { mockJobs } from '../../data/mockJobs'
import { useRouter } from 'next/router'

export const slugs = { 24: 'Within 24 hours', 48: '24-48 hours', 72: '48-72 hours' }
const sortByDropdownOptions = [
  'Sort By',
  'Company name (A-Z)',
  'Company name (Z-A)',
  '# of skills (High to Low)',
  '# of skills (Low to High)',
]

const companyOptions = ['Big Tech', 'Startup']
const remoteOptions = ['On-site', 'Remote', 'Hybrid']

const getTimeElapsed = (lastUpdated: number) => {
  const now = new Date()
  const elapsed = Math.floor((now.getTime() - lastUpdated) / (1000 * 60 * 60))
  return elapsed < 1 ? 'within an hour' : `${elapsed} hours ago`
}

const getSkillCount = (job: Job) => {
  return Object.keys(job.skills)
    .filter((skill) => skill !== SkillType.LANGUAGE)
    .reduce((acc, cur) => acc + job.skills[cur].length, 0)
}

const sortAndFilterJobs = (jobs: Job[], sortBy: string, filterData: FilterData) => {
  const { cities, companyTypes, remoteTypes, skills } = filterData
  if (sortBy === 'Company name (A-Z)') {
    jobs = jobs.sort((a, b) => (a.company.toLowerCase() > b.company.toLowerCase() ? 1 : -1))
  } else if (sortBy === 'Company name (Z-A)') {
    jobs = jobs.sort((a, b) => (a.company.toLowerCase() < b.company.toLowerCase() ? 1 : -1))
  } else if (sortBy === '# of skills (High to Low)') {
    jobs = jobs.sort((a, b) => (getSkillCount(a) < getSkillCount(b) ? 1 : -1))
  } else if (sortBy === '# of skills (Low to High)') {
    jobs = jobs.sort((a, b) => (getSkillCount(a) < getSkillCount(b) ? -1 : 1))
  }
  if (cities.length > 0) {
    jobs = jobs.filter((job) => {
      return cities.some((city) => city === job.city)
    })
  }
  if (companyTypes.length === 1) {
    jobs = jobs.filter((job) => (companyTypes.includes('Big Tech') ? job.bigTech : job.startup))
  } else if (companyTypes.length === 2) {
    jobs = jobs.filter((job) => job.bigTech || job.startup)
  }

  if (remoteTypes.length > 0 && remoteTypes.length < 3) {
    let filtered = []
    if (remoteTypes.includes('On-site')) {
      filtered = [...jobs.filter((job) => !job.remote && !job.hybrid)]
    }
    if (remoteTypes.includes('Remote')) {
      filtered = [...filtered, ...jobs.filter((job) => job.remote)]
    }
    if (remoteTypes.includes('Hybrid')) {
      filtered = [...filtered, ...jobs.filter((job) => job.hybrid)]
    }
    jobs = filtered
  }
  if (skills.length > 0) {
    jobs = jobs.filter((job) => {
      const jobSkills = Object.values(job.skills).flat()
      return skills.some((skill) => jobSkills.includes(skill))
    })
  }
  return jobs
}

export default function JobList(props: {
  jobs: Job[]
  stats: { [skill: string]: number }
  lastUpdated: number
}) {
  const router = useRouter()
  const { slug, filter } = router.query

  const [sortBy, setSortBy] = useState<string>('Sort By')
  const [filterData, setFilterData] = useState<FilterData>({
    skills: [],
    cities: [],
    companyTypes: [],
    remoteTypes: [],
  })

  useEffect(() => {
    // setSortBy('Sort By')
    const defaultFilterData = { skills: [], cities: [], companyTypes: [], remoteTypes: [] }
    if (filter) {
      const filterObj = JSON.parse(filter as string)
      setFilterData({ ...defaultFilterData, ...filterObj })
    } else {
      setFilterData(defaultFilterData)
    }
  }, [filter])

  const jobs = useMemo(
    () => sortAndFilterJobs([...props.jobs], sortBy, filterData),
    [props.jobs, sortBy, filterData]
  )

  console.log('job post rerendered')

  const handleFilterChange = (prop: keyof FilterData) => (value: string) => {
    let newFilterData: FilterData
    if (filterData[prop].includes(value)) {
      newFilterData = { ...filterData, [prop]: filterData[prop].filter((v) => v !== value) }
    } else {
      newFilterData = { ...filterData, [prop]: [...filterData[prop], value] }
    }
    // if the filter is empty, remove the filter
    if (Object.values(newFilterData).flat().length === 0) {
      router.push(`/jobs/${slug}`)
    } else {
      // remove the newFilterData keys that are with an empty array value
      const stringifiedFilter = JSON.stringify(
        Object.keys(newFilterData).reduce((acc, cur) => {
          if (newFilterData[cur].length > 0) {
            acc[cur] = newFilterData[cur]
          }
          return acc
        }, {} as FilterData)
      )
      router.push({ pathname: `/jobs/${slug}`, query: { filter: stringifiedFilter } })
    }
  }

  return (
    <>
      <CustomHead
        title={`Latest Software Engineer Jobs within ${slug} hours | SWEJobs.fyi`}
        description={
          `Check out the past ${slug} hours software engineer jobs in the US within ${slug} hours. ` +
          'We track latest US software engineer jobs and compile market trends and stats ' +
          '- our data is updated constantly.'
        }
      ></CustomHead>
      <h1 className="my-2 text-2xl font-bold text-gray-900">Latest Software Engineer Jobs</h1>
      <ul className="my-2 flex flex-wrap border-b text-sm font-medium sm:gap-2">
        {Object.keys(slugs).map((slugOption, i) => {
          const currentTab = slugOption === slug
          return (
            <li key={i}>
              <Link
                href={`/jobs/${slugOption}`}
                className={classNames(
                  {
                    'active border-cyan-600 text-cyan-600': currentTab,
                    'border-transparent hover:border-gray-300 hover:text-gray-600': !currentTab,
                  },
                  'inline-block cursor-pointer rounded-t-lg border-b-2 p-2.5'
                )}
              >
                {slugs[slugOption]}
              </Link>
            </li>
          )
        })}
      </ul>
      <div className="hidden lg:grid lg:grid-cols-4 lg:gap-x-6">
        <div className="col-span-3 mb-2 flex items-end justify-between">
          <div className="text-sm text-gray-500">{`Showing ${jobs.length} jobs${
            jobs.length ? ` (updated: ${getTimeElapsed(props.lastUpdated)})` : ''
          }`}</div>
          <DropdownMenu
            options={sortByDropdownOptions}
            selected={sortBy}
            onChangeCallback={setSortBy}
          ></DropdownMenu>
        </div>
        <h2 className="col-span-1 my-2 text-lg font-medium text-gray-900">Filter by</h2>
        <div className="col-span-3">
          <div className="relative overflow-x-auto rounded-lg border border-gray-300 bg-gray-50 shadow-sm">
            <table className="w-full text-left text-sm text-gray-500">
              <thead className="border-b bg-gray-50 text-gray-700">
                <tr>
                  {/* We apply font-semibold in every <th> to overwrite its automatically applied font-bold */}
                  <th className="py-2 px-10 font-semibold">Company & Role</th>
                  <th className="py-2 px-6 font-semibold">
                    <div className="flex items-center gap-1">
                      Languages
                      <Tooltip>Click on any badges to apply filtering</Tooltip>
                    </div>
                  </th>
                  <th className="py-2 px-6 font-semibold">
                    <div className="flex items-center gap-1">
                      Skills
                      <Tooltip>Click on any badges to apply filtering</Tooltip>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {!jobs.length && (
                  <tr>
                    <td colSpan={3} className="bg-white py-5 text-center">
                      No matching jobs found
                    </td>
                  </tr>
                )}
                {jobs.map((job, i) => {
                  const {
                    bigTech,
                    company,
                    link,
                    hybrid,
                    loc,
                    remote,
                    salary,
                    skills,
                    startup,
                    title,
                  } = job
                  const evenRow = i % 2 === 0
                  const nonLangSkills = Object.keys(skills)
                    .filter((type) => type !== SkillType.LANGUAGE)
                    .reduce((acc, type) => [...acc, ...skills[type]], [])
                  return (
                    <Disclosure key={i}>
                      {({ open }) => (
                        <>
                          <tr
                            className={classNames({
                              'bg-white': evenRow,
                              'bg-gray-50': !evenRow,
                              'border-b shadow-sm': open,
                            })}
                          >
                            <td className="max-w-xs py-2 px-3">
                              <Disclosure.Button className="flex max-w-full items-center gap-3">
                                <div>
                                  <ChevronDownIcon
                                    className={classNames(
                                      { '-rotate-90 transform': open },
                                      'h-4 w-4 text-gray-700'
                                    )}
                                  />
                                </div>
                                <div className="truncate whitespace-nowrap text-left font-medium text-cyan-600 hover:underline">
                                  {company}
                                  <div className="flex items-center">
                                    {bigTech && <Badge value="Big Tech" />}
                                    {!bigTech && startup && <Badge value="Startup" />}
                                    {remote && <Badge value="Remote" />}
                                    {hybrid && <Badge value="Hybrid" />}
                                    <p className="truncate whitespace-nowrap font-normal text-gray-900">
                                      {title}
                                    </p>
                                  </div>
                                </div>
                              </Disclosure.Button>
                            </td>
                            <td className="max-w-[18rem] py-2 px-6">
                              <div className="flex flex-wrap">
                                {skills[SkillType.LANGUAGE].map((skill, i) => (
                                  <Badge
                                    key={i}
                                    value={skill}
                                    onClickCallBack={handleFilterChange('skills')}
                                  />
                                ))}
                              </div>
                            </td>
                            <td className="max-w-[25rem] py-2 px-6">
                              <div className="flex flex-wrap">
                                {nonLangSkills.map((skill, i) => (
                                  <Badge
                                    key={i}
                                    value={skill}
                                    onClickCallBack={handleFilterChange('skills')}
                                  />
                                ))}
                              </div>
                            </td>
                          </tr>
                          <tr>
                            <td colSpan={3}>
                              <Disclosure.Panel
                                className={classNames(
                                  {
                                    'bg-white': evenRow,
                                    'bg-gray-50': !evenRow,
                                  },
                                  'grid grid-cols-[19rem_minmax(0,_1fr)] border-b px-10 py-4 text-sm text-gray-500 shadow-sm'
                                )}
                              >
                                <div className="flex flex-col gap-1 text-base font-medium text-cyan-600">
                                  {company}
                                  <p className="text-gray-900">{title}</p>
                                  <p className="text-sm font-normal text-gray-700">{loc}</p>
                                  <p className="text-sm font-normal text-gray-700">
                                    {salary || 'No salary estimation'}
                                  </p>
                                  <button
                                    type="button"
                                    className={classNames(
                                      {
                                        'bg-gray-50 hover:bg-gray-100': evenRow,
                                        'bg-gray-100 hover:bg-gray-200': !evenRow,
                                      },
                                      'w-24 rounded-md border border-gray-300  px-4 py-2 text-sm font-medium text-gray-700'
                                    )}
                                  >
                                    <a href={link} target="_blank" rel="noreferrer">
                                      Job Post
                                    </a>
                                  </button>
                                </div>
                                <div className="flex flex-col gap-1 text-base font-medium text-gray-900">
                                  Skill Requirements
                                  <div
                                    className={classNames(
                                      {
                                        'bg-gray-50': evenRow,
                                        'bg-gray-100': !evenRow,
                                      },
                                      'flex h-full flex-col gap-2 rounded-md px-4 py-2 text-sm'
                                    )}
                                  >
                                    {Object.keys(skills).map((type, i) =>
                                      skills[type].length ? (
                                        <p key={i}>
                                          {`${type}: `}
                                          <span className="font-normal">
                                            {skills[type].join(', ')}
                                          </span>
                                        </p>
                                      ) : null
                                    )}
                                  </div>
                                </div>
                              </Disclosure.Panel>
                            </td>
                          </tr>
                        </>
                      )}
                    </Disclosure>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="col-span-1 h-fit rounded-t-lg border border-gray-300 bg-gray-50 text-sm font-bold text-gray-900 shadow-sm">
          {Object.values(filterData).flat().length ? (
            <div className="p-4 pb-2">
              <div>Chosen filters:</div>
              <div className="mt-3 flex flex-wrap">
                {filterData.cities.map((city, i) => (
                  <Badge
                    key={i}
                    value={cities.find((c) => c.city === city).name}
                    onClickCallBack={(v) =>
                      handleFilterChange('cities')(cities.find((c) => c.name === v).city)
                    }
                  >
                    <XCircleIcon className="h-5 w-5"></XCircleIcon>
                  </Badge>
                ))}
                {filterData.companyTypes.map((type, i) => (
                  <Badge key={i} value={type} onClickCallBack={handleFilterChange('companyTypes')}>
                    <XCircleIcon className="h-5 w-5"></XCircleIcon>
                  </Badge>
                ))}
                {filterData.remoteTypes.map((type, i) => (
                  <Badge key={i} value={type} onClickCallBack={handleFilterChange('remoteTypes')}>
                    <XCircleIcon className="h-5 w-5"></XCircleIcon>
                  </Badge>
                ))}
                {filterData.skills.map((skill, i) => (
                  <Badge key={i} value={skill} onClickCallBack={handleFilterChange('skills')}>
                    <XCircleIcon className="h-5 w-5"></XCircleIcon>
                  </Badge>
                ))}
              </div>
            </div>
          ) : null}
          <SideFilterSection title="Location">
            <ul>
              {cities.map(({ city, name }, i) => (
                <li className="my-0.5 flex items-center" key={i}>
                  <input
                    id={`${city}-checkbox`}
                    type="checkbox"
                    checked={filterData.cities.includes(city)}
                    className="h-4 w-4 cursor-pointer rounded border-gray-300 bg-gray-100 accent-cyan-600"
                    onChange={() => handleFilterChange('cities')(city)}
                  />
                  <label
                    htmlFor={`${city}-checkbox`}
                    className="ml-2 cursor-pointer font-normal text-gray-600"
                  >
                    {name}
                  </label>
                </li>
              ))}
            </ul>
          </SideFilterSection>
          <SideFilterSection title="Company">
            <ul>
              {companyOptions.map((option, i) => (
                <li className="my-0.5 flex items-center" key={i}>
                  <input
                    id={`${option}-checkbox`}
                    type="checkbox"
                    className="h-4 w-4 cursor-pointer rounded border-gray-300 bg-gray-100 accent-cyan-600"
                    checked={filterData.companyTypes.includes(option)}
                    onChange={() => handleFilterChange('companyTypes')(option)}
                  />
                  <label
                    htmlFor={`${option}-checkbox`}
                    className="ml-2 cursor-pointer font-normal text-gray-600"
                  >
                    {option}
                  </label>
                </li>
              ))}
            </ul>
          </SideFilterSection>
          <SideFilterSection title="On-site/Remote">
            <ul>
              {remoteOptions.map((option, i) => (
                <li className="my-0.5 flex items-center" key={i}>
                  <input
                    id={`${option}-checkbox`}
                    type="checkbox"
                    className="h-4 w-4 cursor-pointer rounded border-gray-300 bg-gray-100 accent-cyan-600"
                    checked={filterData.remoteTypes.includes(option)}
                    onChange={() => handleFilterChange('remoteTypes')(option)}
                  />
                  <label
                    htmlFor={`${option}-checkbox`}
                    className="ml-2 cursor-pointer font-normal text-gray-600"
                  >
                    {option}
                  </label>
                </li>
              ))}
            </ul>
          </SideFilterSection>
          {Object.keys(skillsByType).map((type, i) => (
            <SideFilterSection title={type} key={i} defaultOpen={type === SkillType.LANGUAGE}>
              <div className="flex flex-wrap">
                {skillsByType[type].map((skill: string | string[]) => {
                  const skillName = skill instanceof Array ? skill[0] : skill
                  return Object.keys(props.stats).includes(skillName) ? (
                    <Badge
                      value={skillName}
                      onClickCallBack={(v) => {
                        handleFilterChange('skills')(v as string)
                        close()
                      }}
                    >
                      <div className="my-[1px] flex h-4 w-4 items-center justify-center rounded-md bg-white/40">
                        {props.stats[skillName]}
                      </div>
                    </Badge>
                  ) : null
                })}
              </div>
            </SideFilterSection>
          ))}
        </div>
      </div>

      {/* for small view */}
      <div className="relative overflow-x-auto rounded-lg border border-gray-300 bg-gray-50 shadow-sm lg:hidden">
        <table className="w-full text-left text-sm text-gray-500">
          <thead className="border-b bg-gray-50 text-gray-700">
            <tr>
              <th scope="col" className="py-3 px-10 font-semibold">
                <div className="flex items-center gap-1">
                  Jobs
                  <Tooltip>Click on any badges to apply filtering</Tooltip>
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {!jobs.length && (
              <tr>
                <td className="bg-white py-5 text-center">No matching jobs found</td>
              </tr>
            )}
            {jobs.map((job, i) => {
              const {
                bigTech,
                company,
                hybrid,
                link,
                loc,
                remote,
                salary,
                skills,
                startup,
                title,
              } = job
              const evenRow = i % 2 === 0
              const nonLangSkills = Object.keys(skills)
                .filter((type) => type !== SkillType.LANGUAGE)
                .reduce((acc, type) => [...acc, ...skills[type]], [])
              return (
                <Disclosure key={i}>
                  {({ open }) => (
                    <>
                      <tr
                        className={classNames({
                          'bg-white': evenRow,
                          'bg-gray-50': !evenRow,
                          'border-b shadow-sm': open,
                        })}
                      >
                        <td className="py-2 px-3">
                          <Disclosure.Button className="flex max-w-full items-center gap-3">
                            <div>
                              <ChevronDownIcon
                                className={classNames(
                                  { 'rotate-180 transform': open },
                                  'h-4 w-4 text-gray-700'
                                )}
                              />
                            </div>
                            <div className="truncate whitespace-nowrap text-left font-medium text-cyan-600 hover:underline">
                              {company}
                              <div className="flex items-center">
                                {bigTech && <Badge value="Big Tech" />}
                                {!bigTech && startup && <Badge value="Startup" />}
                                {remote && <Badge value="Remote" />}
                                {hybrid && <Badge value="Hybrid" />}
                                <p className="truncate whitespace-nowrap font-normal text-gray-900">
                                  {title}
                                </p>
                              </div>
                            </div>
                          </Disclosure.Button>
                          {skills[SkillType.LANGUAGE].length ? (
                            <div className="my-1.5 ml-7 flex flex-wrap items-center">
                              <p className="mr-2 font-medium text-gray-900">Languages:</p>
                              {skills[SkillType.LANGUAGE].map((skill, i) => (
                                <Badge
                                  key={i}
                                  value={skill}
                                  onClickCallBack={handleFilterChange('skills')}
                                />
                              ))}
                            </div>
                          ) : null}
                          {nonLangSkills.length ? (
                            <div className="my-1.5 ml-7 flex flex-wrap items-center">
                              <p className="mr-2 font-medium text-gray-900">Skills:</p>
                              {nonLangSkills.map((skill, i) => (
                                <Badge
                                  key={i}
                                  value={skill}
                                  onClickCallBack={handleFilterChange('skills')}
                                />
                              ))}
                            </div>
                          ) : null}
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <Disclosure.Panel
                            className={classNames(
                              {
                                'bg-white': evenRow,
                                'bg-gray-50': !evenRow,
                              },
                              'border-b px-10 py-4 text-sm text-gray-500 shadow-sm'
                            )}
                          >
                            <div className="flex flex-col gap-1 text-base font-medium text-cyan-600">
                              {company}
                              <p className="text-gray-900">{title}</p>
                              <p className="text-sm font-normal text-gray-700">{loc}</p>
                              <p className="text-sm font-normal text-gray-700">
                                {salary || 'No salary estimation'}
                              </p>
                              <button
                                type="button"
                                className={classNames(
                                  {
                                    'bg-gray-50 hover:bg-gray-100': evenRow,
                                    'bg-gray-100 hover:bg-gray-200': !evenRow,
                                  },
                                  'w-24 rounded-md border border-gray-300  px-4 py-2 text-sm font-medium text-gray-700'
                                )}
                              >
                                <a href={link} target="_blank" rel="noreferrer">
                                  Job Post
                                </a>
                              </button>
                            </div>
                          </Disclosure.Panel>
                        </td>
                      </tr>
                    </>
                  )}
                </Disclosure>
              )
            })}
          </tbody>
        </table>
      </div>
    </>
  )
}

// This function gets called at build time
export const getStaticPaths: GetStaticPaths = async () => {
  // Get the paths we want to pre-render based on cities and times
  const paths = Object.keys(slugs).map((slug) => ({
    params: { slug },
  }))

  // We'll pre-render only these paths at build time.
  // { fallback: false } means other routes should 404.
  return { paths, fallback: false }
}

// This also gets called at build time
export const getStaticProps: GetStaticProps = async (context) => {
  const { slug } = context.params
  const lastUpdated = new Date().getTime()
  let shiftDateBy = Number(slug) / 24 - 1

  // load mock data for development
  if (process.env.NODE_ENV === 'development') {
    const curatedMockData = mockJobs.map((mockJob) => {
      let { bigTech, city, company, hybrid, link, loc, remote, salary, skills, startup, title } =
        mockJob
      return {
        bigTech,
        city,
        company,
        createdAt: new Date().getTime(),
        hybrid,
        link,
        loc,
        remote,
        salary,
        skills: categorizeSkills(skills),
        startup,
        title,
      }
    })
    // make curatedMockData x times longer based on shiftDateBy to test pagination
    const mockData = Array.from({ length: shiftDateBy + 1 }, () => curatedMockData).flat()

    return {
      props: {
        jobs: mockData,
        stats: assembleStats(mockData),
        lastUpdated,
      },
    }
  }

  let jobs: Job[]
  if (slug === '24') {
    jobs = await getLatestJobs()
  } else {
    // if jobs haven't been updated today, shift back by 1 day
    let dateStr = convertDateToString(new Date())
    const todayDataAvailable = await checkTodayData('SJ', dateStr)
    if (!todayDataAvailable) shiftDateBy += 1

    dateStr = getPreviousDateString(dateStr, shiftDateBy)

    const jobsByCity = await Promise.all(cities.map(({ city }) => getDailyJobs(city, dateStr)))
    jobs = jobsByCity.flat()
  }

  console.log(`There are ${jobs.length} jobs for ${slugs[slug as string]}`)
  // Pass collection data to the page via props
  return { props: { jobs, stats: assembleStats(jobs), lastUpdated } }
}

const assembleStats = (jobs: Job[]) => {
  const stats: { [skill: string]: number } = {}
  jobs.forEach((job) => {
    Object.keys(job.skills).forEach((skillType) => {
      job.skills[skillType as SkillType].forEach((skill) => {
        if (stats[skill]) stats[skill] += 1
        else stats[skill] = 1
      })
    })
  })
  return stats
}
