import { db } from "../../../server/connect"
import { ref, set, get } from "firebase/database"
import setCookie from "./setCookie"
import getCookie from "./getCookie"
import updateCookie from "./updateCookie"

export default function setViews(category, postName, id, logged) {
  const cookie = getCookie("views")
  if (id !== null) {
    if (cookie === undefined) {
      setCookie("views", `${category}${postName}${id}`)
      addViews(category, postName)
    } else {
      let beAble = cookie.includes(`${category}${postName}${id}`)
      if (beAble === false) {
        updateCookie("views", `${category}${postName}${id}`)
        addViews(category, postName)
      }
    }
  } else {
    if (logged === false || logged === "false") {
      if (cookie === undefined) {
        setCookie("views", `${category}${postName}Anonim`)
        addViews(category, postName)
      } else {
        let beAble = cookie.includes(`${category}${postName}Anonim`)
        if (beAble === false) {
          updateCookie("views", `${category}${postName}Anonim`)
          addViews(category, postName)
        }
      }
    }
  }
}
async function addViews(category, postName) {
  const dataRef = ref(db, `/${category}/${postName}/views`)
  const snapshot = await get(dataRef)
  const actualViews = snapshot.val()
  set(dataRef, actualViews + 1)
}
