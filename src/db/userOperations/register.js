import React, { useState } from "react"
import {
  createUserWithEmailAndPassword,
  signInWithRedirect,
  updateProfile,
} from "firebase/auth"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGoogle } from "@fortawesome/free-brands-svg-icons"
import { auth, provider } from "../../../server/connect"

export default function Register(props) {
  const [error, setError] = useState("")
  const googleRegister = () => {
    signInWithRedirect(auth, provider).then(data => {
      props.setLogged(true)
      props.setLoginStatus("closed")
      props.exit()
    })
  }
  const takeRegisterData = event => {
    event.preventDefault()
    const nick = document.getElementById("nick").value
    const email = document.getElementById("email").value
    const pass = document.getElementById("pass").value
    const pass2 = document.getElementById("pass2").value

    if (email === "" || pass === "" || pass2 === "" || nick === "") {
      setError("Enter required fields!")
    } else if (pass !== pass2) {
      setError("The passwords are'nt identical!")
    } else {
      const userImg =
        "https://firebasestorage.googleapis.com/v0/b/krypto-strategie.appspot.com/o/usersImg%2Faninim.webp?alt=media&token=caaf2232-8518-4573-87d3-88deffa15928"

      createUserWithEmailAndPassword(auth, email, pass)
        .then(userCredential => {
          updateProfile(auth.currentUser, {
            displayName: nick,
            photoURL: userImg,
          })
            .then(ok => {
              props.setLogged(true)
              props.setLoginStatus("closed")
              props.exit()
            })
            .catch(error => {
              console.log(error)
            })
        })
        .catch(error => {
          const errorCode = error.code
          if (errorCode === "auth/invalid-email") {
            setError("Invalid email!")
          } else if (errorCode === "auth/weak-password") {
            setError("Too weak password!")
          } else if (errorCode === "auth/email-already-in-use") {
            setError("Email is already taken!")
          } else {
            setError(errorCode)
          }
        })
    }
  }

  return (
    <>
      <form onSubmit={takeRegisterData}>
        <div className="login-text">Register</div>
        <div className="login-inputs">
          <input
            className="edit-input"
            type="text"
            placeholder="Nick"
            id="nick"
          />
          <input
            className="edit-input"
            type="text"
            placeholder="Email/Login"
            id="email"
          />
          <div style={{ color: "red" }}>{error}</div>
          <input
            className="edit-input"
            type="password"
            placeholder="Password"
            id="pass"
          />
          <input
            className="edit-input"
            type="password"
            placeholder="Repeat password"
            id="pass2"
          />
          <button className="edit-btn" type="submit">
            Register{" "}
          </button>
        </div>
      </form>
      <div className="lub">or</div>
      <button
        className="edit-btn"
        onClick={() => {
          props.setLoginStatus("login")
        }}
      >
        Log in
      </button>
      <button className="edit-btn" onClick={googleRegister}>
        <FontAwesomeIcon icon={faGoogle} /> Register with Google
      </button>
    </>
  )
}
