import { useRouter } from 'next/router'
import { db } from '../../firebase'
import { collection, getDocs } from 'firebase/firestore/lite'
import { GetStaticPaths, GetStaticProps } from 'next'

type Jobs = {
  jobs: Array<{
    companyName: string
    companyLocation: string
    jobLink: string
    jobTitle: string
    salary: string
    skills: string[]
  }>
}

export default function JobPosts({ jobs }: Jobs) {
  const router = useRouter()
  const { city } = router.query

  return (
    <div>
      <h1 className="text-xl text-gray-900 py-3">
        There are {jobs.length} jobs in {city} in the last 24hrs
      </h1>
      <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="py-3 px-6">
                Company name
              </th>
              <th scope="col" className="py-3 px-6">
                Title
              </th>
              <th scope="col" className="py-3 px-6">
                Location
              </th>
              <th scope="col" className="py-3 px-6">
                Salary
              </th>
              <th scope="col" className="py-3 px-6">
                Skills
              </th>
              <th scope="col" className="py-3 px-6">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job, i) => {
              const { companyName, companyLocation, jobLink, jobTitle, salary, skills } = job
              return (
                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700" key={i}>
                  <th
                    scope="row"
                    className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {companyName}
                  </th>
                  <td className="py-4 px-6">{jobTitle}</td>
                  <td className="py-4 px-6">{companyLocation}</td>
                  <td className="py-4 px-6">{salary}</td>
                  <td className="py-4 px-6">{skills.join(', ')}</td>
                  <td className="py-4 px-6">
                    <a
                      href={jobLink}
                      className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                    >
                      Apply
                    </a>
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

const cities = ['SF', 'SJ', 'SEA', 'LA']

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
  const { city } = context.params
  const today = new Date()
  const yesterday = new Date(today)
  yesterday.setDate(yesterday.getDate() - 1)
  const todayStr = today.toLocaleDateString('en-us', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
  const yesterdayStr = today.toLocaleDateString('en-us', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
  let QuerySnapshot = await getDocs(collection(db, `indeed-${city}-${todayStr}`))
  if (QuerySnapshot.size === 0) {
    QuerySnapshot = await getDocs(collection(db, `indeed-${city}-${yesterdayStr}`))
  }

  const jobs = QuerySnapshot.docs.map((doc) => {
    const { companyName, companyLocation, jobLink, jobTitle, salary, skills } = doc.data()
    return { companyName, companyLocation, jobLink, jobTitle, salary, skills }
  })
  console.log(`There are ${QuerySnapshot.size} jobs in ${city}`)
  // Pass collection data to the page via props
  return { props: { jobs } }
}
