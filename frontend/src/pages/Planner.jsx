import { useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"

export default function Planner(){

const navigate = useNavigate()

const [from,setFrom] = useState("")
const [to,setTo] = useState("")
const [days,setDays] = useState(2)
const [loading,setLoading] = useState(false)

async function generate(){

if(!from || !to){
alert("Please fill all fields")
return
}

try{

setLoading(true)

const res = await axios.post(
"http://localhost:3000/travel",
{
from,
to,
days:Number(days)
}
)

navigate("/results",{state:res.data})

}catch(e){

alert("Backend not responding")

}

setLoading(false)

}

return(

<div className="planner">

<h1>Plan Your Trip</h1>

<div className="form">

<input
placeholder="From (City)"
value={from}
onChange={e=>setFrom(e.target.value)}
/>

<input
placeholder="Destination"
value={to}
onChange={e=>setTo(e.target.value)}
/>

<input
type="number"
min="1"
value={days}
onChange={e=>setDays(e.target.value)}
/>

<button onClick={generate}>

{loading ? "Generating..." : "Generate Plan"}

</button>

</div>

</div>

)

}