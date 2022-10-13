import type { AppProps } from 'next/app'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <div className="container mx-auto px-4">nav</div>
      <div className="container mx-auto px-4">
        <Component {...pageProps} />
      </div>
    </>
  )
}

export default MyApp
