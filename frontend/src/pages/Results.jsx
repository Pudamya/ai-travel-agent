import { useLocation } from "react-router-dom"
import FlightCard from "../components/FlightCard"
import HotelCard from "../components/HotelCard"
import ImageGallery from "../components/ImageGallery"
import ItineraryTimeline from "../components/ItineraryTimeline"
import AgentPanel from "../components/AgentPanel"

export default function Results(){

const {state} = useLocation()

if(!state) return <div>No results</div>

return(

<div className="results">

<AgentPanel/>

<h2>Flights</h2>

<div className="cards">
{state.flights.map((f,i)=>(
<FlightCard key={i} flight={f}/>
))}
</div>

<h2>Hotels</h2>

<div className="cards">
{state.hotels.map((h,i)=>(
<HotelCard key={i} hotel={h}/>
))}
</div>

<h2>Travel Images</h2>

<ImageGallery image={state.image}/>

<h2>Itinerary</h2>

<ItineraryTimeline plan={state.plan}/>

</div>

)

}