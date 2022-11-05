/* The <Head /> component used in _document is not the same as next/head.
 * The <Head /> component used here should only be used for any <head> code
 * that is common for all pages. For all other cases, such as <title> tags,
 * we recommend using next/head in your pages or components. */

import { Head, Html, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html>
      <Head>
        <meta
          property="og:title"
          content="SWEJobs.fyi - Software Engineer Jobs and Trends Tracker"
        />
        <meta
          property="og:description"
          content="We track latest US software engineer jobs and compile weekly trends and monthly stats - our data is updated constantly."
        />
        <meta property="og:site_name" content="SWEJobs.fyi" />
        <meta property="og:url" content="https://swejobs.fyi/" />
        <meta property="og:type" content="website" />
        <meta name="image" property="og:image" content="https://swejobs.fyi/main-schematic.jpg" />

        <meta
          name="twitter:title"
          content="SWEJobs.fyi - Software Engineer Jobs and Trends Tracker"
        />
        <meta
          name="twitter:description"
          content="We track latest US software engineer jobs and compile weekly trends and monthly stats - our data is updated constantly."
        />
        <meta name="twitter:card" content="summary_large_image" />
        <meta property="twitter:domain" content="swejobs.fyi" />
        <meta property="twitter:url" content="https://swejobs.fyi/" />
        <meta name="twitter:image" content="https://swejobs.fyi/main-schematic.jpg" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
