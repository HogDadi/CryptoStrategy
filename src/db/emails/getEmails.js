import { ref, onValue } from "firebase/database"
import { db } from "../../../server/connect"

export default function getEmails() {
  const dataRef = ref(db, "emails/")
  return new Promise((resolve, reject) => {
    onValue(
      dataRef,
      snapshot => {
        const data = snapshot.val()
        if (data !== null) {
          const top = Object.keys(data).map(key => data[key])
          resolve(top)
        }
      },
      error => {
        reject(error)
      }
    )
  })
}
