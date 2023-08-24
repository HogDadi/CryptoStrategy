import { db } from "../../../server/connect"
import { ref, update } from "firebase/database"

export default function setEmailToNewsletter(id) {
  const reference = ref(db, "emails/")
  update(reference, {
    [id]: null,
  })
}