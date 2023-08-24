import { db } from "../../../../server/connect"
import { ref, set } from "firebase/database"

export default function deleteIndicator(postName, category) {
  const reference = ref(db, `/${category}/${postName}`)
  set(reference, null)
}
