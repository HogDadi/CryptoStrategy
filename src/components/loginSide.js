import React, { useState } from "react"
import Login from "../db/userOperations/login"
import Register from "../db/userOperations/register"
import PassReset from "../db/userOperations/passReset"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons"

export default function LoginSide(props) {
  
  const [loginStatus, setLoginStatus] = useState("login")
  function exit() {
    const element = document.querySelector(".login-bg")
    element.style.animationName = "znikanie"
    element.style.animationDuration = "0.2s"
    element.style.animationFillMode = "both"
    setTimeout(() => {
      props.setShowLoginSide("closed")
    }, 200)
  }

  return (
    <div className="login-bg">
      <div className="login">
        <div className="login-btns">
          {loginStatus !== "login" && (
            <button
              className="login-close"
              type="back"
              onClick={() => {
                setLoginStatus("login")
              }}
              style={{ marginRight: "auto" }}
            >
              <FontAwesomeIcon icon={faArrowLeft} />
            </button>
          )}
          <button
            className="login-close"
            type="close"
            onClick={exit}
            style={{ marginLeft: "auto" }}
          >
            X
          </button>
        </div>
        <h1>Discover all the possibilities of Crypto Strategy.</h1>
        {loginStatus === "login" && <Login setLoginStatus={setLoginStatus} setLogged={props.setLogged} exit={exit} /> }
        {loginStatus === "register" && (
          <Register setLoginStatus={setLoginStatus} setLogged={props.setLogged} exit={exit}/>
        )}
        {loginStatus === "passReset" && (
          <PassReset setLoginStatus={setLoginStatus} />
        )}
      </div>
    </div>
  )
}

