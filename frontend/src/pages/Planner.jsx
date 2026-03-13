import { useState } from "react"
import axios from "axios"

export default function Planner(){

const [form,setForm] = useState({})

const submit = async()=>{

const res = await axios.post(
"http://localhost:3000/plan-trip",
form
)

localStorage.setItem("trip",JSON.stringify(res.data))

window.location="/results"

}

return(

<div>

<h2>Plan Your Trip</h2>

<input placeholder="From" onChange={e=>setForm({...form,from:e.target.value})}/>

<input placeholder="Destination" onChange={e=>setForm({...form,to:e.target.value})}/>

<input placeholder="Travelers" onChange={e=>setForm({...form,count:e.target.value})}/>

<button onClick={submit}>Generate Plan</button>

</div>

)

}