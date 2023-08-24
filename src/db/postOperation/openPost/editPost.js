import React, { useState, useEffect } from "react"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
import { useParams, Link, useNavigate } from "react-router-dom"
import getPost from "./getPost"
import updatePost from "./updatePost"
import deleteIndicator from "./deletePost"
import deleteImg from "./deleteImg"
import updateImg from "./updateImg"

export default function EditIndicator(props) {
  const navigate = useNavigate()
  const { category, name } = useParams()
  const [newName, setNewName] = useState(name)
  const [views, setViews] = useState(0)
  const [img, setImg] = useState("")
  const [value, setValue] = useState("")
  const [link, setLink] = useState(null)
  const [file, setFile] = useState(null)
  const [newsletter, setNewsletter] = useState(true)
  const [newFile, setNewFile] = useState(null)
  const [newImg, setNewImg] = useState(null)
  const [alert, setAlert] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!props.admin) navigate("/")
    const fetch = async () => {
      if (category === "scripts") {
        const indicator = await getPost(name, "scripts")
        setNewsletter(indicator.newsletter)
        setValue(indicator.description)
        setViews(indicator.views)
        setImg(indicator.image)
        setLink("/Scripts/" + indicator.name)
        setFile(indicator.file)
      } else {
        const indicator = await getPost(name, category)
        setNewsletter(indicator.newsletter)
        setValue(indicator.description)
        setViews(indicator.views)
        setImg(indicator.image)
        if (category === "indicators") {
          setLink("/Indicators/" + newName)
        } else if (category === "instructions") {
          setLink("/Instructions/" + newName)
        } else if (category === "strategies") {
          setLink("/Strategies" + newName)
        }
      }
    }
    fetch()
  }, [category, name, navigate, props.admin, newName])

  useEffect(() => {
    if (category === "indicators") {
      setLink("/Indicators/" + newName)
    } else if (category === "scripts") {
      setLink("/Scripts/" + newName)
    } else if (category === "instructions") {
      setLink("/Instructions/" + newName)
    } else if (category === "strategies") {
      setLink("/Strategies" + newName)
    }
  }, [newName, category])

  const handleChange = newValue => {
    setValue(newValue)
  }
  const send = async () => {
    const res = await getPost(newName, category)
    if (res === null) {
      if (name !== newName) {
        deleteImg(category, name)
      }
      if (newImg !== null || newFile !== null) {
        updateImg(newImg, newName, file, category, newFile, async () => {
          await updatePost(name, value, newName, views, category, newsletter)
          navigate(link)
        })
      } else {
        await updatePost(name, value, newName, views, category, newsletter)
        navigate(link)
      }
    } else {
      setError("A post with that name already exists in the database")
    }
  }

  const deleteI = () => {
    setAlert(true)
  }

  const modules = {
    toolbar: [
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike", "blockquote"],
      [
        { list: "ordered" },
        { list: "bullet" },
        { indent: "-1" },
        { indent: "+1" },
      ],
      ["link", "image"],
      ["clean"],
    ],
  }
  const formats = [
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "blockquote",
    "list",
    "bullet",
    "indent",
    "link",
    "image",
    "image/webp",
  ]

  return (
    <div className="editor-window marginA">
      {alert && (
        <AlertToAccept {...{ name, category, alert, setAlert, navigate }} />
      )}
      <div className="editor-title">
        <div className="faded-text">Title</div>
        <input
          value={newName}
          id="newName"
          onChange={e => setNewName(e.target.value)}
        />
        <div className="faded-text">View counter</div>
        <input
          value={views}
          id="newViews"
          onChange={e => setViews(e.target.value)}
        />
        <div className="faded-text">Newsletter status</div>
        <div className="select-newsletter">
          <select
            onChange={e => {
              const target = e.target.value
              const toBool = JSON.parse(target)
              console.log(toBool)
              setNewsletter(toBool)
            }}
            value={newsletter.toString()}
          >
            <optgroup label="Select category"></optgroup>
            <option value="true">Sent</option>
            <option value="false">Not sent</option>
          </select>
        </div>
        <div>
          <div className="faded-text">Image</div>
          <button
            className="set-post-set-img"
            onClick={() => document.getElementById("set-img").click()}
          >
            Send image
          </button>
          <input
            id="set-img"
            type="file"
            accept="image/webp, image/png, image/jpeg"
            style={{ display: "none" }}
            onChange={e => {
              setNewImg(e.target.files[0])
              setImg(URL.createObjectURL(e.target.files[0]))
            }}
          />
          <img src={img} alt="Podgląd przesłanego obrazu" id="img-preview" />
        </div>
        {category === "scripts" && (
          <div>
            <div className="faded-text">Script</div>
            <button
              className="set-post-set-img"
              onClick={() => document.getElementById("set-script").click()}
            >
              Send script
            </button>
            <input
              id="set-script"
              type="file"
              style={{ display: "none" }}
              onChange={e => {
                setFile(e.target.files[0])
                setNewFile(e.target.files[0].name)
              }}
            />
            <div className="faded-text alignC" id="script-name">
              {newFile}
            </div>
          </div>
        )}
      </div>
      <div className="editor">
        <ReactQuill
          value={value}
          modules={modules}
          formats={formats}
          onChange={handleChange}
        ></ReactQuill>
        <Link to={link}>
          <button className="editor-back-btn">Back</button>
        </Link>
        <button className="editor-send-btn" onClick={send}>
          Send
        </button>
      </div>
      <div className="red-text">{error}</div>
      <div className="editor-bottom">
        <button className="editor-bottom-btn" onClick={deleteI}>
          Delete
        </button>
      </div>
    </div>
  )
}

function AlertToAccept(props) {
  const { name, category, alert, setAlert, navigate } = props

  const [del, setDel] = useState(false)

  useEffect(() => {
    if (del) {
      deleteIndicator(name, category)
      deleteImg(category, name)
      if (category === "indicators") {
        navigate("/Indicators")
      } else if (category === "scripts") {
        navigate("/Scripts")
      } else if (category === "instructions") {
        navigate("/Instructions")
      } else if (category === "strategies") {
        navigate("/Strategies")
      }
      setAlert(false)
    }
  }, [del])
  return (
    <div className="center">
      <div className="alert-window">
        Are you sure you want to delete this post?
        <div className="alert-btns">
          <button
            className="editor-bottom-btn"
            onClick={() => {
              setDel(false)
              setAlert(false)
            }}
          >
            No
          </button>
          <button
            className="editor-bottom-btn"
            onClick={() => {
              setDel(true)
            }}
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  )
}

//? TODO dodać update zdjęcia ✓
//? TODO dodać usuwanie posta ✓
//? TODO przy usuwaniu posta usuwanie również zdjęcia z magazynu ✓
//? TODO przy edycji tytułu zmienić również nazwę zdjęcia tak by wszystko się zgadzało ✓
//? TODO edycja zdjęcia razem ze wszystkim (brak oddzielnego guzika)
//? TODO zrobić możliwość edycji skryptu
//? TODO zrobić zabezpieczenie przed przypadkowym usunięciem posta (potwierdzenie alertu)
// TODO naprawic bo zmieniaja  nazwę skryptu nie są zmieniane nazwy skryptu i img powinny zostawać staredlatego tzreba wprowadzić wkońcu imgsrc i scriptsrc
//? TODO zrobić możliwość zmiany zmiennej z bazy danych czy newsletter został wysłany
//? TODO przy zmianie nazwy postu spradzenie czy nie ma takiej już w bazie danych
