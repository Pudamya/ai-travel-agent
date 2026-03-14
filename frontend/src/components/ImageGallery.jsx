export default function HotelCard({hotel}){

return(

<div className="card">

<h3>{hotel.name}</h3>

<p>Price per night: ${hotel.price}</p>

</div>

)

}