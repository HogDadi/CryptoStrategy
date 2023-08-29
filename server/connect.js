import { initializeApp } from "firebase/app"
import { getDatabase } from "firebase/database"
import { getStorage } from "firebase/storage";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'


const APIKEY = process.env.APIKEY
const AUTHDOMAIN = process.env.AUTHDOMAIN
const DATABASEURL = process.env.DATABASEURL
const PROJECTID = process.env.PROJECTID
const STORAGEBUCKET = process.env.STORAGEBUCKET
const MESSAGINGSENDERID = process.env.MESSAGINGSENDERID
const APPID = process.env.APPID
const MEASUREMENTID = process.env.MEASUREMENTID

const firebaseConfig = {
  apiKey: APIKEY,
  authDomain: AUTHDOMAIN,
  databaseURL: DATABASEURL,
  projectId: PROJECTID,
  storageBucket: STORAGEBUCKET,
  messagingSenderId: MESSAGINGSENDERID,
  appId: APPID,
  measurementId: MEASUREMENTID,
}

const app = initializeApp(firebaseConfig)
const storage = getStorage();
const db = getDatabase(app)
const auth = getAuth(app)
const provider = new GoogleAuthProvider()

export {db, storage, auth, provider}
