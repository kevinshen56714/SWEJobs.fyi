import {
  Bars3Icon,
  BriefcaseIcon,
  ChartBarIcon,
  ChartPieIcon,
  InformationCircleIcon,
  UserGroupIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline'
import { Disclosure, Menu, Transition } from '@headlessui/react'

import { Fragment } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { SkillType } from '../types/Skills'
import classNames from 'classnames'
import logo from '../public/logo.png'
import { useRouter } from 'next/router'

const navigation = [
  {
    name: 'Jobs',
    href: '/jobs/SJ/24',
    icon: <BriefcaseIcon className="block h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />,
  },
  {
    name: 'Trends',
    href: `/trends/SJ/${SkillType.LANGUAGE}/daily-trends`,
    icon: <ChartBarIcon className="block h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />,
  },
  {
    name: 'Stats',
    href: `/stats/SJ/${SkillType.LANGUAGE}`,
    icon: <ChartPieIcon className="block h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />,
  },
]

const smallViewExtraNavigation = [
  {
    name: 'About Data',
    href: '/about/about-data',
    icon: <InformationCircleIcon className="block h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />,
  },
  {
    name: 'About Us',
    href: '/about/about-us',
    icon: <UserGroupIcon className="block h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true" />,
  },
  {
    name: 'GitHub',
    href: 'https://github.com/kevinshen56714/SWEJobs.fyi',
    icon: (
      <svg
        className="h-5 w-5 sm:h-6 sm:w-6"
        fill="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path
          fillRule="evenodd"
          d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
          clipRule="evenodd"
        ></path>
      </svg>
    ),
  },
]

export const NavBar = () => {
  const router = useRouter()
  return (
    <Disclosure as="nav" className="bg-gray-700">
      {({ open }) => (
        <div className="shadow-lg">
          <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
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
                <div className="flex flex-shrink-0 items-center">
                  <Image className="block h-10 w-10" src={logo} alt="SWEJobs.fyi" />
                  <Link href="/" className="rounded-md px-2 text-lg font-semibold text-white">
                    SWEJobs.fyi
                  </Link>
                </div>
                <div className="hidden sm:ml-6 sm:block">
                  <div className="flex space-x-4">
                    {navigation.map(({ href, name, icon }) => {
                      const current = router.asPath.startsWith(href.split('/', 2).join('/'))
                      return (
                        <Link
                          href={href}
                          key={name}
                          className={classNames(
                            {
                              'bg-gray-900 text-white': current,
                              'text-gray-300 hover:bg-gray-700 hover:text-white': !current,
                            },
                            'flex items-center gap-2 rounded-md px-3 py-3 text-sm font-medium'
                          )}
                          aria-current={current ? 'page' : undefined}
                        >
                          {icon}
                          {name}
                        </Link>
                      )
                    })}
                    {/* About dropdown */}
                    <Menu as="div" className="relative ml-3">
                      <div>
                        <Menu.Button
                          className={classNames(
                            {
                              'bg-gray-900 text-white': router.asPath.startsWith('/about'),
                              'text-gray-300 hover:bg-gray-700 hover:text-white':
                                !router.asPath.startsWith('/about'),
                            },
                            'flex items-center gap-2 rounded-md px-3 py-3 text-sm font-medium'
                          )}
                        >
                          <InformationCircleIcon className="h-6 w-6" aria-hidden="true" />
                          About
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="absolute z-10 mt-2 w-40 rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                href="/about/about-data"
                                className={classNames(
                                  active ? 'bg-gray-100' : '',
                                  'flex items-center gap-2 px-4 py-2 text-sm text-gray-700'
                                )}
                              >
                                <InformationCircleIcon
                                  className="block h-6 w-6"
                                  aria-hidden="true"
                                />
                                About Data
                              </Link>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                href="/about/about-us"
                                className={classNames(
                                  active ? 'bg-gray-100' : '',
                                  'flex items-center gap-2 px-4 py-2 text-sm text-gray-700'
                                )}
                              >
                                <UserGroupIcon className="block h-6 w-6" aria-hidden="true" />
                                About Us
                              </Link>
                            )}
                          </Menu.Item>
                          <Menu.Item>
                            {({ active }) => (
                              <Link
                                href="https://github.com/kevinshen56714/SWEJobs.fyi"
                                className={classNames(
                                  active ? 'bg-gray-100' : '',
                                  'flex items-center gap-2 px-4 py-2 text-sm text-gray-700'
                                )}
                              >
                                <svg
                                  className="h-6 w-6"
                                  fill="currentColor"
                                  viewBox="0 0 24 24"
                                  aria-hidden="true"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                                    clipRule="evenodd"
                                  ></path>
                                </svg>
                                GitHub
                              </Link>
                            )}
                          </Menu.Item>
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="sm:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3">
              {[...navigation, ...smallViewExtraNavigation].map(({ href, name, icon }) => {
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
                      'flex gap-2 rounded-md px-3 py-1.5 text-sm font-medium'
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
        </div>
      )}
    </Disclosure>
  )
}
