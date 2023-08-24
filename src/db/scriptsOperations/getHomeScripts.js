import { ref, onValue } from "firebase/database"
import { db } from "../../../server/connect"

export default function getHomeScripts(number) {
  const dataRef = ref(db, "scripts/")
  return new Promise((resolve, reject) => {
    onValue(
      dataRef,
      snapshot => {
        const data = snapshot.val()
        const top = Object.keys(data)
          .sort((a, b) => data[b].downloads - data[a].downloads)
          .slice(0, number)
          .map(key => data[key])
        resolve(top)
      },
      error => {
        reject(error)
      }
    )
  })
}
