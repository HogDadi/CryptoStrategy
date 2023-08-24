import React, { useState, useEffect } from "react"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons'


export default function ScrollToTopButton() {
  const [showScrollBtn, setShowScrollBtn] = useState(false)

  const scrollFunction = () => {
    if (
      document.body.scrollTop > 10 ||
      document.documentElement.scrollTop > 10
    ) {
      setShowScrollBtn(true)
    } else {
      setShowScrollBtn(false)
    }
  }

  const smoothScrollToTop = () => {
    const c = document.documentElement.scrollTop || document.body.scrollTop
    if (c > 0) {
      window.requestAnimationFrame(smoothScrollToTop)
      window.scrollTo(0, c - c / 8)
    }
  }

  useEffect(() => {
    window.addEventListener("scroll", scrollFunction)
    return () => {
      window.removeEventListener("scroll", scrollFunction)
    }
  }, [])

  return (
    <button
      onClick={smoothScrollToTop}
      className="scrollBtn"
      title="Go to top"
      style={{ opacity: showScrollBtn ? 1 : 0, cursor: showScrollBtn ? "pointer" : "default"}}
    >
      <FontAwesomeIcon icon={faArrowUp} />
    </button>
  )
}