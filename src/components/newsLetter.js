import React, { useEffect, useState } from "react";
import setEmailToNewsletter from "../db/newsletter/setEmailToNewsletter";

export default function NewsLetter(props) {
  const [text, setText] = useState(null);
  const logged = props.logged
  const handleSubmit = (event) => {
    event.preventDefault();
    const btnData = document.querySelector(".newsletter-email").value
    if (btnData !== "") {
      if(logged === true || logged === "true"){
        setEmailToNewsletter(props.id, btnData)
      }
      document.querySelector(".newsletter-form").innerHTML =
        `<div class='newsletter-send'>${text}</div>`
    }
  }

  useEffect(() => {
    if(logged === true || logged === "true"){
      setText("Congratulations on subscribing to the newsletter!")
    } else {
      setText("You must be logged in to subscribe to the newsletter.")
    }
  }, [logged])

  return (
    <div className="newsletter-bg">
      <div className="newsletter">
        <h1>Do you want to receive notifications about new entries?</h1>
        <div className="newsletter-text">
        Subscribe to our newsletter to automatically receive an email notification when there is something new.
        </div>
        <div className="newsletter-form">
          <form onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              className="newsletter-email"
            />
            <button type="submit">
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
