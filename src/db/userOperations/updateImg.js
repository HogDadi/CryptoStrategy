import React, { useState } from "react"
import Avatar from "react-avatar-edit"
import AddImage from "./addImage"
import { auth } from "../../../server/connect"
import { updateProfile } from "firebase/auth"

export default function UpdateImg(props) {
  const incognitoURL =
    "https://firebasestorage.googleapis.com/v0/b/krypto-strategie.appspot.com/o/usersImg%2Faninim.webp?alt=media&token=ffe49cb6-9fc2-4eec-a883-3d7071e6354d"
  const [src, setScr] = useState(null)
  const [previev, setPreviev] = useState(null)

  const onClose = () => {
    setPreviev(null)
    props.setImgChange(false)
  }
  const onCrop = view => {
    setPreviev(view)
  }
  const handleSave = () => {
    AddImage(previev, props.setImg)
    props.setImgChange(false)
  }
  const updateUserImg = () => {
    updateProfile(auth.currentUser, { photoURL: incognitoURL })
    props.setImg(incognitoURL)
    props.setImgChange(false)
  }

  return (
    <>
      {previev === null && (
        <div className="edit-avatar flexC">
          <img src={props.img} alt="avatar" />
        </div>
      )}
      {previev && (
        <div className="edit-avatar flexC">
          <img src={previev} alt="preview" />
        </div>
      )}
      <div className="user-edit-img">
        <button type="remove" onClick={updateUserImg} className="edit-btn">
          Delete image 
        </button>
        <Avatar
          imageWidth={400}
          imageHeight={400}
          onCrop={onCrop}
          onClose={onClose}
          src={src}
          label="Select an image"
          exportMimeType="image/webp"
          mimeTypes="image/webp,image/png,image/jpeg"
          labelStyle={{ color: "grey", padding: "90px 40px" }}
        />
        {previev && (
          <button onClick={handleSave} className="edit-btn">
            Save
          </button>
        )}
      </div>
    </>
  )
}
