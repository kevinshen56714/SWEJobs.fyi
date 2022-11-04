import { Badge } from '../../components/Badge'
import Image from 'next/image'
import Link from 'next/link'
import { SkillType } from '../../types/Skills'
import { cities } from '..'
import figure from '../../public/magnify-glass.svg'
import { skillsByType } from '../../utils/analysis'

const Paragraph = (props: { children: React.ReactNode }) => (
  <div className="mt-6">{props.children}</div>
)

export default function AboutData() {
  return (
    <div className="flex flex-col items-center">
      <Image className="w-4/5 max-w-md px-5" src={figure} alt="SWEJobs.fyi" />
      <div className="w-full">
        <Paragraph>
          SWEJobs.fyi collects <span className="font-medium">software engineer</span> job postings
          for {cities.length} major US cities:{' '}
          <span className="font-medium">{cities.map((city) => city.name).join(', ')}</span>.
        </Paragraph>
        <Paragraph>
          Currently, we update our data <span className="font-medium">every 24 hours</span>. Under
          the{' '}
          <Link className="font-medium text-blue-600 underline" href="/jobs/SJ/24">
            Jobs
          </Link>{' '}
          tab, job postings are organized not only by city but also by the number of days since the
          posting was made. We believe software engineer job postings generally do not remain open
          for more than a couple of days. Therefore,{' '}
          <span className="font-medium">we only show postings that are less than 72 hours old</span>
          .
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
          of skills and tech stacks on the market on a week or month timescale. If there is a need,
          we might release a monthly or yearly report in the future. Feel free to{' '}
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
          <span className="font-medium">we break down job postings into skill labels</span>. These
          skill labels are either programming/scripting languages or technologies listed in the job.
          Currently, we track a fixed list of skills that are either{' '}
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
          <span className="font-medium">{Object.keys(skillsByType).join(', ')}</span> for better
          visualization and coloring.{' '}
          <a
            className="font-medium text-blue-600 underline"
            href="https://github.com/kevinshen56714/SWEJobs.fyi/issues/new?labels=enhancement&template=skill_label_request.md"
          >
            Please help us grow or improve the list!
          </a>{' '}
          Any feedback such as suggesting a new label or correcting a mislabeling/misclassification
          will be greatly appreciated!
        </Paragraph>
        <Paragraph>All the skill keywords we are tracking are listed below:</Paragraph>
        <div className="relative grid gap-4 bg-white py-4 lg:grid-cols-3">
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
      </div>
    </div>
  )
}
