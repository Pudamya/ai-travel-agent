export default function FlightCard({ flight }) {

return (

<div className="card flightCard">

<h3>{flight.airline}</h3>

<p><strong>Flight:</strong> {flight.flight}</p>

<p><strong>Route:</strong> {flight.departure} → {flight.arrival}</p>

<p><strong>Price:</strong> ${flight.price}</p>

<p><strong>Predicted Price:</strong> ${flight.predicted_price}</p>

<p className="recommend">

{flight.recommendation}

</p>

</div>

)

}