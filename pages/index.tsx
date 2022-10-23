import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>SWEJobs.fyi</title>
        <meta name="description" content="View latest software engineer jobs and trends" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">swe-jobs.fyi!</a>
        </h1>

        <p className={styles.description}>Find recent jobs at one of the locations below</p>

        <div className={styles.grid}>
          <div className={styles.card}>
            <h2>San Jose, CA</h2>
            <Link href="/jobs/SJ">
              <a className={styles.link}>Jobs &rarr;</a>
            </Link>
            <Link href="/trends/SJ">
              <a className={styles.link}>Trends &rarr;</a>
            </Link>
          </div>
          <div className={styles.card}>
            <h2>San Francisco, CA</h2>
            <Link href="/jobs/SF">
              <a className={styles.link}>Jobs &rarr;</a>
            </Link>
            <Link href="/trends/SF">
              <a className={styles.link}>Trends &rarr;</a>
            </Link>
          </div>
          <div className={styles.card}>
            <h2>Seattle, WA</h2>
            <Link href="/jobs/SEA">
              <a className={styles.link}>Jobs &rarr;</a>
            </Link>
            <Link href="/trends/SEA">
              <a className={styles.link}>Trends &rarr;</a>
            </Link>
          </div>
          <div className={styles.card}>
            <h2>Los Angeles, CA</h2>
            <Link href="/jobs/LA">
              <a className={styles.link}>Jobs &rarr;</a>
            </Link>
            <Link href="/trends/LA">
              <a className={styles.link}>Trends &rarr;</a>
            </Link>
          </div>
          <div className={styles.card}>
            <h2>New York, NY</h2>
            <Link href="/jobs/NY">
              <a className={styles.link}>Jobs &rarr;</a>
            </Link>
            <Link href="/trends/NY">
              <a className={styles.link}>Trends &rarr;</a>
            </Link>
          </div>
          <div className={styles.card}>
            <h2>Austin, TX</h2>
            <Link href="/jobs/AU">
              <a className={styles.link}>Jobs &rarr;</a>
            </Link>
            <Link href="/trends/AU">
              <a className={styles.link}>Trends &rarr;</a>
            </Link>
          </div>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}
