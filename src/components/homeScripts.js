import React, { useState, useEffect } from "react"
import getHomeScripts from "../db/scriptsOperations/getHomeScripts"
import { Link } from "react-router-dom"

export default function HomeScripts() {
  const [top, setTop] = useState([])
  async function fetchData() {
    const topIndicators = await getHomeScripts(3)
    setTop(topIndicators)
  }
  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="scripts-bg">
      <h1>Scripts for everyone</h1>
      <div className="scripts">
        {top.map(script => (
          <div
            key={script.name}
            className="script"
            style={{ paddingBottom: "15px" }}
          >
            <div className="script-name">{script.name}</div>
            <div className="script-btn">
              <Link to={`/Scripts/${script.name}`}>
                <button>Find out more</button>
              </Link>
              <a href={script.file} target="_blank" rel="noopener noreferrer" >
                <button>Dowlnoad</button>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
