import { db } from "../../../server/connect"
import { ref, update } from "firebase/database"

export default function editContent(category, postName, id, content) {
  const reference = ref(db, `/${category}/${postName}/comments/${id}`)
  update(reference, {
    content: content,
  })
}
