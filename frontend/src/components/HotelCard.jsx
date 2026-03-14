export default function FlightCard({flight}){

return(

<div className="card">

<h3>{flight.airline}</h3>

<p>Price: ${flight.price}</p>

<p>Predicted: ${flight.predicted_price}</p>

<p className="recommend">{flight.recommendation}</p>

</div>

)

}