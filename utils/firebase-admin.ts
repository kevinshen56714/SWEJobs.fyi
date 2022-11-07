import { QuerySnapshot, getFirestore } from 'firebase-admin/firestore'
import { cert, getApp, getApps, initializeApp } from 'firebase-admin/app'

import { categorizeSkills } from './analysis'

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string)

const app =
  getApps().length === 0
    ? initializeApp({
        credential: cert(serviceAccount),
      })
    : getApp()

const db = getFirestore(app)

export const checkTodayData = async (city: string | string[], todayStr: string) => {
  const snapshot = await db
    .collection(todayStr)
    .doc(city as string)
    .collection('jobs')
    .where('city', '==', city)
    .limit(1)
    .count()
    .get()
  return snapshot.data().count > 0
}

export const getDailyStatsAndCount = async (city: string | string[], dateStr: string) => {
  const docRef = db.collection(dateStr).doc(city as string)
  const docSnap = await docRef.get()
  return docSnap.exists ? [docSnap.data()['stats'], docSnap.data()['count']] : [{}, 0]
}

export const getDailyJobs = async (city: string | string[], dateStr: string) => {
  const snapshot = await db
    .collection(dateStr)
    .doc(city as string)
    .collection('jobs')
    .get()

  return assembleJobObject(snapshot)
}

const assembleJobObject = (snapshot: QuerySnapshot) => {
  return snapshot.docs.map((doc) => {
    const { bigTech, company, createdAt, link, loc, remote, salary, skills, startup, title } =
      doc.data()
    return {
      bigTech,
      company,
      createdAt: createdAt.toDate().getTime(),
      link,
      loc: loc.split('+')[0],
      remote,
      salary,
      skills: categorizeSkills(skills),
      startup,
      title,
    }
  })
}
