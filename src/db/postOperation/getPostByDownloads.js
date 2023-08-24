import { ref, onValue } from "firebase/database"
import { db } from "../../../server/connect"

export default function getPostsByDownloads(number, categoryB) {
  const category = categoryB.toLowerCase()
  const dataRef = ref(db, category + "/")
  return new Promise((resolve, reject) => {
    onValue(
      dataRef,
      snapshot => {
        const data = snapshot.val()
        const top = Object.keys(data)
          .sort(
            (a, b) => new Date(data[b].downloads) - new Date(data[a].downloads)
          )
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
