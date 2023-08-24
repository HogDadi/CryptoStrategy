import { ref, deleteObject } from "firebase/storage"
import { storage } from "../../../../server/connect"

export default function deleteImg(category, title) {
  if (category === "scripts") {
    const referenceImg = ref(storage, `${category}/img/${title}-${category}`)
    deleteObject(referenceImg)
    const referenceFile = ref(
      storage,
      `${category}/scripts/${title}-${category}`
    )
    deleteObject(referenceFile)
  } else {
    const reference = ref(storage, `${category}/${title}-${category}`)
    deleteObject(reference)
  }
}
