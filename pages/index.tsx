import { CustomHead } from '../components/CustomHead'
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
      <CustomHead title="SWEJobs.fyi - Software Engineer Jobs and Trends Tracker"></CustomHead>
      <main className="mt-20 flex flex-col items-center justify-center">
        <div className="flex flex-col items-center gap-3 md:flex-row">
          <Image className="w-[30rem] max-w-full" src={mainSchematic} alt="SWEJobs.fyi" />
          <div className="text-center md:text-left">
            <h1 className="text-2xl font-medium">SWEJobs.fyi</h1>
            <p className="text-xl">Break down software engineer job postings for you</p>
          </div>
        </div>
      </main>
    </div>
  )
}
