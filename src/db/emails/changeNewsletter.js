import { db } from "../../../server/connect"
import { ref, update } from "firebase/database"

export default function changeNewsletter(title, category, bool) {
  const reference = ref(db, category + "/" + title)
  update(reference, {
    newsletter: bool,
  })
}
