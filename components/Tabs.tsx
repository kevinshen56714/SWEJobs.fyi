import Link from 'next/link'
import { SkillType } from '../types/Skills'
import { cities } from '../pages'
import classNames from 'classnames'

export const CityTabs = (props: { currentPath: string }) => {
  const [_, parentPath, currentCity, currentType] = props.currentPath.split('/')
  return (
    <div className="border-t-[1px] border-gray-400 bg-gray-600 shadow-lg">
      <div className="mx-auto max-w-5xl px-4 sm:px-12 lg:px-5">
        <ul className="flex flex-wrap text-sm font-medium text-gray-300">
          {cities.map(({ city, name }, i) => {
            const currentTab = city === currentCity
            const href = currentType
              ? `/${parentPath}/${city}/${currentType}`
              : `/${parentPath}/${city}`
            return (
              <li className="mr-2" key={i}>
                <Link href={href}>
                  <a
                    className={classNames(
                      {
                        'bg-gray-800 text-white': currentTab,
                        'border-transparent hover:border-gray-300 hover:text-gray-100': !currentTab,
                      },
                      'my-1.5 inline-block rounded-md p-2'
                    )}
                  >
                    {name}
                  </a>
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

export const SkillTypeTabs = (props: { currentPath: string }) => {
  const [_, parentPath, currentCity, currentType] = props.currentPath.split('/')
  return (
    <ul className="-mb-px flex flex-wrap text-sm font-medium text-gray-500">
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
