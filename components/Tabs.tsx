import Link from 'next/link'
import { SkillType } from '../types/Skills'
import { cities } from '../pages'
import classNames from 'classnames'

export const CityTabGroup = (props: { currentPath: string }) => {
  const [_, parentPath, currentCity, currentType] = props.currentPath.split('?')[0].split('/')

  const CityTabs = (props: { smallView: boolean }) => {
    return (
      <>
        {cities.map(({ city, name }, i) => {
          const currentTab = city === currentCity
          let href = `/${parentPath}/${city}/${currentType}`
          if (parentPath === 'jobs') {
            href = `/${parentPath}/${city}/24` // always go to the page with latest jobs
          } else if (parentPath === 'trends') {
            href = `/${parentPath}/${city}/${currentType}/daily-trends`
          }
          return (
            <li className="place-self-center" key={i}>
              <Link
                href={href}
                className={classNames(
                  {
                    'bg-gray-800 text-white': currentTab,
                    'border-transparent hover:border-gray-300 hover:text-gray-100': !currentTab,
                    'my-1.5 p-2': !props.smallView,
                    'my-1 p-1.5': props.smallView,
                  },
                  'inline-block rounded-md'
                )}
              >
                {name}
              </Link>
            </li>
          )
        })}
      </>
    )
  }

  return (
    <div className="border-t-[1px] border-gray-400 bg-gray-600 font-medium text-gray-300 shadow-lg">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <ul className="hidden flex-wrap gap-2 text-sm sm:flex">
          <CityTabs smallView={false} />
        </ul>
        <div className="flex items-center justify-center">
          <ul className="grid w-96 grid-flow-col grid-cols-3 grid-rows-2 self-center text-xs sm:hidden">
            <CityTabs smallView={true} />
          </ul>
        </div>
      </div>
    </div>
  )
}

export const SkillTypeTabGroup = (props: { currentPath: string }) => {
  const [_, parentPath, currentCity, currentType] = props.currentPath.split('/')
  return (
    <ul className="-mb-px flex flex-wrap justify-center text-xs font-medium text-gray-500 sm:text-sm">
      {Object.values(SkillType).map((type, i) => {
        const encodedType = encodeURIComponent(type)
        const currentTab = encodedType === currentType
        return (
          <li className="mr-2" key={i}>
            <Link
              href={
                parentPath === 'trends'
                  ? `/${parentPath}/${currentCity}/${encodedType}/daily-trends`
                  : `/${parentPath}/${currentCity}/${encodedType}`
              }
              className={classNames(
                {
                  'active border-cyan-600 text-cyan-600': currentTab,
                  'border-transparent hover:border-gray-300 hover:text-gray-600': !currentTab,
                },
                'inline-block cursor-pointer rounded-t-lg border-b-2 p-2.5'
              )}
            >
              {type}
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
