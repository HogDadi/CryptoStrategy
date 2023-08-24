import { storage, db } from "../../../../server/connect"
import { ref as refS, uploadBytes, getDownloadURL } from "firebase/storage"
import { ref, update } from "firebase/database"

export default async function updateImg(
  img,
  title,
  file,
  category,
  newFile,
  callback
) {
  const fileF = async () => {
    if (newFile !== null) {
      try {
        const fileStorageRef = refS(storage, `scripts/scripts/${title}-scripts`)
        const snapshot = await uploadBytes(fileStorageRef, file)
        const downloadFileURL = await getDownloadURL(snapshot.ref)
        const fileRef = ref(db, `scripts/${title}`)
        await update(fileRef, {
          file: downloadFileURL,
        })
      } catch (error) {
        console.error(error)
      }
    }
  }

  const imgF = async () => {
    if (img !== null) {
      try {
        let imgStorageRef
        if (category === "scripts") {
          imgStorageRef = refS(storage, `scripts/img/${title}-scripts`)
        } else {
          imgStorageRef = refS(storage, `${category}/${title}-${category}`)
        }
        const snapshot = await uploadBytes(imgStorageRef, img)
        const downloadImgURL = await getDownloadURL(snapshot.ref)
        const imgRef = ref(db, `${category}/${title}`)
        await update(imgRef, {
          image: downloadImgURL,
        })
      } catch (error) {
        console.error(error)
      }
    }
  }

  const allPo = async () => {
    if (category === "scripts") {
      await fileF(title, file)
    }
    await imgF(title, img, category)
    callback()
  }
  await allPo()
}
