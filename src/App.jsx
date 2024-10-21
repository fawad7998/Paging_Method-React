import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "./Home/home"
import LoadMore from "./LoadMore/loadmore"

function App() {

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/Home" element={<Home />} />
          <Route path="/" element={<LoadMore />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
