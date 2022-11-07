import {
  collection,
  doc,
  getCount,
  getDoc,
  getFirestore,
  limit,
  query,
  where,
} from 'firebase/firestore/lite'
import { getAnalytics, logEvent } from 'firebase/analytics'

import { initializeApp } from 'firebase/app'

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
export const logAnalyticsEvent = (event: string) => {
  const analytics = getAnalytics(app)
  logEvent(analytics, event)
}

export const checkTodayData = async (city: string | string[], todayStr: string) => {
  const coll = collection(db, `${todayStr}/${city}/jobs`)
  const q = query(coll, where('city', '==', city), limit(1))
  const snapshot = await getCount(q)
  return snapshot.data().count > 0
}

export const getDailyStatsAndCount = async (city: string | string[], dateStr: string) => {
  const docRef = doc(db, dateStr, city as string)
  const docSnap = await getDoc(docRef)
  return docSnap.exists() ? [docSnap.data()['stats'], docSnap.data()['count']] : [{}, 0]
}
