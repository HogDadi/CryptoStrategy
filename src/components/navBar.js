import logo from "../img/logo.png"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {
  faX,
  faSun,
  faUser,
  faBars,
  faSearch,
} from "@fortawesome/free-solid-svg-icons"
import React, { useState, useEffect } from "react"
import LoginSide from "./loginSide"
import LoggedSide from "./loggedSide"
import { Link } from "react-router-dom"
import Search from "./search"
import Scripts from './../db/scriptsOperations/scripts';

export default function NavBar(props) {
  const [
    img,
    nick,
    email,
    logged,
    setLogged,
    setAdmin,
    admin,
    search,
    setSearch,
  ] = [
    props.img,
    props.nick,
    props.email,
    props.logged,
    props.setLogged,
    props.setAdmin,
    props.admin,
    props.search,
    props.setSearch,
  ]
  const [isThemeDark, setIsThemeDark] = useState(true)
  const [showLoginSide, setShowLoginSide] = useState("closed")
  const [isBurgerOpen, setIsBurgerOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)

  const changeTheme = () => {
    isThemeDark
      ? document.body.setAttribute("theme", "light")
      : document.body.setAttribute("theme", "dark")
    setIsThemeDark(!isThemeDark)
  }

  useEffect(() => {
    const handleClick = event => {
      if (
        !event.target.closest(".search-unvisible") &&
        !event.target.closest(".open-search")
      ) {
        if (isSearchOpen === true) {
          searchExit()
        }
      }
    }
    document.addEventListener("click", handleClick)
    return () => {
      document.removeEventListener("click", handleClick)
    }
  }, [isSearchOpen])

  const searchX = () => {
    setSearch("")
    document.getElementById("search").value = ""
  }
  const toogleBurger = () => {
    setIsBurgerOpen(!isBurgerOpen)
  }
  function burgerExit() {
    const element = document.querySelector(".header-unvisible")
    element.style.animationName = "znikanie"
    element.style.animationDuration = "0.2s"
    element.style.animationFillMode = "both"
    setTimeout(() => {
      toogleBurger()
    }, 200)
  }
  function searchExit() {
    const element = document.querySelector(".search-unvisible")
    element.style.animationName = "znikanieSearch"
    element.style.animationDuration = "0.2s"
    element.style.animationFillMode = "both"
    setTimeout(() => {
      setIsSearchOpen(false)
      searchX()
    }, 200)
  }

  return (
    <nav className="header-all">
      {showLoginSide === "login" && (
        <LoginSide setShowLoginSide={setShowLoginSide} setLogged={setLogged} />
      )}
      {showLoginSide === "logged" && (
        <LoggedSide
          setShowLoginSide={setShowLoginSide}
          setLogged={setLogged}
          img={img}
          nick={nick}
          email={email}
          setAdmin={setAdmin}
          admin={admin}
        />
      )}
      <div className="header">
        <Link to="/">
          <div className="logo">
            <img src={logo} alt="logo" />
            <div className="logo-letters">Crypto Startegy</div>
          </div>
        </Link>
        <div className="header-list">
          <Link to="/Strategies">Strategies</Link>
          <Link to="/Indicators">Indicators</Link>
          <Link to="/Scripts">Skripts</Link>
          <Link to="/Instructions">Instructions</Link>
        </div>
        <div className="header-right-side">
          <label className="searcher-label">
            <input
              onChange={e => setSearch(e.target.value)}
              type="text"
              id="search"
              className="searcher"
              placeholder="Serach..."
            />
            <i onClick={searchX}>
              <FontAwesomeIcon icon={faX} />
            </i>
            <Search {...{ search, setSearch }} />
          </label>
          <button
            id="switch-theme"
            role="switch"
            aria-label="Przełącz motyw"
            aria-checked={isThemeDark}
            onClick={changeTheme}
          >
            <i>
              <FontAwesomeIcon icon={faSun} />
            </i>
          </button>
          {!logged && (
            <button
              className="login-btn"
              aria-label="Zaloguj się"
              onClick={() => setShowLoginSide("login")}
            >
              <i>
                <FontAwesomeIcon icon={faUser} />
              </i>
            </button>
          )}
          {logged && (
            <button
              className="logged-btn"
              aria-label="Przejdź do profilu"
              onClick={() => setShowLoginSide("logged")}
            >
              <img src={img} alt="profilowe" />
            </button>
          )}
        </div>
      </div>
      <div className="header-burger">
        <div className="haeder-visible">
          <Link to="/">
            <div className="logo">
              <img src={logo} alt="logo" />
              <div className="logo-letters">Crypto Strategy</div>
            </div>
          </Link>
          <div className="header-burger-right-side">
            <div className="open-search" onClick={() => setIsSearchOpen(true)}>
              <i>
                <FontAwesomeIcon icon={faSearch} />
              </i>
            </div>
            {isSearchOpen && (
              <>
                <div className="search-unvisible">
                  <div className="login-btns">
                    <button
                      style={{ margin: "0 0 10px auto" }}
                      onClick={searchExit}
                    >
                      x
                    </button>
                  </div>
                  <label className="searcher-label">
                    <input
                      onChange={e => setSearch(e.target.value)}
                      type="text"
                      id="search"
                      className="edit-input"
                      placeholder="Wyszukaj..."
                    />
                    <i onClick={searchX}>
                      <FontAwesomeIcon icon={faX} />
                    </i>
                    <Search {...{ search, setSearch }} />
                  </label>
                </div>
              </>
            )}
            {!logged && (
              <button
                className="login-btn"
                aria-label="Zaloguj się"
                onClick={() => setShowLoginSide("login")}
              >
                <i>
                  <FontAwesomeIcon icon={faUser} />
                </i>
              </button>
            )}
            {logged && (
              <button
                className="logged-btn"
                aria-label="Przejdź do profilu"
                onClick={() => setShowLoginSide("logged")}
              >
                <img src={img} alt="profilowe" />
              </button>
            )}
            <div className="burger-menu" onClick={toogleBurger}>
              <FontAwesomeIcon icon={faBars} />
            </div>
          </div>
        </div>
        {isBurgerOpen && (
          <div className="header-unvisible">
            <div className="login">
              <button
                className="logged-close"
                type="close"
                onClick={burgerExit}
                style={{ marginLeft: "auto" }}
              >
                X
              </button>

              <div onClick={burgerExit} className="header-list">
                <Link to="/Strategies">Strategies</Link>
                <Link to="/Indicators">Indicators</Link>
                <Link to="/Scripts">Skripts</Link>
                <Link to="/Instructions">Instructions</Link>
              </div>

              <div className="swich-theme">
                <button
                  onClick={() => {
                    changeTheme()
                    burgerExit()
                  }}
                  className="edit-btn"
                >
                  Change background color<FontAwesomeIcon icon={faSun} />{" "}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
//? TODO zrobić animację wychodzenia wyszukiwarki z góry
//? TODO zrobienie możliwości jej zamknięcia poprzez przycik
//? TODO przycisk do usuwania całego textu z inputu
//? TODO ułożenie wyników na całą stronę
//? TODO możliwść scrolowania
