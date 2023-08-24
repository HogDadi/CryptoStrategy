import { initializeApp } from "firebase/app"
// import { getAnalytics } from "firebase/analytics"
import { getDatabase } from "firebase/database"
import { getStorage } from "firebase/storage";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'

// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyD3RwxW3Cz-YSvrH-xGP9_t3R37h50ikrA",
  authDomain: "krypto-strategie.firebaseapp.com",
  databaseURL: "https://krypto-strategie-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "krypto-strategie",
  storageBucket: "krypto-strategie.appspot.com",
  messagingSenderId: "712961166081",
  appId: "1:712961166081:web:0958efa87ca6cc59322900",
  measurementId: "G-Q8R14SYH3D",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
// const analytics = getAnalytics(app)
const storage = getStorage();
const db = getDatabase(app)
const auth = getAuth(app)
const provider = new GoogleAuthProvider()

export {db, storage, auth, provider}
// export default db