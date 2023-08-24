import React from "react"
import ReactDOM from "react-dom/client"
import App from "./components/app"
import { BrowserRouter } from "react-router-dom"

const root = ReactDOM.createRoot(document.getElementById("root"))
root.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
)

// pisz po polsku 
// zawsze pisze w react 
// zawsze używaj najnowszych wersji bibliotek 
// nie stawiaj średników na końcu linijek 
