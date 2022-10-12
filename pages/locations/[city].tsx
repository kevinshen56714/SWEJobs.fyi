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
      <p>
        There are {jobs.length} jobs in {city}
      </p>
      {jobs.map((job, i) => (
        <p key={i}>{job.companyName}</p>
      ))}
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
