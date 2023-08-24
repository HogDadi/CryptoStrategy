import React, { useEffect, useState } from "react"
import searchEngine from "../db/search/searchEngine"
import { Link } from "react-router-dom"
import { set } from "firebase/database"

export default function Search(props) {
  const [indicators, setIndicators] = useState([])
  const [scripts, setScripts] = useState([])
  const [instructions, setInstructions] = useState([])
  const [strategies, setStrategies] = useState([])
  const search = props.search
  const setSearch = props.setSearch

  const fetchData = async () => {
    const categories = ["Indicators", "Scripts", "Strategies", "Instructions"]
    const setters = [setIndicators, setScripts, setStrategies, setInstructions]

    for (let i = 0; i < categories.length; i++) {
      const result = await searchEngine(3, categories[i], search)
      if (result === undefined) {
        setters[i]([])
      } else {
        setters[i](result)
        console.log(result)
      }
    }
  }
  useEffect(() => {
    fetchData()
  }, [search])

  const reset = () => {
    setSearch("")
    document.querySelector(".searcher").value = ""
  }

  return (
    <>
      {(indicators.length !== 0 ||
        scripts.length !== 0 ||
        instructions.length !== 0 ||
        strategies.length !== 0) && (
        <div className="table">
          {indicators.length !== 0 && (
            <>
              {indicators.map((indicator, index) => (
                <Link
                  key={`${index}Indicators`}
                  onClick={reset}
                  to={`/Indicators/${indicator.name}`}
                >
                  <div className="search-result">
                    <div className="rearch-resut-category">Indicator</div>
                    <div className="search-post">{indicator.name}</div>
                  </div>
                </Link>
              ))}
            </>
          )}

          {scripts.length !== 0 && (
            <>
              {scripts.map((script, index) => (
                <Link
                  key={`${index}Scripts`}
                  onClick={reset}
                  to={`/Scripts/${script.name}`}
                >
                  <div className="search-result">
                    <div className="rearch-resut-category">Script</div>
                    <div className="search-post">{script.name}</div>
                  </div>
                </Link>
              ))}
            </>
          )}

          {instructions.length !== 0 && (
            <>
              {instructions.map((instruction, index) => (
                <Link
                  key={`${index}Instructions`}
                  onClick={reset}
                  to={`/Instructions/${instruction.name}`}
                >
                  <div className="search-result">
                    <div className="rearch-resut-category">Instruction</div>
                    <div className="search-post">{instruction.name}</div>
                  </div>
                </Link>
              ))}
            </>
          )}

          {strategies.length !== 0 && (
            <>
              {strategies.map((strategy, index) => (
                <Link
                  key={`${index}Strategies`}
                  onClick={reset}
                  to={`/Strategies/${strategy.name}`}
                >
                  <div className="search-result">
                    <div className="rearch-resut-category">Strategy</div>
                    <div className="search-post">{strategy.name}</div>
                  </div>
                </Link>
              ))}
            </>
          )}
        </div>
      )}{" "}
      {indicators.length === 0 &&
        scripts.length === 0 &&
        instructions.length === 0 &&
        strategies.length === 0 && (
          <div className="noContent">There are no results for your search</div>
        )}
    </>
  )
}

//? TODO zrobić system wyświetlania tego
//? TODO zrobic powiadomienie że nie istanieje taka rezecz w naszej bazie danych jeśli nie ma wpisywanej przez użytkownika frazy
