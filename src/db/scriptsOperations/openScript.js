import { useParams } from "react-router-dom"
import getPost from "../postOperation/openPost/getPost"
import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import calculateDate from "../../components/utils/calculateDate"
import CommentSection from "../commentOperations/commentSection"
import setViews from "../../components/utils/setViews"
import setDownloads from "../../components/utils/setDownloads"
import sendEmail from "../emails/sendEmail"

export default function OpenScript(props) {
  const admin = props.admin
  const [post, setPost] = useState([])
  let { name } = useParams()
  name = name.replace(/-/g, " ")
  useEffect(() => {
    const fetch = async () => {
      const download = await getPost(name, "scripts")
      setPost(download)
    }
    fetch()
  }, [name])
  useEffect(() => {
    setViews("scripts", name, props.id, props.logged)
  }, [props.id, props.logged, name])

  return (
    <>
      <div className="open-indicator-window">
        <nav className="open-indicator-nav flexR marginA">
          <div className="nav-link">
            <Link to={"/Scripts"}>Scripts</Link>
          </div>
          <div className="marginAH faded-text">/</div>
          <div className="nav-name">{name}</div>
          <div className="open-indicator-edit-btn">
            {admin && (
              <Link to={"/Edit/scripts/" + name}>
                <button>Edit</button>
              </Link>
            )}
          </div>
        </nav>
        <div className="marginA" style={{ maxWidth: "700px" }}>
          <main>
            <article>
              <div className="open-indicator-topic alignC">{name}</div>
              <div className="faded-text open-indicator-date">
                <div>{calculateDate(post.createTime)}</div>
                <div>Views: {post.views}</div>
              </div>
              <div className="open-indicator-img">
                <img src={post.image} alt={name} />
              </div>
              <div
                className="open-indicator-desc"
                dangerouslySetInnerHTML={{ __html: post.description }}
              ></div>
            </article>
            <div className="open-indicator-download-script">
              <a href={post.file} target="_blank">
                <button className="edit-btn" onClick={setDownloads}>
                  Download
                </button>
              </a>
            </div>
          </main>
          {admin && !post.newsletter && (
            <div className="send-mails-btn">
              <button
                className="edit-btn"
                onClick={() => {
                  sendEmail("Scripts", name)
                }}
              >
                Send notifications
              </button>
            </div>
          )}
          <div className="comment-section">
            <CommentSection
              logged={props.logged}
              category={"scripts"}
              name={name}
              nick={props.nick}
              img={props.img}
              id={props.id}
              admin={props.admin}
            />
          </div>
        </div>
      </div>
    </>
  )
}
