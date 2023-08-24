import { db } from "../../../../server/connect"
import { ref, onValue } from "firebase/database"

export default function getPost(name, category) {
  const data = ref(db, category + "/" + name)
  return new Promise(resolve => {
    onValue(data, snapshot => {
      const information = snapshot.val()
      resolve(information)
    })
  })
}
