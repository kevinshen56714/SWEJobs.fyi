import type { NextApiRequest, NextApiResponse } from 'next'

import { slugs } from '../jobs/[city]/[slug]'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { secret, city } = req.query
  // Check for secret to confirm this is a valid request
  if (secret !== process.env.NEXT_PUBLIC_REVALIDATE_TOKEN) {
    return res.status(401).json({ message: 'Invalid token' })
  }

  try {
    await Promise.all(
      Object.keys(slugs).map(async (slug) => await res.revalidate(`/jobs/${city}/${slug}`))
    )
    return res.json({ revalidated: true })
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return res.status(500).send('Error revalidating')
  }
}
