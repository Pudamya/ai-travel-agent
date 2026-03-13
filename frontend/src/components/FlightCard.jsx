export default function FlightCard({flight}){

return(

<div>

<h3>{flight.airline}</h3>

<p>{flight.price}</p>

<p>{flight.duration}</p>

</div>

)

}