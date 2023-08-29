import React, { useEffect, useState } from "react"
import getPostsByDate from "./getPostsByDate"
import getPostsByViews from "./getPostsByViews"
import calculateDate from "../../components/utils/calculateDate"
import { Link, useParams, useNavigate } from "react-router-dom"

export default function Posts() {
  const navigate = useNavigate()
  const { category } = useParams()
  const [top, setTop] = useState([])
  const [count, setCount] = useState(6)
  const [sortType, setSortType] = useState("time")
  async function fetchData() {
    if (sortType === "time") {
      const topPosts = await getPostsByDate(count, category)
      setTop(topPosts)
    } else if (sortType === "views") {
      const topPosts = await getPostsByViews(count, category)
      setTop(topPosts)
    }
  }

  useEffect(() => {
    if (category === "live") {
      navigate("/")
    } else {
      fetchData()
    }
  }, [count, category, sortType])

  useEffect(() => {
    const checkScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement
      if (scrollTop + clientHeight >= scrollHeight - 5) {
        if (top.length >= count) {
          setCount(count + 3)
        }
      }
    }
    window.addEventListener("scroll", checkScroll)
    return () => {
      window.removeEventListener("scroll", checkScroll)
    }
  }, [count, top])

  return (
    <>
      <div className="indicators-side">
        <div className="indicators-topic">
          <h1 className="alignC">{category}</h1>
          <div className="indicator-sort">
            <div className="select-category">
              <select onChange={e => setSortType(e.target.value)}>
                <optgroup label="Select a sort type"></optgroup>
                <option value="time">Date</option>
                <option value="views">Views</option>
              </select>
            </div>
          </div>
        </div>
        <div className="indicators-side-indicators">
          {top.map(post => (
            <Link
              to={`/${category}/${post.name.replace(/\s/g, "-")}`}
              key={post.name.replace(/\s/g, "-")}
            >
              <div
                key={post.name}
                className="indicator"
                style={{ width: "auto" }}
              >
                <div className="indicator-img">
                  <img src={post.image} alt={post.name} loading="lazy" />
                </div>
                <div className="indicator-down-side">
                  <div className="indicator-text">
                    <div className="indicator-name">{post.name}</div>
                    <div className="indicator-date">
                      {calculateDate(post.createTime)}
                    </div>
                  </div>
                  <div
                    className="indicator-desc"
                    dangerouslySetInnerHTML={{
                      __html: `${post.description.slice(0, 180)}`,
                    }}
                  ></div>
                  <div className="indicator-btn">
                    <button>Read more</button>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}
