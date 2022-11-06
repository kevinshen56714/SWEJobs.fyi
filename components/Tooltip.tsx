import { Popover, Transition } from '@headlessui/react'

import { Fragment } from 'react'
import { InformationCircleIcon } from '@heroicons/react/24/outline'

export default function Tooltip(props: { children: React.ReactNode }) {
  return (
    <Popover className="relative flex">
      {({ open }) => (
        <>
          <Popover.Button className="focus:outline-none">
            <InformationCircleIcon className="h-5 w-5" aria-hidden="true" />
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
            <Popover.Panel className="absolute top-5 left-1/2 w-36 -translate-x-1/2">
              <div className="rounded-md border bg-white px-2 py-2 font-normal shadow-sm">
                {props.children}
              </div>
            </Popover.Panel>
          </Transition>
        </>
      )}
    </Popover>
  )
}
