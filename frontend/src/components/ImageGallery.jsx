export default function HotelCard({hotel}){

return(

<div className="card hotel">

<h3>{hotel.name}</h3>

<p>Price per night: ${hotel.price}</p>

<p>Rating: {hotel.rating || "4.2"}</p>

</div>

)

}