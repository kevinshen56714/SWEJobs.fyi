import Head from 'next/head'
import Link from 'next/link'

export const cities = [
  { city: 'SJ', name: 'San Jose, CA' },
  { city: 'SF', name: 'San Francisco, CA' },
  { city: 'LA', name: 'Los Angeles, CA' },
  { city: 'SEA', name: 'Seattle, WA' },
  { city: 'NY', name: 'New York, NY' },
  { city: 'AU', name: 'Austin, TX' },
]

export default function Home() {
  return (
    <div>
      <Head>
        <title>SWEJobs.fyi</title>
        <meta name="description" content="View latest software engineer jobs and trends" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="mt-20 flex flex-col items-center justify-center">
        <div className="text-2xl font-medium">Welcome to SWEJobs.fyi!</div>

        <p>Landing page is a work-in-progress</p>
        <p>Please use the nav bar for navigation</p>
      </main>
    </div>
  )
}
