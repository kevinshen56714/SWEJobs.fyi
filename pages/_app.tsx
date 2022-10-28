import '../styles/globals.scss'

import type { AppProps } from 'next/app'
import { CityTabs } from '../components/Tabs'
import { NavBar } from '../components/NavBar'
import { logAnalyticsEvent } from '../utils/firebase'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

function MyApp({ Component, pageProps }: AppProps) {
  const currentPath = useRouter().asPath
  useEffect(() => {
    console.log('user app loaded')
    if (process.env.NODE_ENV === 'production') {
      logAnalyticsEvent('user app loaded')
    }
  }, [])

  return (
    <>
      <NavBar />
      {['trends', 'stats', 'jobs'].includes(currentPath.split('/')[1]) && (
        <CityTabs currentPath={currentPath} />
      )}
      <div className="mx-auto max-w-5xl px-4 py-4 sm:px-12 lg:px-5">
        <Component {...pageProps} />
      </div>
    </>
  )
}

export default MyApp
