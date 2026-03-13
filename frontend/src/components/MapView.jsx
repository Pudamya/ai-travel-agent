export default function MapView({places}){

return(

<div>

<h3>Map</h3>

{places.map(p=>(

<div key={p.place_id}>{p.name}</div>

))}

</div>

)

}