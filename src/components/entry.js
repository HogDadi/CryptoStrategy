import React from "react"
import image from "../img/entry.png"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faYoutube,
  faTwitter,
  faTelegram,
  faFacebook,
} from "@fortawesome/free-brands-svg-icons"

function Entry() {
  const socialLinks = [
    {
      href: "https://www.youtube.com",
      className: "youtubeBtn",
      text: "Youtube",
      icon: faYoutube,
    },
    {
      href: "https://www.twitter.com",
      className: "twitterBtn",
      text: "Twitter",
      icon: faTwitter,
    },
    {
      href: "https://www.telegram.com",
      className: "telegramBtn",
      text: "Telegram",
      icon: faTelegram,
    },
    {
      href: "https://www.facebook.com",
      className: "facebookBtn",
      text: "Facebook",
      icon: faFacebook,
    },
  ]

  return (
    <div className="content">
      <div className="entry">
        <div className="entry-text">
          <h1>Cryptocurrencies and Trading</h1>
          <div className="entry-desc">
          Thanks to us you will learn a new strategy. You will dispel doubts about
            performance of various indicators. You will read useful tips and
            manual or download the scripts created by our team
          </div>
          <div className="entry-add-text">Check out our socials</div>
          <div className="entry-social-btns">
            {socialLinks.map(({ href, className, text, icon }) => (
              <a key={href} href={href} target="_blank" rel="noreferrer">
                <button className={className}>
                  {text}{" "}
                  <i className={text.toLowerCase()}>
                    <FontAwesomeIcon icon={icon} />
                  </i>
                </button>
              </a>
            ))}
          </div>
          <div className="entry-social-btns-mobile">
            {socialLinks.map(({ href, className, text, icon }) => (
              <a key={href} href={href} target="_blank" rel="noreferrer">
                <button className={className}>
                  <i className={text.toLowerCase()}>
                    <FontAwesomeIcon icon={icon} />
                  </i>
                </button>
              </a>
            ))}
          </div>
        </div>
        <div className="entry-img">
          <img src={image} alt="entry" />
        </div>
      </div>
    </div>
  )
}

export default Entry
