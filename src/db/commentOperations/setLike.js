import { db } from "../../../server/connect"
import { ref, set, get } from "firebase/database"

export default function setLike(side, category, postName, commentId, userId) {
  operations(side, category, postName, commentId, userId)
}

async function operations(side, category, postName, commentId, userId) {
  const dataRef = ref(
    db,
    `/${category}/${postName}/comments/${commentId}/likers/${userId}`
  )
  const snapshot = await get(dataRef)
  const actualSide = snapshot.val()

  if (actualSide === null) {
    addId(category, postName, commentId, userId, side)
    plusValue(category, postName, commentId, side)
  } else if (actualSide !== side && actualSide !== null) {
    addId(category, postName, commentId, userId, side)
    reverse(category, postName, commentId, side)
  } else if (actualSide === side) {
    addId(category, postName, commentId, userId, null)
    minusValue(category, postName, commentId, side)
  }
}

function addId(category, postName, commentId, userId, side) {
  const reference = ref(
    db,
    `/${category}/${postName}/comments/${commentId}/likers/${userId}`
  )
  set(reference, side)
}
async function plusValue(category, postName, commentId, side) {
  const sideValue = ref(
    db,
    `/${category}/${postName}/comments/${commentId}/${side}`
  )
  let likeValue = await get(sideValue)
  likeValue = likeValue.val()
  set(sideValue, likeValue + 1)
}
function reverse(category, postName, commentId, side) {
  if (side === "up") {
    const newSide = "down"
    minusValue(category, postName, commentId, newSide)
    plusValue(category, postName, commentId, side)
  } else if (side === "down") {
    const newSide = "up"
    minusValue(category, postName, commentId, newSide)
    plusValue(category, postName, commentId, side)
  }
}
async function minusValue(category, postName, commentId, side) {
  const sideValue = ref(
    db,
    `/${category}/${postName}/comments/${commentId}/${side}`
  )
  let likeValue = await get(sideValue)
  likeValue = likeValue.val()
  set(sideValue, likeValue - 1)
}
