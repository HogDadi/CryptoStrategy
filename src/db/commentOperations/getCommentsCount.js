import { ref, get } from "firebase/database"
import { db } from "../../../server/connect"

export default function getCommentsCount(number, category, postName) {
  const dataRef = ref(db, `/${category}/${postName}/comments`)
  dataRef.once("value").then(function (snapshot) {
    const ok = snapshot.numChildren()
    console.log(ok)
  })
}
