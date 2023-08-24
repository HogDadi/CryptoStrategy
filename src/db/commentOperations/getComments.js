import { ref, onValue } from "firebase/database"
import { db } from "../../../server/connect"

export default function getComments(number, category, postName) {
  const dataRef = ref(db, `/${category}/${postName}/comments`)
  return new Promise((resolve, reject) => {
    onValue(
      dataRef,
      snapshot => {
        const data = snapshot.val()
        if (data !== null) {
          const top = Object.keys(data)
            .sort(
              (a, b) =>
                new Date(data[b].createTime) - new Date(data[a].createTime)
            )
            .slice(0, number)
            .map(key => data[key])
          resolve(top)
        }
      },
      error => {
        reject(error)
      }
    )
  })
}
