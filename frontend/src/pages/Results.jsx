import MapView from "../components/MapView"
import HotelCard from "../components/HotelCard"
import FlightCard from "../components/FlightCard"
import ItineraryTimeline from "../components/ItineraryTimeline"
import AgentPanel from "../components/AgentPanel"
import ImageGallery from "../components/ImageGallery"

export default function Results(){

const trip = JSON.parse(localStorage.getItem("trip"))

return(

<div>

<h1>Trip Plan</h1>

<MapView places={trip.places}/>

<ImageGallery image={trip.image}/>

<ItineraryTimeline plan={trip.plan}/>

{trip.hotels.map(h=><HotelCard hotel={h}/>)}

{trip.flights.map(f=><FlightCard flight={f}/>)}

<AgentPanel/>

</div>

)

}