import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import UpdateImg from "../db/userOperations/updateImg"
import UpdateNick from "../db/userOperations/updateNick"
import UpdatePass from "../db/userOperations/updatePass"
import checkEmailFromNewsletter from "../db/userOperations/checkEmailFromNewsletter"
import removeEmailFromNewsletter from "../db/newsletter/removeEmailFromNewsletter"
import setEmailToNewsletter from "../db/newsletter/setEmailToNewsletter"

export default function EditUser(props) {
  const navigate = useNavigate()
  const [img, nick, email, logged, setImg, setNick, setEmail, setLogged, id] = [
    props.img,
    props.nick,
    props.email,
    props.logged,
    props.setImg,
    props.setNick,
    props.setEmail,
    props.setLogged,
    props.id,
  ]
  const changeNewsletter = async () => {
    if (logged === "true" || logged === true) {
      const res = await checkEmailFromNewsletter(id)
      if (res !== null) {
        removeEmailFromNewsletter(id)
        setNewsletterBtn("Enable newsletter in your account")
      } else {
        setEmailToNewsletter(id, email)
        setNewsletterBtn("Disable newsletter in your account")
      }
    }
  }
  const [imgChange, setImgChange] = useState(false)
  const [newsletterBtn, setNewsletterBtn] = useState(null)
  const check = async () => {
    const res = await checkEmailFromNewsletter(id)
    if (res !== null) {
      setNewsletterBtn("Enable newsletter in your account")
    } else {
      setNewsletterBtn("Disable newsletter in your account")
    }
  }

  useEffect(() => {
    if (logged === "false" || logged === false) {
      navigate("/")
    } else {
      check()
    }
  }, [logged])

  return (
    <div className="edit-side">
      <h1 className="alignC">Profile Editing</h1>
      <div className="user-edit-sides" style={{ marginTop: "10px" }}>
        {(logged === true || logged === "true") && (
          <>
            <div className="update-user-left">
              <h1 className="alignC">{nick}</h1>
              {!imgChange && (
                <div className="edit-avatar flexC">
                  <img src={img} alt="avatar" />
                  <button
                    className="edit-btn"
                    onClick={() => {
                      setImgChange(true)
                    }}
                  >
                    Change your profile photo
                  </button>
                </div>
              )}
              {imgChange && (
                <UpdateImg
                  img={img}
                  setImg={setImg}
                  setImgChange={setImgChange}
                  setNick={setNick}
                />
              )}
              <button
                className="edit-btn"
                onClick={() => {
                  changeNewsletter()
                }}
              >
                {newsletterBtn}
              </button>
            </div>
            <div className="marginA update-user-right">
              <h1 className="alignC">Acount settings</h1>
              <UpdateNick setNick={setNick} />
              <UpdatePass email={email} />
            </div>
          </>
        )}
      </div>
    </div>
  )
}
//? TODO możliwość wyłączenia newslettera na swoim koncie
