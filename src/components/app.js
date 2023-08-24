import "./style/app.css"
import "./style/app-mobile.css"
import "./style/app-pc.css"
import "./style/app-tablets.css"
import React, { useState, useEffect } from "react"
import { Route, Routes, useLocation } from "react-router-dom"
import Entry from "./entry"
import NavBar from "./navBar"
import HomeIndicators from "./homeIndicators"
import NewsLetter from "./newsLetter"
import HomeScripts from "./homeScripts"
import Footer from "./footer"
import EditUser from "./editUser"
import Scipts from "../db/scriptsOperations/scripts"
import OpenScript from "../db/scriptsOperations/openScript"
import EditPost from "../db/postOperation/openPost/editPost"
import { auth } from "../../server/connect"
import { getRedirectResult } from "firebase/auth"
import checkAdmin from "../db/userOperations/checkAdmin"
import ScrollToTopButton from "./utils/scroll-btn"
import SetPost from "../db/postOperation/setPost"
import Posts from "../db/postOperation/postsSide"
import OpenPost from "../db/postOperation/openPost/openPost"
import AcceptCookie from "./acceptCookie"

export default function App() {
  const [logged, setLogged] = useState(
    JSON.parse(localStorage.getItem("logged")) ?? false
  )
  const [id, setId] = useState(null)
  const [img, setImg] = useState(null)
  const [nick, setNick] = useState(null)
  const [email, setEmail] = useState(null)
  const [admin, setAdmin] = useState(false)
  const [search, setSearch] = useState(null);
  const [category, setCategory] = useState([])
  const location = useLocation()

  useEffect(() => {
    getRedirectResult(auth).then(result => {
      if (result !== null) {
        localStorage.setItem("logged", true)
        setLogged(true)
      }
    })
  }, [])

  useEffect(() => {
    if (logged === "true" || logged === true) {
      auth.onAuthStateChanged(user => {
        setImg(user.photoURL)
        setNick(user.displayName)
        setEmail(user.email)
        setId(user.uid)
        const fetchAdmin = async () => {
          setAdmin(await checkAdmin(user.uid))
        }
        fetchAdmin()
      })
    }
  }, [logged])

  useEffect(() => {
    window.scrollTo(0, 0)
    // let lokacja = location.pathname.replace(/%C5%BA/g, "ź")
    // lokacja = lokacja.split("/")[1]
    // const newCategory = [...category, lokacja]
    // if (newCategory.length === 3) {
    //   newCategory.shift()
    // }
    // setCategory(newCategory)
  }, [location])

  return (
    <>
      <NavBar {...{ img, nick, email, logged, setLogged, setAdmin, admin, search, setSearch}} />
      <Routes>
        <Route path="/" element={<Home {...{logged, id}}/>} />
        <Route path=":category" element={<Posts />} />
        <Route
          path=":category/:name"
          element={<OpenPost {...{ admin, logged, nick, img, id }} />}
        />
        <Route path="Scripts" element={<Scipts />} />
        <Route
          path="Scripts/:name"
          element={<OpenScript {...{ admin, logged, nick, img, id }} />}
        />
        <Route
          path="Edit/:category/:name"
          element={<EditPost admin={admin} category={category} />}
        />
        <Route
          path="Edit-User"
          element={
            <EditUser
              {...{
                img,
                nick,
                email,
                logged,
                setImg,
                setNick,
                setEmail,
                setLogged,
                id
              }}
            />
          }
        />
        <Route path="Set-Post" element={<SetPost {...{ admin }} />} />

      </Routes>
      <Footer />
      <ScrollToTopButton />
    </>
  )
}
function Home(props) {
  return (
    <>
      <Entry />
      <HomeIndicators />
      <HomeScripts />
      <NewsLetter logged={props.logged} id={props.id} />
      <AcceptCookie />
    </>
  )
}
//? TODO zrobić dodawanie postów w zakładce dla zalogowanych ale tylko wtedy gdy jesteś adminem ✓
//? TODO zrobić jeden cookie do wszystkich postów (nazwy postów w treści), oddzielny do download w skryptach ✓
//? TODO zrobić sekcję strategie
//? TODO zrobić sekcję instrukcje
//? TODO zrobić openScript ✓
//? TODO dodać sekcję komentarzy do skryptów ✓
//? TODO zrobić informację o używaniu cookies
//? TODO zrobić wyszukiwarkę
//? TODO zrobić layout pod telefony
//? TODO zrobić jasny layout
//? TODO zrobić zabezpieczenia przed dodaniem postu który już istnieje
//? TODO zrobić zabezpieczenie przed edycją na nazwe która jest już zajęta
// TODO zrobić własny edytor do przycinania zdjęć***
// TODO dodać identyfikatory do nazw postów zamiast identyfikator = nazwa
// TODO wprowadzić system ten który wykrywa wcześniej otwartą stronę do powrotów (linijki kodu 58-67)
// TODO zrobić system zapisywania miejsca w którym był użytkownik po cofnięciu np. jestem w otwartym poście i cofam się do ogólnej kategorii w to samo miejsce w którym byłem
