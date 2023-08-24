import { db } from "../../../server/connect"
import { ref, set, get } from "firebase/database"
import setCookie from "./setCookie"
import getCookie from "./getCookie"
import updateCookie from "./updateCookie"

export default function setDownloads(category, postName, id, logged) {
  const cookie = getCookie("downloads")
  if (id !== null) {
    if (cookie === undefined) {
      setCookie("downloads", `${category}${postName}${id}`)
      addDownloads(category, postName)
    } else {
      let beAble = cookie.includes(`${category}${postName}${id}`)
      if (beAble === false) {
        updateCookie("downloads", `${category}${postName}${id}`)
        addDownloads(category, postName)
      }
    }
  } else {
    if (logged === false || logged === "false") {
      if (cookie === undefined) {
        setCookie("downloads", `${category}${postName}Anonim`)
        addDownloads(category, postName)
      } else {
        let beAble = cookie.includes(`${category}${postName}Anonim`)
        if (beAble === false) {
          updateCookie("downloads", `${category}${postName}Anonim`)
          addDownloads(category, postName)
        }
      }
    }
  }
}
async function addDownloads(category, postName) {
  const dataRef = ref(db, `/${category}/${postName}/downloads`)
  const snapshot = await get(dataRef)
  const actualDownloads = snapshot.val()
  set(dataRef, actualDownloads + 1)
}
