import { Dispatch, SetStateAction } from 'react'

import { Switch } from '@headlessui/react'

export const FilterAndOrSwitch = (props: {
  checked: boolean
  onChangeCallBack: Dispatch<SetStateAction<boolean>>
}) => {
  const { checked, onChangeCallBack } = props
  return (
    <Switch
      checked={checked}
      onChange={onChangeCallBack}
      className={
        'relative mr-4 flex w-[74px] shrink-0 cursor-pointer items-center justify-center rounded-full bg-gray-200 text-xs text-gray-700 shadow-sm transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2  focus-visible:ring-white focus-visible:ring-opacity-75'
      }
    >
      <span className="sr-only">Use setting</span>
      <span className="pointer-events-none absolute left-[1px] flex h-full w-[38px] items-center justify-center">
        OR
      </span>
      <span className="pointer-events-none absolute left-[35px] flex h-full w-[38px] items-center justify-center">
        AND
      </span>
      <span
        aria-hidden="true"
        className={`${checked ? 'translate-x-9' : 'translate-x-0'}
           pointer-events-none absolute left-[1px] flex h-[calc(100%-4px)] w-[35px] transform items-center justify-center rounded-full bg-white font-bold shadow-md ring-0 transition duration-200 ease-in-out`}
      >
        {checked ? 'AND' : 'OR'}
      </span>
    </Switch>
  )
}
