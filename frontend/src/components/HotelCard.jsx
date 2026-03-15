export default function HotelCard({ hotel }) {

return (

<div className="card hotelCard">

<h3>{hotel.name}</h3>

<p><strong>Rating:</strong> ⭐ {hotel.rating}</p>

<p><strong>Price per night:</strong> ${hotel.price}</p>

</div>

)

}