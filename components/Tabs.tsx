import Link from 'next/link'
import { SkillType } from '../types/Skills'
import { cities } from '../pages'
import classNames from 'classnames'

export const CityTabs = (props: { currentPath: string }) => {
  const [_, parentPath, currentCity, currentType] = props.currentPath.split('/')
  return (
    <ul className="-mb-px flex flex-wrap text-sm font-medium text-gray-500">
      {cities.map(({ city, name }, i) => {
        const currentTab = city === currentCity
        return (
          <li className="mr-2" key={i}>
            <Link href={`/${parentPath}/${city}/${currentType}`}>
              <a
                className={classNames(
                  {
                    'active border-cyan-600 text-cyan-600': currentTab,
                    'border-transparent hover:border-gray-300 hover:text-gray-600': !currentTab,
                  },
                  'inline-block cursor-pointer rounded-t-lg border-b-2 p-2.5'
                )}
              >
                {name}
              </a>
            </Link>
          </li>
        )
      })}
    </ul>
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
