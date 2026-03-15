import { useLocation } from "react-router-dom"

export default function Results(){

const {state} = useLocation()

if(!state) return <div>No results</div>

return(

<div style={{padding:40}}>

<h2>Weather</h2>
<pre>{JSON.stringify(state.weather,null,2)}</pre>

<h2>Flights</h2>
<pre>{JSON.stringify(state.flights,null,2)}</pre>

<h2>Hotels</h2>
<pre>{JSON.stringify(state.hotels,null,2)}</pre>

<h2>AI Plan</h2>
<pre>{state.plan}</pre>

</div>

)

}