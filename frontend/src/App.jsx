import { BrowserRouter, Routes, Route } from "react-router-dom"

import Home from "./pages/Home"
import Planner from "./pages/Planner"
import Results from "./pages/Results"

export default function App(){

return(

<BrowserRouter>

<Routes>

<Route path="/" element={<Home/>} />

<Route path="/planner" element={<Planner/>} />

<Route path="/results" element={<Results/>} />

</Routes>

</BrowserRouter>

)

}