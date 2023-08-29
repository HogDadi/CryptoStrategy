import { useParams } from "react-router-dom"
import getPost from "./getPost"
import React, { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import calculateDate from "../../../components/utils/calculateDate"
import CommentSection from "../../commentOperations/commentSection"
import setViews from "../../../components/utils/setViews"
import sendEmail from "../../emails/sendEmail"

export default function OpenPost(props) {
  const admin = props.admin
  const [post, setPost] = useState([])
  let { category, name } = useParams()

const categoryM = category.toLowerCase()

  name = name.replace(/-/g, " ")
  useEffect(() => {
    const fetch = async () => {
      const post = await getPost(name, categoryM)
      setPost(post)
    }
    fetch()
  }, [name, categoryM])

  useEffect(() => {
    setViews(categoryM, name, props.id, props.logged)
  }, [props.id, props.logged, name, categoryM])

  return (
    <>
      <div className="open-indicator-window">
        <nav className="open-indicator-nav marginA">
          <div className="nav-link">
            <Link to={`/${category}`}>{category}</Link>
          </div>
          <div className="marginAH faded-text">/</div>
          <div className="nav-name">{name}</div>
          <div className="open-indicator-edit-btn">
            {admin && (
              <>
                <Link to={`/Edit/${categoryM}/${name}`}>
                  <button>Edit</button>
                </Link>
              </>
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
          </main>
          {admin && !post.newsletter && (
            <div className="send-mails-btn">
              <button
                className="edit-btn"
                onClick={() => {
                  sendEmail(category, name)
                }}
              >
                Send notifications
              </button>
            </div>
          )}
          <div className="comment-section">
            <CommentSection
              logged={props.logged}
              category={categoryM}
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