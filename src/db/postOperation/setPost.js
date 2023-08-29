import React, { useEffect, useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import ReactQuill from "react-quill"
import "react-quill/dist/quill.snow.css"
import setPostToDB from "./setPostToDB"
import setScript from "../scriptsOperations/setScript"
import getPost from "./openPost/getPost"

export default function SetPost(props) {
  const [category, setCategory] = useState("strategies")
  const [value, setValue] = useState("")
  const [title, setTitle] = useState("")
  const [img, setImg] = useState("")
  const [script, setScript] = useState("")
  const [error, setError] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    if (!props.admin) navigate("/")
  }, [navigate, props.admin])

  return (
    <>
      <div className="set-post-side">
        <div className="select-category">
          <select onChange={e => setCategory(e.target.value)}>
            <optgroup label="Select category"></optgroup>
            <option value="strategies">Strategies</option>
            <option value="indicators">Indicator</option>
            <option value="scripts">Script</option>
            <option value="instructions">Instruction</option>
          </select>
        </div>
        {category !== "scripts" && (
          <Indicator
            {...{
              value,
              setValue,
              title,
              setTitle,
              img,
              setImg,
              category,
              navigate,
              setError,
              error,
            }}
          />
        )}
        {category === "scripts" && (
          <Script
            {...{
              value,
              setValue,
              title,
              setTitle,
              img,
              setImg,
              script,
              setScript,
              category,
              navigate,
              setError,
              error,
            }}
          />
        )}
      </div>
    </>
  )
}

function Indicator(props) {
  const send = async () => {
    if (
      props.title !== "" &&
      props.category !== "" &&
      props.img !== "" &&
      props.value !== ""
    ) {
      const res = await getPost(props.title, props.category)
      if (res === null) {
        setPostToDB(props.title, props.category, props.value, props.img, () => {
          props.navigate(`/${props.category}/${props.title}`)
        })
      } else {
        props.setError("There is already a post with that name!")
      }
    } else {
      props.setError("Complete all data!")
    }
  }
  return (
    <>
      <div className="editor-title">
        <div className="faded-text">Title</div>
        <input
          defaultValue={props.title}
          onChange={e => props.setTitle(e.target.value)}
        />
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
              document.getElementById("img-preview").src = URL.createObjectURL(
                e.target.files[0]
              )
              document.getElementById("img-preview").style.display = "block"
              props.setImg(document.getElementById("img-preview").src)
            }}
          />
          <img
            src=""
            alt="Preview of the uploaded image"
            id="img-preview"
            style={{ display: "none" }}
          />
        </div>
      </div>
      <Editor value={props.value} setValue={props.setValue} />
      <div className="red-text">{props.error}</div>
      <div className="editor-bottom">
        <Link to="/">
          <button className="editor-bottom-btn">Back</button>
        </Link>
        <button className="editor-bottom-btn" onClick={send}>
          Send
        </button>
      </div>
    </>
  )
}

function Script(props) {
  function send() {
    if (
      props.title !== "" &&
      props.value !== "" &&
      props.img !== "" &&
      props.script !== ""
    ) {
      setScript(props.title, props.value, props.script, props.img, () => {
        props.navigate("/Scripts/" + props.title)
      })
    } else {
      props.setError("Complete all data!")
    }
  }

  return (
    <>
      <div className="editor-title">
        <div className="faded-text">Title</div>
        <input
          defaultValue={props.title}
          onChange={e => props.setTitle(e.target.value)}
        />
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
              document.getElementById("img-preview").src = URL.createObjectURL(
                e.target.files[0]
              )
              document.getElementById("img-preview").style.display = "block"
              props.setImg(document.getElementById("img-preview").src)
            }}
          />
          <img
            src=""
            alt="Preview of the uploaded image"
            id="img-preview"
            style={{ display: "none" }}
          />
        </div>

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
              document.getElementById("script-name").style.display = "block"
              props.setScript(e.target.files[0])
            }}
          />
          <div
            className="faded-text alignC"
            id="script-name"
            style={{ display: "none" }}
          >
            {props.script.name}
          </div>
        </div>
      </div>
      <Editor value={props.value} setValue={props.setValue} />
      <div className="red-text">{props.error}</div>
      <div className="editor-bottom">
        <Link to="/">
          <button className="editor-bottom-btn">Back</button>
        </Link>
        <button className="editor-bottom-btn" onClick={send}>
          Send
        </button>
      </div>
    </>
  )
}

function Editor(props) {
  const handleChange = newValue => {
    props.setValue(newValue)
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
    <div className="editor">
      <div className="faded-text">Content</div>
      <ReactQuill
        value={props.value}
        modules={modules}
        formats={formats}
        onChange={handleChange}
      ></ReactQuill>
    </div>
  )
}
