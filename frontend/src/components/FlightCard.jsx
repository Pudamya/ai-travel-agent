export default function FlightCard({ flight }) {
  const currentFare = Math.round(Number(flight.price || 0))
  const predictedFare = Math.round(Number(flight.predicted_price || 0))
  const difference = predictedFare - currentFare
  const isCheaperPrediction = difference < 0

  return (
    <div className="card flightCard premiumCard">
      <div className="cardTopRow">
        <h3>{flight.airline || "Airline"}</h3>
        <span className="pill pill-indigo">{flight.flight || "Flight"}</span>
      </div>

      <p className="mutedText">
        {flight.departure || "Origin"} → {flight.arrival || "Destination"}
      </p>

      <div className="priceGrid">
        <div className="priceBox">
          <span className="label">Estimated Fare</span>
          <strong>${currentFare}</strong>
        </div>
        <div className="priceBox">
          <span className="label">Predicted Fare</span>
          <strong>${predictedFare}</strong>
        </div>
      </div>

      <div className="insightBox">
        <span className="label">Price Insight</span>
        <strong>
          {difference === 0
            ? "Model expects similar pricing"
            : isCheaperPrediction
            ? `Model predicts about $${Math.abs(difference)} lower`
            : `Model predicts about $${Math.abs(difference)} higher`}
        </strong>
      </div>

      <p className={`recommend ${flight.recommendation === "Book now" ? "successText" : "warningText"}`}>
        {flight.recommendation || "Recommendation unavailable"}
      </p>
    </div>
  )
}