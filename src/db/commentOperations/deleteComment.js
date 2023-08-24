import { db } from "../../../server/connect"
import { ref, set } from "firebase/database"

export default function deleteComment(category, postName, id) {
  const reference = ref(db, `/${category}/${postName}/comments/${id}`)
  set(reference, null)
}
