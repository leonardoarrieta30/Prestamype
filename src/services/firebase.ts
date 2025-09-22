import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAs4-CG_yVDa4keSwGONSRb1kpA6usPEww",
  authDomain: "exchangeratecs-6eea8.firebaseapp.com",
  projectId: "exchangeratecs-6eea8",
  storageBucket: "exchangeratecs-6eea8.appspot.com",
  messagingSenderId: "1028871012583",
  appId: "1:1028871012583:web:64dd5566da88be0cc16242"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Firestore
export const db = getFirestore(app)

export default app