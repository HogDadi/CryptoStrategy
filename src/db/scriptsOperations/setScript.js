import { db, storage } from "../../../server/connect"
import {
  ref as refS,
  uploadBytes,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage"
import { ref, set } from "firebase/database"

export default async function setScript(name, desc, file, img, callback) {
  const imgName = `${name}-scripts`
  const metadata = {
    contentType: "image/webp",
    name: imgName,
  }
  const storageRef = refS(storage, `scripts/img/${imgName}`)

  const uploadImage = async () => {
    const response = await fetch(img)
    const buffer = await response.arrayBuffer()
    const uint8Array = new Uint8Array(buffer)
    const uploadTask = uploadBytesResumable(storageRef, uint8Array, metadata)

    uploadTask.on(
      "state_changed",
      snapshot => {},
      error => {
        console.error(error)
      },
      async () => {
        const downloadImg = await getDownloadURL(uploadTask.snapshot.ref)
        await uploadFile(downloadImg)
      }
    )
  }

  const uploadFile = async downloadImg => {
    const fileRef = refS(storage, `scripts/scripts/${name}-scripts`)
    const snapshot = await uploadBytes(fileRef, file)
    const downloadURL = await getDownloadURL(snapshot.ref)
    await updateDatabase(downloadURL, downloadImg)
  }

  const updateDatabase = async (downloadURL, downloadImg) => {
    const reference = ref(db, `scripts/${name}`)
    await set(reference, {
      name: name,
      description: desc,
      views: 0,
      downloads: 0,
      createTime: Date.now(),
      file: downloadURL,
      image: downloadImg,
      newsletter: false,
    })
    callback()
  }

  await uploadImage()
}
