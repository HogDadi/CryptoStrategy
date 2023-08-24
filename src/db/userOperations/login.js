import React, { useState } from "react"
import { auth, provider } from "../../../server/connect"
import { signInWithRedirect, signInWithEmailAndPassword } from "firebase/auth"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGoogle } from "@fortawesome/free-brands-svg-icons"
import "../../components/style/checkbox.css"

export default function Login(props) {
  const [error, setError] = useState("")
  const handleClickGoogle = () => {
    signInWithRedirect(auth, provider).then(data => {
      localStorage.setItem("logged", true)
      props.setLogged(true)
      props.setLoginStatus("closed")
      props.exit()
    })
  }
  const takeLoginData = event => {
    event.preventDefault()
    const email = document.getElementById("email").value
    const pass = document.getElementById("pass").value
    if (email === "" || pass === "") {
      setError("Enter required fields!")
    } else {
      signInWithEmailAndPassword(auth, email, pass)
        .then(userCredential => {
          const remember = document.getElementById("c1-13").checked
          if (remember) {
            localStorage.setItem("logged", remember)
          }
          props.setLogged(true)
          props.setLoginStatus("closed")
          props.exit()
        })
        .catch(error => {
          const errorCode = error.code
          if (errorCode === "auth/user-not-found") {
            setError("User not found!")
          } else if (errorCode === "auth/wrong-password") {
            setError("Wrong password!")
          } else if (errorCode === "auth/invalid-email") {
            setError("Wrong e-mail address!")
          } else if (errorCode === "auth/operation-not-allowed") {
            setError("Invalid operation!")
          } else if (errorCode === "auth/too-many-requests") {
            setError("Too many tries!")
          } else if (errorCode === "auth/network-request-failed") {
            setError("Invalid connection to the server!")
          } else {
            setError(errorCode)
          }
        })
    }
  }
  return (
    <>
      <form onSubmit={takeLoginData}>
        <div className="login-text">Log in</div>
        <div className="login-inputs">
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
          <div className="login-reset-pass">
            <div className="checkbox-wrapper-13 marginR">
              <input id="c1-13" type="checkbox" />
              <label htmlFor="c1-13">Remember me</label>
            </div>
            <div
              className="marginL remember"
              type="link"
              onClick={() => {
                props.setLoginStatus("passReset")
              }}
            >
              Forgotten password?
            </div>
          </div>
          <button className="edit-btn" type="submit">
            Log in
          </button>
        </div>
      </form>
      <div className="lub">or</div>
      <button
        className="edit-btn"
        onClick={() => {
          props.setLoginStatus("register")
        }}
      >
        Register
      </button>
      <button className="edit-btn" onClick={handleClickGoogle}>
        <FontAwesomeIcon icon={faGoogle} /> Sign in with Google
      </button>
    </>
  )
}
