import { db, storage } from "../../../server/connect"
import {
  ref as ref1,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage"
import { ref, set } from "firebase/database"

export default function setPostToDB(name, category, desc, img, callback) {
  const imgName = name + "-" + category
  const metadata = {
    contentType: "image/webp",
    name: imgName,
  }
  const storageRef = ref1(storage, category + "/" + imgName)
  const getImageData = async () => {
    const response = await fetch(img)
    const buffer = await response.arrayBuffer()
    const uint8Array = new Uint8Array(buffer)
 
    const uploadTask = uploadBytesResumable(storageRef, uint8Array, metadata)
    uploadTask.on(
      "state_changed",
      snapshot => {},
      error => {
        console.log(error)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
          const reference = ref(db, category + "/" + name)
          set(reference, {
            name: name,
            description: desc,
            views: 0,
            createTime: Date.now(),
            image: downloadURL,
            newsletter: false,
          }).then(() => {
            callback()
          })
        })
      }
    )
  }
  getImageData()
}
