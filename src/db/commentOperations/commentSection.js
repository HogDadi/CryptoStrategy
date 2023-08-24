import ReactDOM from "react-dom/client"
import React, { useEffect, useState, useRef } from "react"
import calculateDate from "../../components/utils/calculateDate"
import setComment from "./setComment"
import getComments from "./getComments"
import setLike from "./setLike"
import deleteComment from "./deleteComment"
import getCommentsCount from "./getCommentsCount"
import editContent from "./editContent"
import {
  faTrash,
  faThumbsUp,
  faThumbsDown,
} from "@fortawesome/free-solid-svg-icons"
import { faPenToSquare } from "@fortawesome/free-regular-svg-icons"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export default function CommentSection(props) {
  const [top, setTop] = useState([])
  const [count, setCount] = useState(10)
  // const [commentCount, setCommentCount] = useState(0);
  const [logged, category, name, nick, img, id, admin] = [
    props.logged,
    props.category,
    props.name,
    props.nick,
    props.img,
    props.id,
    props.admin,
  ]

  useEffect(() => {
    fetchData()
  }, [count])

  useEffect(() => {
    if (logged === "true" || logged === true) {
      for (let i = 0; i < top.length; i++) {
        if (top[i].likers !== undefined) {
          const userStartSide = top[i].likers[id]
          if (userStartSide === "up") {
            const up = document.getElementById(`up-${top[i].id}`)
            up.classList.add("active")
          } else if (userStartSide === "down") {
            const down = document.getElementById(`down-${top[i].id}`)
            down.classList.add("active")
          }
        }
      }
    }
  }, [top.length, logged, id])

  useEffect(() => {
    const checkScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement
      if (scrollTop + clientHeight >= scrollHeight - 5) {
        if (top.length >= count) {
          setCount(count + 10)
        }
      }
    }
    window.addEventListener("scroll", checkScroll)
    return () => {
      window.removeEventListener("scroll", checkScroll)
    }
  }, [count, top])

  const textRef = useRef()
  const onChangeHandler = function (e) {
    const target = e.target
    if (target.scrollHeight > 20) {
      textRef.current.style.height = `${target.scrollHeight}px`
    }
  }

  async function fetchData() {
    // const commentCount = await getCommentsCount(count, category, name)
    // console.log(commentCount)
    const topComments = await getComments(count, category, name)
    setTop(topComments)
    // setCommentCount(commentCount)
  }

  const handleLike = async (type, commentId, event) => {
    if (logged === "true" || logged === true) {
      const opositeSide = document.getElementById(
        type === "down" ? `up-${commentId}` : `down-${commentId}`
      )
      const isActive = event.target.classList.contains("active")
      if (!isActive) {
        event.target.classList.add("active")
        setTop(prevTop =>
          prevTop.map(comment => {
            if (comment.id === commentId) {
              return { ...comment, [type]: comment[type] + 1 }
            }
            return comment
          })
        )
        if (opositeSide.classList.contains("active")) {
          setTop(prevTop =>
            prevTop.map(comment => {
              if (comment.id === commentId) {
                return {
                  ...comment,
                  [type === "down" ? "up" : "down"]:
                    comment[type === "down" ? "up" : "down"] - 1,
                }
              }
              return comment
            })
          )
          opositeSide.classList.remove("active")
        }
      } else {
        event.target.classList.remove("active")
        setTop(prevTop =>
          prevTop.map(comment => {
            if (comment.id === commentId) {
              return { ...comment, [type]: comment[type] - 1 }
            }
            return comment
          })
        )
      }
      await setLike(type, category, name, commentId, id)
    } else {
      alert("You must be logged in to be able to give reactions")
    }
  }

  const handleDeleteComment = commentId => {
    // const confirmDelete = window.confirm(
    //   "Czy napewno chcesz usunąć swój komentarz?"
    // )
    // if (confirmDelete) {
    //   deleteComment(category, name, commentId)
    //   fetchData()
    // }
    deleteComment(category, name, commentId)
    const newTop = top.filter(comment => comment.id !== commentId)
    setTop(newTop)
    fetchData()
  }

  const handleEditComment = commentId => {
    const EditComment = ({ oldContent, commentId }) => {
      document.getElementById(`edit-${commentId}`).style.display = "none"

      const editComment = event => {
        event.preventDefault()
        const content = document.getElementById(`textarea-${commentId}`).value
        if (content !== "") {
          editContent(category, name, id, content)
          document.getElementById(`edit-${commentId}`).style.display = "unset"
          document.getElementById(`content-${commentId}`).textContent = content
          fetchData()
        }
      }
      return (
        <>
          <form onSubmit={editComment}>
            <textarea
              className="comment-textarea"
              ref={textRef}
              onChange={onChangeHandler}
              placeholder="Enter a comment"
              id={`textarea-${commentId}`}
              defaultValue={oldContent}
            />
            <div className="flexC">
              <button type="submit" className="comment-send-btn">
                Edit
              </button>
            </div>
          </form>
        </>
      )
    }
    const oldContent = document.getElementById(`content-${commentId}`)
    ReactDOM.createRoot(oldContent).render(
      <EditComment commentId={commentId} oldContent={oldContent.textContent} />
    )
  }

  const sendComment = event => {
    event.preventDefault()
    const content = document.getElementById("textarea-content").value
    if (content !== "") {
      setComment(category, name, nick, img, id, content)
      document.getElementById("textarea-content").value = ""
      fetchData()
    }
  }

  return (
    <>
      <div className="comment-count">
        {/* opcjonalnie zrobimy tu licznik komentów */}
        <h2>Comments</h2>
      </div>
      <div className="comment-form">
        {(logged === "true" || logged === true) && (
          <form onSubmit={sendComment} className="flexC">
            <textarea
              id="textarea-content"
              className="comment-textarea"
              ref={textRef}
              onChange={onChangeHandler}
              placeholder="Enter a comment"
            />
            <button type="submit" className="comment-send-btn">
              Add comment
            </button>
          </form>
        )}
        {(logged === "false" || logged === false) && (
          <div className="comment-must-login">
            You must be logged in to be able to give reactions.
          </div>
        )}
      </div>
      <div className="comments-side">
        {top.map(comment => (
          <div className="comment-side" key={comment.id}>
            <div className="flexR">
              <div className="comment-img">
                <img src={comment.img} alt={nick} />
              </div>
              <div className="flexC marginAH faded-text">
                <div className="comment-author">{comment.author}</div>
                <div className="comment-date">
                  {calculateDate(comment.createTime)}
                </div>
              </div>
              {(id === comment.id || admin === true) && (
                <div className="comment-delete">
                  <button onClick={() => handleDeleteComment(comment.id)}>
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                </div>
              )}
              {id === comment.id && (
                <div className="comment-edit">
                  <button
                    onClick={() => handleEditComment(comment.id)}
                    id={`edit-${comment.id}`}
                  >
                    <FontAwesomeIcon icon={faPenToSquare} />
                  </button>
                </div>
              )}
            </div>
            <div className="comment-content" id={`content-${comment.id}`}>
              {comment.content}
            </div>
            <div className="likes">
              <FontAwesomeIcon
                icon={faThumbsUp}
                key={"up" + comment.id}
                id={`up-${comment.id}`}
                className="like-btn"
                onClick={event => {
                  handleLike("up", comment.id, event)
                }}
              />

              {comment.up}
              <FontAwesomeIcon
                icon={faThumbsDown}
                key={"down" + comment.id}
                id={`down-${comment.id}`}
                className="like-btn"
                onClick={event => {
                  handleLike("down", comment.id, event)
                }}
              />
              {comment.down}
            </div>
          </div>
        ))}
      </div>
    </>
  )
}
//? dodawanie komentarzy dla zalogowanych użytkowników ✓
//? możliwość wyświetlania komentów ✓
//? reakcje na komentarze dla zalogowanych ✓
//* aktualizacja w bazie danych ✓
//* aktualizacja na bieżąco widoczna dla użytkownika ✓
//* usuwanie active w przeciwległej opcji ✓
//* odczyt na początku ładownia strony czy już kiedyś dałeś like i ustawienie active po tej stronie ✓
//* zablokowanie możliwości dawania like dla nie zalogowanych ✓

//? możliwość usuwania komenta ✓
//? opcja dla admina na usuwanie każdego komenta ✓
//? informacja czy na pewno chcesz usunąć komentarz
//? możliwość edycji komenta ✓
//? przycisk załadowania większej ilości komentów ✓
//? wystylizować tę sekcję ✓
// TODO zrobić wyświetlanie ilości komentarzy (bez wcześniszego pobierania ich np. pobrać długość sekcji comment posta lub przy każdym poście dodawać nową zmienna commentCount która się będzie zmieniać wraz z operacjami użytkownika)***
//? TODO automatyczne ładowanie większej ilości komentów***
// TODO odpowiedzi do komentów***
// TODO więcej niż jeden komentarz na osobę***
