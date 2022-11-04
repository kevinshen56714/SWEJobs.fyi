import Head from 'next/head'
import Image from 'next/image'
import mainSchematic from '../public/main-schematic.svg'

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
        <title>SWEJobs.fyi - Software Engineer Jobs and Trends Tracker</title>
      </Head>

      <main className="mt-20 flex flex-col items-center justify-center">
        <div className="flex flex-col items-center gap-3 sm:flex-row">
          <Image className="max-w-md" src={mainSchematic} alt="SWEJobs.fyi" />
          <div>
            <div className="text-center text-2xl font-medium sm:text-left">SWEJobs.fyi</div>
            <p className="text-xl">Break down software engineer job postings for you</p>
          </div>
        </div>
      </main>
    </div>
  )
}
