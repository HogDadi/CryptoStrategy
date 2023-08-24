import React, { useState } from "react"
import { auth } from "../../../server/connect"
import { updateProfile } from "firebase/auth"

export default function UpdateNick(props) {
  const [error, setError] = useState(null)

  const nickChange = e => {
    e.preventDefault()
    const newNick = document
      .getElementById("newNick")
      .value.replace(/\s{2,}/g, " ")
    if (newNick === "") {
      setError("Enter the name")
    } else if (newNick.length < 3 || newNick.length > 20) {
      setError("The name cannot be shorter than 3 and longer than 20 characters")
    } else if (!/^[a-zA-Z0-9ą-żó -_]+$/.test(newNick)) {
      setError("The name cannot contain special characters")
    } else {
      setError(null)
      document.getElementById("newNick").value = ""
      props.setNick(newNick)
      updateProfile(auth.currentUser, {
        displayName: newNick,
      })
    }
  }
  return (
    <div className="nick-change">
      Change nickname
      <form onSubmit={nickChange}>
        <input
          type="text"
          id="newNick"
          placeholder="New nick"
          className="edit-input"
        />
        <div className="error">{error}</div>
        <button type="submit" className="edit-btn">
          Change nickname
        </button>
      </form>
    </div>
  )
}
