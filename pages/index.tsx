import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import styles from '../styles/Home.module.css'

export const cities = [
  { city: 'SJ', name: 'San Jose, CA' },
  { city: 'SF', name: 'San Francisco, CA' },
  { city: 'LA', name: 'Los Angeles, CA' },
  { city: 'SEA', name: 'Seattle, WA' },
  { city: 'NY', name: 'New York, NY' },
  { city: 'AU', name: 'Texas, TX' },
]

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
          {cities.map(({ name, city }, i) => (
            <div className={styles.card} key={i}>
              <h2>{name}</h2>
              <Link href={`/jobs/${city}`}>
                <a className={styles.link}>Jobs &rarr;</a>
              </Link>
              <Link href={`/stats/${city}`}>
                <a className={styles.link}>Stats &rarr;</a>
              </Link>
            </div>
          ))}
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
