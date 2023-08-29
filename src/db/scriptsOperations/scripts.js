import React, { useEffect, useState } from "react"
import getPostsByDate from "../postOperation/getPostsByDate"
import getPostsByViews from "../postOperation/getPostsByViews"
import getPostsByDownloads from "../postOperation/getPostByDownloads"
import calculateDate from "../../components/utils/calculateDate"
import { Link } from "react-router-dom"

export default function Scripts() {
  const [top, setTop] = useState([])
  const [count, setCount] = useState(6)
  const [sortType, setSortType] = useState("time");
  async function fetchData() {
    if (sortType === "time"){
      const topPosts = await getPostsByDate(count, "Scripts")
      setTop(topPosts)
    } else if(sortType === "views"){
      const topPosts = await getPostsByViews(count, "Scripts")
      setTop(topPosts)
    }else if(sortType === "downloads"){
      const topPosts = await getPostsByDownloads(count, "Scripts")
      setTop(topPosts)
    }
  }
  useEffect(() => {
    fetchData()
  }, [count, sortType])
  useEffect(() => {
    const checkScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = document.documentElement
      if (scrollTop + clientHeight >= scrollHeight - 5) {
        if (top.length >= count) {
          setCount(count + 3)
        }
      }
    }
    window.addEventListener('scroll', checkScroll)
    return () => {
      window.removeEventListener('scroll', checkScroll)
    }
  }, [count, top])
  return (
    <div className="indicators-side">
              <div className="indicators-topic">
          <h1 className="alignC">Scripts</h1>
          <div className="indicator-sort">
            <div className="select-category">
              <select onChange={e => setSortType(e.target.value)}>
                <optgroup label="Select a sort type"></optgroup>
                <option value="time">Date</option>
                <option value="views">Views</option>
                <option value="downloads">Downloads</option>
              </select>
            </div>
          </div>
        </div>
      <div className="indicators-side-indicators">
        {top.map(script => (
          <div
            key={script.name}
            className="indicator"
            style={{ width: "auto", paddingBottom: "10px" }}
          >
            <div className="indicator-img">
              <img src={script.image} alt={script.name} />
            </div>
            <div className="indicator-text">
              <div className="indicator-name">{script.name}</div>
              <div className="indicator-date">
                {calculateDate(script.createTime)}
              </div>
            </div>
            <div
              className="indicator-desc"
              dangerouslySetInnerHTML={{
                __html: `${script.description.slice(0, 180)}`,
              }}
            ></div>
            <div className="script-btn">
              <Link
                to={`/Scripts/${script.name.replace(/\s/g, "-")}`}
                key={script.name.replace(/\s/g, "-")}
              >
                <button>Find out more</button>
              </Link>
              <a href={script.file} target="_blank" rel="noopener noreferrer">
                <button>Download</button>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
