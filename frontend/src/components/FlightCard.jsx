export default function FlightCard({flight}){

return(

<div className="card flightCard">

<h3>{flight.airline}</h3>

<p>Flight: {flight.flight}</p>

<p>
{flight.departure} → {flight.arrival}
</p>

<p>Price: ${flight.price}</p>

<p>Predicted: ${flight.predicted_price}</p>

<p className="recommend">
{flight.recommendation}
</p>

</div>

)

}