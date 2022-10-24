import '../styles/globals.css'

import type { AppProps } from 'next/app'
import { NavBar } from '../components/NavBar'
import { logAnalyticsEvent } from '../utils/firebase'
import { useEffect } from 'react'

function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    console.log('user app loaded')
    if (process.env.NODE_ENV === 'production') {
      logAnalyticsEvent('user app loaded')
    }
  }, [])

  return (
    <>
      <NavBar />
      <div className="mx-auto max-w-5xl py-10 px-4 sm:px-12 lg:px-5">
        <Component {...pageProps} />
      </div>
    </>
  )
}

export default MyApp
