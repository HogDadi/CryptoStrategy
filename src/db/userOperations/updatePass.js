import React, { useState } from "react"
import { auth } from "../../../server/connect"
import { updatePassword, signInWithEmailAndPassword } from "firebase/auth"

export default function UpdatePass(props) {
  const [error, setError] = useState(null)

  const passChange = e => {
    e.preventDefault()
    const oldPass = document.getElementById("oldPass").value
    const newPass = document.getElementById("newPass").value
    const repetPass = document.getElementById("repetPass").value
    if (oldPass === "" || newPass === "" || repetPass === "") {
      setError("Please enter all fields")
    } else if (newPass !== repetPass) {
      setError("The passwords are'nt identical")
    } else {
      signInWithEmailAndPassword(auth, props.email, oldPass)
        .then(userCredential => {
          updatePassword(auth.currentUser, newPass)
          setError(null)
          document.getElementById("oldPass").value = ""
          document.getElementById("newPass").value = ""
          document.getElementById("repetPass").value = ""
        })
        .catch(error => {
          const errorCode = error.code
          if (errorCode === "auth/wrong-password") {
            setError("Invalid current password!")
          } else {
            setError(errorCode)
          }
        })
    }
  }
  return (
    <>
      Change password
      <form className="update-pass" onSubmit={passChange}>
        <input
          type="password"
          id="oldPass"
          placeholder="Current password"
          className="edit-input"
        />
        <input
          type="password"
          id="newPass"
          placeholder="New password"
          className="edit-input"
        />
        <input
          type="password"
          id="repetPass"
          placeholder="Repeat password"
          className="edit-input"
        />
        <div className="error">{error}</div>
        <button type="submit" className="edit-btn">
          Change password
        </button>
      </form>
    </>
  )
}
