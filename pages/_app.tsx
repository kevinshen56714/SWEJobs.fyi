import '../styles/globals.scss'

import type { AppProps } from 'next/app'
import { CityTabGroup } from '../components/Tabs'
import { Footer } from '../components/Footer'
import { NavBar } from '../components/NavBar'
import { Title } from '../components/Title'
import { logAnalyticsEvent } from '../utils/firebase'
import { useEffect } from 'react'
import { useRouter } from 'next/router'

export default function App({ Component, pageProps }: AppProps) {
  const currentPath = useRouter().asPath
  const currentRoot = currentPath.split('/')[1]

  useEffect(() => {
    console.log('user app loaded')
    if (process.env.NODE_ENV === 'production') {
      logAnalyticsEvent('user app loaded')
    }
  }, [])

  return (
    <>
      {/* Navbar, tabs, or titles */}
      <NavBar />
      {['trends', 'stats', 'jobs'].includes(currentRoot) && (
        <CityTabGroup currentPath={currentPath} />
      )}
      {['about'].includes(currentRoot) && <Title currentPath={currentPath} />}

      {/* Main content */}
      <div className="mx-auto min-h-[calc(100vh-300px)] max-w-5xl px-4 py-4 sm:min-h-[calc(100vh-400px)] sm:px-12 lg:px-5">
        <Component {...pageProps} />
      </div>

      <Footer />
    </>
  )
}
