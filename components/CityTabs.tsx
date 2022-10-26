import Link from 'next/link'
import classNames from 'classnames'

export const CityTabs = ({ currentCity }) => {
  const tabs = [
    { title: 'San Jose, CA', city: 'SJ' },
    { title: 'San Francisco, CA', city: 'SF' },
    { title: 'Los Angeles, CA', city: 'LA' },
    { title: 'Seattle, WA', city: 'SEA' },
    { title: 'New York, NY', city: 'NY' },
    { title: 'Texas, TX', city: 'AU' },
  ]
  return (
    <ul className="-mb-px flex flex-wrap text-sm font-medium text-gray-500">
      {tabs.map(({ title, city }, i) => {
        const currentTab = city === currentCity
        return (
          <li className="mr-2" key={i}>
            <Link href={`/trends/${city}`}>
              <a
                className={classNames(
                  {
                    'active border-cyan-600 text-cyan-600': currentTab,
                    'border-transparent hover:border-gray-300 hover:text-gray-600': !currentTab,
                  },
                  'inline-block cursor-pointer rounded-t-lg border-b-2 p-2.5'
                )}
              >
                {title}
              </a>
            </Link>
          </li>
        )
      })}
    </ul>
  )
}
