import type { AppProps } from 'next/app'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <div className="max-w-5xl mx-auto pt-10 sm:px-12 lg:px-5 px-4">nav</div>
      <div className="max-w-5xl mx-auto py-10 sm:px-12 lg:px-5 px-4">
        <Component {...pageProps} />
      </div>
    </>
  )
}

export default MyApp
