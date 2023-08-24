import React, { useState } from "react"
import { sendPasswordResetEmail } from "firebase/auth"
import { auth } from "../../../server/connect"

export default function PassReset(props) {
  const [error, setError] = useState("")
  const takeEmail = event => {
    event.preventDefault()
    const email = document.getElementById("email").value
    if (email === "") {
      setError("Enter email")
    } else {
      sendPasswordResetEmail(auth, email)
        .then(() => {
          props.setLoginStatus("login")
        })
        .catch(error => {
          const errorCode = error.code
          if (errorCode === "auth/invalid-email") {
            setError("Invalid email!")
          } else if (errorCode === "auth/user-not-found") {
            setError("There is no such user!")
          } else {
            setError(errorCode)
          }
        })
    }
  }
  return (
    <>
      <form onSubmit={takeEmail}>
        <div className="login-text">Change password</div>
        <div className="login-inputs">
          <input
            type="text"
            className="edit-input"
            placeholder="Email/Login"
            id="email"
          />
          <div style={{ color: "red" }}>{error}</div>
          <button className="edit-btn" type="submit">
            Send password reset link
          </button>
        </div>
      </form>
    </>
  )
}
