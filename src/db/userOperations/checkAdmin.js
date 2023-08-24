import { db } from "../../../server/connect"
import { ref, onValue } from "firebase/database"

export default function checkAdmin(uid) {
  const data = ref(db, "admins/" + uid)
  return new Promise(resolve => {
    onValue(data, snapshot => {
      const information = snapshot.val()
      resolve(information)
    })
  })
}
