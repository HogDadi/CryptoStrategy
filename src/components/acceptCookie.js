import React, { useState } from "react"

export default function AcceptCookie() {
  const [accept, setAccept] = useState(
    JSON.parse(localStorage.getItem("accept")) ?? false
  )

  const ok = () => {
    localStorage.setItem("accept", true)
    setAccept(true)
  }

  return (
    <>
      {accept === "false" ||
        (accept === false && <div className="cookie-accept">This website uses cookies to function properly<button className='editor-bottom-btn'  onClick={() => {ok()}}>Accept</button></div>)}
    </>
  )
}
