export default function HotelCard({ hotel }) {
  return (
    <div className="card hotelCard premiumCard">
      <div className="cardTopRow">
        <h3>{hotel.name || "Hotel"}</h3>
        <span className="pill pill-green">Stay</span>
      </div>

      <p className="mutedText">{hotel.address || "Comfortable location for your trip"}</p>

      <div className="priceGrid">
        <div className="priceBox">
          <span className="label">Rating</span>
          <strong>⭐ {hotel.rating || 4.0}</strong>
        </div>
        <div className="priceBox">
          <span className="label">Estimated Price</span>
          <strong>${hotel.price || "--"}</strong>
        </div>
      </div>
    </div>
  )
}