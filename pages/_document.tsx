/* The <Head /> component used in _document is not the same as next/head.
 * The <Head /> component used here should only be used for any <head> code
 * that is common for all pages. For all other cases, such as <title> tags,
 * we recommend using next/head in your pages or components. */

import { Head, Html, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>
        <meta property="og:locale" content="en_US" />
        <meta property="og:site_name" content="SWEJobs.fyi" />
        <meta property="og:url" content="https://swejobs.fyi/" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://swejobs.fyi/main-schematic.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:secure_url" content="https://swejobs.fyi/main-schematic.png" />
        <meta property="article:modified_time" content="2022-09-28T19:38:02+00:00" />

        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="swejobs.fyi" />
        <meta property="twitter:url" content="https://swejobs.fyi/" />
        <meta name="twitter:image" content="https://swejobs.fyi/main-schematic.png" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
