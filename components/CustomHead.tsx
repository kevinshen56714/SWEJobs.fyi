import Head from 'next/head'

export const CustomHead = (props: { title: string; description?: string }) => {
  const { title, description } = props
  const defaultDescription =
    'We track latest US software engineer jobs and compile weekly trends and monthly stats - our data is updated constantly.'
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description || defaultDescription} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description || defaultDescription} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description || defaultDescription} />
    </Head>
  )
}
