import { db } from "../../../server/connect"
import { ref, set } from "firebase/database"

export default function setComment(category, postName, nick, img, id, content) {
  const reference = ref(db, `/${category}/${postName}/comments/${id}`)
  set(reference, {
    id: id,
    img: img,
    author: nick,
    content: content,
    createTime: Date.now(),
    up: 0,
    down: 0,
  })
}
