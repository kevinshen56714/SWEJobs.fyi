import { Dispatch, Fragment, SetStateAction } from 'react'
import { Popover, Transition } from '@headlessui/react'

import { FunnelIcon } from '@heroicons/react/24/outline'
import { SkillBadge } from './SkillBadge'
import { SkillType } from '../types/Skills'
import { skillsByType } from '../utils/analysis'

export const FilterPopover = (props: { skillBadgeCallBack: Dispatch<SetStateAction<string>> }) => {
  const { skillBadgeCallBack } = props
  return (
    <div>
      <Popover className="relative">
        {({ open }) => (
          <>
            <Popover.Button
              type="button"
              className="relative -ml-px inline-flex items-center space-x-2 rounded-md border border-gray-300 bg-gray-50 px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:border-cyan-700 focus:outline-none focus:ring-1 focus:ring-cyan-700 sm:py-2"
            >
              <FunnelIcon className="h-5 w-5 text-gray-400" aria-hidden="true" />
              <span>Filter</span>
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute right-full z-10 mt-3 w-screen max-w-sm translate-x-full transform px-4 sm:px-0 lg:max-w-5xl">
                <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                  <div className="bg-gray-50 py-4 px-7">
                    <span className="flex items-center">
                      <span className="text-base font-medium text-gray-900">
                        Filter jobs by skills (click any tags below to add)
                      </span>
                    </span>
                    <span className="block text-sm text-gray-500">
                      {`Can't find what you're looking for? `}
                      <a href="#" className="underline">{`Let us know what you'd like to see!`}</a>
                    </span>
                  </div>
                  <div className="relative grid gap-4 bg-white py-4 px-7 lg:grid-cols-3">
                    {Object.keys(skillsByType).map((type, i) => (
                      <div
                        key={i}
                        className={`rounded-lg border px-4 py-2 shadow-sm ${
                          type === SkillType.LANGUAGE && 'lg:col-span-2'
                        }`}
                      >
                        <h1 className="mb-2 text-sm font-medium text-gray-900">{type}</h1>
                        <div className="flex flex-wrap">
                          {skillsByType[type].map((skill, i) => {
                            if (skill instanceof Array) skill = skill[0]
                            return (
                              <SkillBadge
                                key={i}
                                skill={skill}
                                onClickCallBack={skillBadgeCallBack}
                              />
                            )
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </Popover.Panel>
            </Transition>
          </>
        )}
      </Popover>
    </div>
  )
}
