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
          name="og:title"
          content="We track latest US software engineer jobs and compile trends and stats"
        />
        <meta property="og:url" content="https://swejobs.fyi/" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://swejobs.fyi/main-schematic.png" />

        <meta
          name="twitter:title"
          content="We track latest US software engineer jobs and compile trends and stats"
        />
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
