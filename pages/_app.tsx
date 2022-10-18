import type { AppProps } from 'next/app'
import { useEffect } from 'react'
import { logAnalyticsEvent } from '../utils/firebase'
import '../styles/globals.css'

const NavBar = () => {
  return (
    <div>
      <div className="mx-auto max-w-5xl px-4 pt-10 sm:px-12 lg:px-5">nav</div>
    </div>
  )
}

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
