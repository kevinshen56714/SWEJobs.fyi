import { Badge } from '../components/Badge'
import { CustomHead } from '../components/CustomHead'
import { DropdownMenu } from '../components/DropdownMenu'
import Image from 'next/image'
import Link from 'next/link'
import mainSchematic from '../public/main-schematic.svg'
import { skillsByType } from '../utils/analysis'
import { useRouter } from 'next/router'
import { useState } from 'react'

export const cities = [
  { city: 'SJ', name: 'San Jose, CA' },
  { city: 'SF', name: 'San Francisco, CA' },
  { city: 'LA', name: 'Los Angeles, CA' },
  { city: 'SEA', name: 'Seattle, WA' },
  { city: 'NY', name: 'New York, NY' },
  { city: 'AU', name: 'Austin, TX' },
]

export default function Home() {
  const router = useRouter()
  const [skillType, setSkillType] = useState(Object.keys(skillsByType)[0])

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
        <div className="mt-20 flex w-full flex-col items-center gap-2 bg-gray-50 py-20 px-5 sm:px-20">
          <h2 className="w-full text-xl font-medium">
            Check out the latest SWE jobs
            <span className="font-normal"> - that best fit your skills</span>
          </h2>
          <div className="w-full text-lg">
            Choose an area of your expertise:
            <div className="max-w-[15rem] md:mx-2 md:inline-block">
              <DropdownMenu
                options={Object.keys(skillsByType)}
                selected={skillType}
                onChangeCallback={setSkillType}
              ></DropdownMenu>
            </div>
            and click on any of the skills below!
          </div>
          <div className="flex flex-wrap rounded-md border p-4 shadow-sm">
            {skillsByType[skillType].map((skill: string | string[], i: React.Key) => (
              <Badge
                key={i}
                value={skill instanceof Array ? skill[0] : skill}
                onClickCallBack={(skill) =>
                  router.push(`/jobs/${cities[0].city}/24?skills=${skill}`)
                }
              />
            ))}
          </div>
          <p className="mt-5 text-gray-500">
            or just{' '}
            <Link className="underline" href="/jobs/SJ/24">
              check all jobs
            </Link>
          </p>
        </div>
        <div className="flex w-full flex-col items-start gap-5 py-20 px-5 sm:px-20">
          <h2 className="text-xl font-medium">
            Understand the SWE job market
            <span className="font-normal"> - and make better career decisions</span>
          </h2>
          <div className="grid w-full grid-rows-2 gap-10 text-lg sm:grid-cols-2 sm:grid-rows-1">
            <div
              className="group h-36 overflow-hidden rounded-xl border bg-[url('/trends-page-snapshot.png')] bg-cover shadow-sm hover:cursor-pointer"
              onClick={() =>
                router.push(`/trends/${cities[0].city}/${Object.keys(skillsByType)[0]}`)
              }
            >
              <div className="flex h-full items-center justify-center bg-gray-400/30 font-medium backdrop-blur-[2px]">
                <div className="rounded-md bg-white/50 px-2 py-2 group-hover:bg-white/60">
                  Weekly Trends &rarr;
                </div>
              </div>
            </div>
            <div
              className="group h-36 overflow-hidden rounded-xl border bg-[url('/stats-page-snapshot.png')] bg-cover shadow-sm hover:cursor-pointer"
              onClick={() =>
                router.push(`/stats/${cities[0].city}/${Object.keys(skillsByType)[0]}`)
              }
            >
              <div className="flex h-full items-center justify-center bg-gray-400/30 font-medium backdrop-blur-[2px]">
                <div className="rounded-md bg-white/50 px-2 py-2 group-hover:bg-white/60">
                  Monthly Stats &rarr;
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
