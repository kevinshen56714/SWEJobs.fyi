import type { NextApiRequest, NextApiResponse } from 'next'

import { SkillType } from '../../types/Skills'
import { cities } from '..'
import { slugs } from '../jobs/[slug]'

const pages = {
  Jobs: 'jobs',
  Stats: 'stats',
  Trends: 'trends',
  Home: 'home',
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { secret, city, page } = req.query

  // Check for secret to confirm this is a valid request
  if (secret !== process.env.NEXT_PUBLIC_REVALIDATE_TOKEN) {
    return res.status(401).json({ message: 'Invalid token' })
  }

  // Check for page to confirm this is a valid request
  if (!Object.values(pages).includes(page as string)) {
    return res.status(401).json({ message: 'Invalid page' })
  }

  // Check for city to confirm this is a valid request
  if (city && !cities.map((city) => city.city).includes(city as string)) {
    return res.status(401).json({ message: 'Invalid city' })
  }

  const promises = [] as Promise<void>[]

  switch (page) {
    case pages.Jobs:
      promises.push(...Object.keys(slugs).map((slug) => res.revalidate(`/jobs/${slug}`)))
      break
    case pages.Stats:
      promises.push(
        ...Object.values(SkillType).map((skillType) =>
          res.revalidate(`/stats/${city}/${skillType}`)
        )
      )
      break
    case pages.Trends:
      promises.push(
        ...Object.values(SkillType).map((skillType) =>
          res.revalidate(`/trends/${city}/${skillType}/daily-trends`)
        ),
        ...Object.values(SkillType).map((skillType) =>
          res.revalidate(`/trends/${city}/${skillType}/weekly-trends`)
        )
      )
      break
    case pages.Home:
      promises.push(res.revalidate('/'))
      break
  }

  try {
    await Promise.all(promises)
    return res.json({ revalidated: true })
  } catch (err) {
    // If there was an error, Next.js will continue
    // to show the last successfully generated page
    return res.status(500).send('Error revalidating')
  }
}
