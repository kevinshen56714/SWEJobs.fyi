import {
  Bars3Icon,
  BriefcaseIcon,
  ChartBarIcon,
  ChartPieIcon,
  UserGroupIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'

import { Disclosure } from '@headlessui/react'
import Image from 'next/image'
import Link from 'next/link'
import { SkillType } from '../types/Skills'
import classNames from 'classnames'
import { useRouter } from 'next/router'

const navigation = [
  {
    name: 'Jobs',
    href: '/jobs/SJ',
    icon: <BriefcaseIcon className="block h-6 w-6" aria-hidden="true" />,
  },
  {
    name: 'Trends',
    href: `/trends/SJ/${SkillType.LANGUAGE}`,
    icon: <ChartBarIcon className="block h-6 w-6" aria-hidden="true" />,
  },
  {
    name: 'Stats',
    href: '/stats/SJ',
    icon: <ChartPieIcon className="block h-6 w-6" aria-hidden="true" />,
  },
  {
    name: 'About Us',
    href: '#',
    icon: <UserGroupIcon className="block h-6 w-6" aria-hidden="true" />,
  },
]

export const NavBar = () => {
  const router = useRouter()
  return (
    <Disclosure as="nav" className="bg-gray-800">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-5xl px-4 sm:px-12 lg:px-5">
            <div className="relative flex h-16 items-center justify-between">
              <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                {/* Mobile menu button*/}
                <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                  )}
                </Disclosure.Button>
              </div>
              <div className="flex flex-1 items-center justify-center sm:items-stretch sm:justify-start">
                <Image
                  className="block h-8 w-auto lg:hidden"
                  width={32}
                  height={32}
                  src="/global-job.svg"
                  alt="SWEJobs.fyi"
                />
                <Link href="/">
                  <a className="rounded-md px-3 py-2.5 font-semibold text-white">SWEJobs.fyi</a>
                </Link>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map(({ href, name, icon }) => {
                      const current = router.asPath.startsWith(href.split('/', 2).join('/'))
                      return (
                        <Link href={href} key={name}>
                          <a
                            className={classNames(
                              {
                                'bg-gray-900 text-white': current,
                                'text-gray-300 hover:bg-gray-700 hover:text-white': !current,
                              },
                              'flex gap-2 rounded-md px-3 py-3 text-sm font-medium'
                            )}
                            aria-current={current ? 'page' : undefined}
                          >
                            {icon}
                            {name}
                          </a>
                        </Link>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3">
              {navigation.map(({ href, name, icon }) => {
                const current = router.asPath.startsWith(href)
                return (
                  <Disclosure.Button
                    key={name}
                    as="a"
                    href={href}
                    className={classNames(
                      {
                        'bg-gray-900 text-white': current,
                        'text-gray-300 hover:bg-gray-700 hover:text-white': !current,
                      },
                      'flex gap-2 rounded-md px-3 py-2 text-base font-medium'
                    )}
                    aria-current={current ? 'page' : undefined}
                  >
                    {icon}
                    {name}
                  </Disclosure.Button>
                )
              })}
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
