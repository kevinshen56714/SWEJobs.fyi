import Link from 'next/link'
import { SkillType } from '../types/Skills'
import { cities } from '../pages'
import classNames from 'classnames'

export const CityTabGroup = (props: { currentPath: string }) => {
  const [_, parentPath, currentCity, currentType] = props.currentPath.split('/')

  const CityTabs = (props: { smallView: boolean }) => {
    return (
      <>
        {cities.map(({ city, name }, i) => {
          const currentTab = city === currentCity
          const href = currentType
            ? `/${parentPath}/${city}/${currentType}`
            : `/${parentPath}/${city}`
          return (
            <li className="place-self-center" key={i}>
              <Link href={href}>
                <a
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
                </a>
              </Link>
            </li>
          )
        })}
      </>
    )
  }

  return (
    <div className="border-t-[1px] border-gray-400 bg-gray-600 font-medium text-gray-300 shadow-lg">
      <div className="mx-auto max-w-5xl px-2 sm:px-12 lg:px-5">
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
        const currentTab = type === currentType.replaceAll('%20', ' ')
        return (
          <li className="mr-2" key={i}>
            <Link href={`/${parentPath}/${currentCity}/${type}`}>
              <a
                className={classNames(
                  {
                    'active border-cyan-600 text-cyan-600': currentTab,
                    'border-transparent hover:border-gray-300 hover:text-gray-600': !currentTab,
                  },
                  'inline-block cursor-pointer rounded-t-lg border-b-2 p-2.5'
                )}
              >
                {type}
              </a>
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
