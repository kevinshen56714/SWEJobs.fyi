import { collection, getCount, getFirestore, limit, query, where } from 'firebase/firestore/lite'
import { getAnalytics, logEvent } from 'firebase/analytics'

import { initializeApp } from 'firebase/app'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
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
