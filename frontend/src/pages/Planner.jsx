import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export default function Planner(){

const navigate = useNavigate()

const [from,setFrom] = useState("")
const [to,setTo] = useState("")
const [days,setDays] = useState(3)

async function generate(){

const res = await axios.post("http://localhost:3000/travel",{
from,
to,
days
})

navigate("/results",{state:res.data})

}

return(

<div className="planner">

<h1>Plan Your Trip</h1>

<div className="form">

<input
placeholder="From"
value={from}
onChange={(e)=>setFrom(e.target.value)}
/>

<input
placeholder="Destination"
value={to}
onChange={(e)=>setTo(e.target.value)}
/>

<input
type="number"
value={days}
onChange={(e)=>setDays(e.target.value)}
/>

<button onClick={generate}>
Generate AI Plan
</button>

</div>

</div>

)

}