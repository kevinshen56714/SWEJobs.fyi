import { bigTechs, skillsByType } from '../../utils/analysis'

import { Badge } from '../../components/Badge'
import { ChevronDownIcon } from '@heroicons/react/24/solid'
import { Disclosure } from '@headlessui/react'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { SkillType } from '../../types/Skills'
import { cities } from '..'
import figure from '../../public/magnify-glass.svg'

const Paragraph = (props: { children: React.ReactNode }) => (
  <div className="mt-6">{props.children}</div>
)

const Highlight = (props: { children: React.ReactNode }) => (
  <span className="font-medium">{props.children}</span>
)

export default function AboutData() {
  return (
    <>
      <Head>
        <title>About Data | SWEJobs.fyi</title>
      </Head>
      <div className="flex flex-col items-center text-gray-900">
        <Image className="w-[90%] max-w-md px-5" src={figure} alt="SWEJobs.fyi" />
        <div className="w-full">
          <Paragraph>
            SWEJobs.fyi collects <Highlight>software engineer</Highlight> job postings for{' '}
            {cities.length} major US cities:{' '}
            <Highlight>{cities.map((city) => city.name).join(', ')}</Highlight>.
          </Paragraph>
          <Paragraph>
            Currently, we update our data <Highlight>every 24 hours</Highlight>. Under the{' '}
            <Link className="font-medium text-blue-600 underline" href="/jobs/SJ/24">
              Jobs
            </Link>{' '}
            tab, job postings are organized not only by city but also by the number of days since
            the posting was made. We believe software engineer job postings generally do not remain
            open for more than a couple of days. Therefore,{' '}
            <Highlight>we only show postings that are less than 72 hours old</Highlight>.
          </Paragraph>
          <Paragraph>
            However, we do make use of all the prior job postings that we collected and provide{' '}
            <Link className="font-medium text-blue-600 underline" href="/trends/SJ/Language">
              Trends
            </Link>{' '}
            and{' '}
            <Link className="font-medium text-blue-600 underline" href="/stats/SJ/Language">
              Stats
            </Link>{' '}
            of skills and tech stacks on the market on a week or month timescale. If there is a
            need, we might release a monthly or yearly report in the future. Feel free to{' '}
            <a
              className="font-medium text-blue-600 underline"
              href="https://github.com/kevinshen56714/SWEJobs.fyi/issues/new?labels=enhancement&template=feature_request.md"
            >
              let us know
            </a>{' '}
            what you would like to see!
          </Paragraph>
          <Paragraph>
            As the core feature of SWEJobs.fyi,{' '}
            <Highlight>we break down job postings into skill labels</Highlight> such as{' '}
            <div className="inline-flex">
              <Badge value="Python" />
              <Badge value="React" />
              <Badge value="MySQL" />
            </div>
            These skill labels are either programming/scripting languages or technologies listed in
            the job. Currently, we track a fixed list of skills that are either{' '}
            <a
              className="font-medium underline"
              href="https://survey.stackoverflow.co/2022/#technology-most-popular-technologies"
            >
              most popular technologies
            </a>{' '}
            or are commonly seen in job postings.
          </Paragraph>
          <Paragraph>
            We split the skill labels/keywords into 8 classes:{' '}
            <Highlight>{Object.keys(skillsByType).join(', ')}</Highlight> for better visualization
            and coloring.{' '}
            <a
              className="font-medium text-blue-600 underline"
              href="https://github.com/kevinshen56714/SWEJobs.fyi/issues/new?labels=enhancement&template=skill_label_request.md"
            >
              Please help us grow or improve the list!
            </a>{' '}
            Any feedback such as suggesting a new label or correcting a
            mislabeling/misclassification will be greatly appreciated! All the skill keywords we are
            tracking are listed below:
          </Paragraph>
        </div>
        <Disclosure>
          {({ open }) => (
            <>
              <Disclosure.Button className="mt-6 flex justify-between gap-2 rounded-lg bg-purple-100 px-4 py-2 text-left text-sm font-medium text-purple-900 hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75">
                <span>All skill labels (click to expand)</span>
                <ChevronDownIcon
                  className={`${open ? 'rotate-180 transform' : ''} h-5 w-5 text-purple-500`}
                />
              </Disclosure.Button>
              <Disclosure.Panel className="px-4 pt-4 pb-2 text-sm text-gray-500">
                <div className="relative grid gap-4 bg-white py-2 lg:grid-cols-3">
                  {Object.keys(skillsByType).map((type, i) => (
                    <div
                      key={i}
                      className={`rounded-lg border px-4 py-2 shadow-sm ${
                        type === SkillType.LANGUAGE && 'lg:col-span-2'
                      }`}
                    >
                      <h1 className="mb-2 text-sm font-medium text-gray-900">{type}</h1>
                      <div className="flex flex-wrap">
                        {skillsByType[type].map((skill: string | string[], i: number) => (
                          <Badge key={i} value={skill instanceof Array ? skill[0] : skill} />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </Disclosure.Panel>
            </>
          )}
        </Disclosure>
        <Paragraph>
          We also label jobs with{' '}
          <div className="inline-flex">
            <Badge value="Remote" />
            <Badge value="Big Tech" />
            <Badge value="Startup" />
          </div>
          A job posting is considered from a big tech if it is posted by{' '}
          <Highlight>{bigTechs.join(', ')}</Highlight>. This list of big techs is obtained from{' '}
          <a className="font-medium underline" href="https://levels.fyi">
            levels.fyi
          </a>
          , but{' '}
          <a
            className="font-medium text-blue-600 underline"
            href="https://github.com/kevinshen56714/SWEJobs.fyi/issues/new?labels=enhancement&template=skill_label_request.md"
          >
            feel free to provide any suggestions!
          </a>{' '}
        </Paragraph>
      </div>
    </>
  )
}
