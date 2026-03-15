import { useLocation } from "react-router-dom"

import FlightCard from "../components/FlightCard"
import HotelCard from "../components/HotelCard"
import AgentPanel from "../components/AgentPanel"
import MapView from "../components/MapView"
import ItineraryTimeline from "../components/ItineraryTimeline"

export default function Results(){

const {state} = useLocation()

if(!state) return <div>No results</div>

const {weather,flights,hotels,plan,places} = state

return(

<div className="results">

<h1>Trip Results</h1>

<AgentPanel/>

<h2>Weather</h2>
<p>{weather?.description} | {weather?.temp}°C</p>

<h2>Flights</h2>

<div className="cards">

{flights?.map((f,i)=>(

<FlightCard key={i} flight={f}/>

))}

</div>

<h2>Hotels</h2>

<div className="cards">

{hotels?.map((h,i)=>(

<HotelCard key={i} hotel={h}/>

))}

</div>

<h2>Places Map</h2>

<MapView places={places}/>

<h2>AI Itinerary</h2>

<ItineraryTimeline plan={plan}/>

</div>

)

}