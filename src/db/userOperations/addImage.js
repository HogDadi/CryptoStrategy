import { storage } from "../../../server/connect"
import { auth } from "../../../server/connect"
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage"
import { updateProfile } from "firebase/auth"

export default function AddImage(img, setImg) {
  const user = auth.currentUser
  const base64 = img.split(",")[1]
  const uint8Array = new Uint8Array(
    atob(base64)
      .split("")
      .map(char => char.charCodeAt(0))
  )
  const metadata = {
    contentType: "image/webp",
  }
  const storageRef = ref(storage, "usersImg/" + user.uid)
  const getImageData = async () => {
    const uploadTask = uploadBytesResumable(storageRef, uint8Array, metadata)
    uploadTask.on(
      "state_changed",
      snapshot => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        console.log("Upload is " + progress + "% done")
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused")
            break
          case "running":
            console.log("Upload is running")
            break
        }
      },
      error => {
        switch (error.code) {
          case "storage/unauthorized":
            break
          case "storage/canceled":
            break

          case "storage/unknown":
            break
        }
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
          setImg(downloadURL)
          updateProfile(user, {
            photoURL: downloadURL,
          })
        })
      }
    )
  }
  getImageData()
}
