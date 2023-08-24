import React, { useState, useEffect } from "react"
import getPostsByViews from "../db/postOperation/getPostsByViews"
import calculateDate from "./utils/calculateDate"
import { Link } from "react-router-dom"

export default function HomeIndicators() {
  const [top, setTop] = useState([])
  async function fetchData() {
    const topIndicators = await getPostsByViews(3, "Indicators")
    setTop(topIndicators)
  }
  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="indicators-bg">
      <h1>Most Popular Indicators</h1>
      <div className="indicators">
        {top.map(indicator => (
          <Link to={`/Indicators/${indicator.name}`} key={indicator.name}>
            <div key={indicator.name} className="indicator">
              <div className="indicator-img">
                <img src={indicator.image} alt={indicator.name} />
              </div>
              <div className="indicator-text">
                <div className="indicator-name">{indicator.name}</div>
                <div className="indicator-date">
                  {calculateDate(indicator.createTime)}
                </div>
              </div>
              <div
                className="indicator-desc"
                dangerouslySetInnerHTML={{
                  __html: `${indicator.description.slice(0, 110)}...`,
                }}
              ></div>
              <div className="indicator-btn">
                <button>Read more</button>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className="all-indicators-btn">
        <Link to="/Indicators">
          <button className="all-indicators">See the rest of the indicators</button>
        </Link>
      </div>
    </div>
  )
}
