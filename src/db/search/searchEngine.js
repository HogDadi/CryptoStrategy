import { ref, onValue } from "firebase/database"
import { db } from "../../../server/connect"

export default function searchEngine(number, categoryM, value) {
  if (value !== null && value !== "") {
    const category = categoryM.toLowerCase()
    const dataRef = ref(db, category + "/")
    return new Promise((resolve, reject) => {
      onValue(
        dataRef,
        snapshot => {
          const data = snapshot.val()
          if (data !== null) {
            const originalKeys = Object.keys(data)
            const lowerCaseKeys = originalKeys.map(key => key.toLowerCase())
            const filteredKeys = lowerCaseKeys.filter(key =>
              key.startsWith(value.toLowerCase())
            )
            const sortedKeys = filteredKeys.sort(
              (a, b) =>
                new Date(
                  data[
                    originalKeys.find(key => key.toLowerCase() === b)
                  ].createTime
                ) -
                new Date(
                  data[
                    originalKeys.find(key => key.toLowerCase() === a)
                  ].createTime
                )
            )
            const top = sortedKeys
              .slice(0, number)
              .map(
                key =>
                  data[
                    originalKeys.find(
                      originalKey => originalKey.toLowerCase() === key
                    )
                  ]
              )
            resolve(top)
          }
        },
        error => {
          reject(error)
        }
      )
    })
  }
}

// return new Promise((resolve, reject) => {
//   onValue(
//     dataRef,
//     snapshot => {
//       const data = snapshot.val()
//       console.log(data)
//       if(data !== null){
//         const top = Object.keys(data)
//         .sort(
//           (a, b) =>
//             new Date(data[b].createTime) - new Date(data[a].createTime)
//         )
//         .slice(0, number)
//         .map(key => data[key])
//       resolve(top)
//       }
//     },
//     error => {
//       reject(error)
//     }
//   )
// })
