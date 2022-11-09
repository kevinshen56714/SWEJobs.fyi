import { Highlight, Paragraph } from './about-data'

import { CustomHead } from '../../components/CustomHead'
import Image from 'next/image'
import figure from '../../public/logo-thin.png'

export default function AboutUs() {
  return (
    <>
      <CustomHead title="About Us | SWEJobs.fyi"></CustomHead>
      <div className="flex flex-col items-center text-gray-900">
        <Image className="w-[90%] max-w-xs px-5" src={figure} alt="SWEJobs.fyi" />
        <div className="w-full">
          <Paragraph>
            SWEJobs.fyi is created by a{' '}
            <a
              className="font-medium text-blue-600 underline"
              href="https://github.com/kevinshen56714/SWEJobs.fyi/graphs/contributors"
            >
              small, dedicated team
            </a>{' '}
            that aims to{' '}
            <Highlight>
              help software engineers find timely job opportunities that best fit their skills and
              interests
            </Highlight>
            .
          </Paragraph>
          <Paragraph>
            We believe the best way to achieve that is to organize job postings in a clear way and
            build an intuitive and efficient filtering tool that are designed specifically for
            software engineers. Our mission is not to replace job boards like LinkedIn or Indeed,
            but to{' '}
            <Highlight>
              provide high quality lists of job opportunities curated by us and empower you to find
              the ones that best fit you in seconds
            </Highlight>
            .
          </Paragraph>
          <Paragraph>
            We also think that{' '}
            <Highlight>
              understanding the job market is a key to making informed career decisions
            </Highlight>
            . Therefore, we provide a variety of trends and statistics to help software engineers
            make the most out of their job search.
          </Paragraph>
          <Paragraph>
            We hope you find SWEJobs.fyi useful! If you have any questions or suggestions, please
            feel free to{' '}
            <a
              className="font-medium text-blue-600 underline"
              href="https://github.com/kevinshen56714/SWEJobs.fyi/discussions"
            >
              reach out to us
            </a>
            .
          </Paragraph>
        </div>
      </div>
    </>
  )
}
