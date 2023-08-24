import React from "react"
import { Link, useNavigate } from "react-router-dom"
import { auth } from "../../server/connect"
import { signOut } from "firebase/auth"

export default function LoggedSide(props) {
  const navigate = useNavigate()
  function exit() {
    const element = document.querySelector(".login-bg")
    element.style.animationName = "znikanie"
    element.style.animationDuration = "0.2s"
    element.style.animationFillMode = "both"
    setTimeout(() => {
      props.setShowLoginSide("closed")
    }, 200)
  }
  function logOut() {
    props.setAdmin(null)
    navigate("/")
    signOut(auth)
    localStorage.setItem("logged", false)
    props.setShowLoginSide("closed")
    props.setLogged(false)
  }

  return (
    <div className="login-bg">
      <div className="login">
        <button
          className="logged-close"
          type="close"
          onClick={exit}
          style={{ marginLeft: "auto" }}
        >
          X
        </button>
        <div className="flexR">
          <h1>Profile</h1>
          <button className="logout-btn" onClick={logOut}>
            Log out
          </button>
        </div>
        <div className="flexC">
          <div className="logged-img">
            <img src={props.img} alt="avatar" />
          </div>
          <div className="logged-info">
            <div className="bold">{props.nick}</div>
            <div>{props.email}</div>
          </div>
          <Link to="Edit-User" onClick={exit}>
            <button className="edit-btn">Edit profile</button>
          </Link>
          {props.admin && (
            <Link to="Set-Post" onClick={exit}>
              <button className="edit-btn">Add post</button>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}

//? TODO zrobić by się dało to scrollować w przypadku w którym obraz jest za mały na wyświetlenie całości
