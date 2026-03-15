export default function HotelCard({hotel}){

return(

<div className="card hotelCard">

<h3>{hotel.name}</h3>

<p>Rating ⭐ {hotel.rating}</p>

<p>Price per night: ${hotel.price}</p>

</div>

)

}