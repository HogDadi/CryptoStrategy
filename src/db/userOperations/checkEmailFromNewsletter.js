import { db } from "../../../server/connect"
import { ref, onValue } from "firebase/database"

export default function checkEmailFromNewsletter(id) {
  const data = ref(db, "emails/" + id)
  return new Promise(resolve => {
    onValue(data, snapshot => {
      const information = snapshot.val()
      resolve(information)
    })
  })
}
