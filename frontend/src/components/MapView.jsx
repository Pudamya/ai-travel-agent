import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css"

export default function MapView({places}){

const center=[7.8731,80.7718] // Sri Lanka default

return(

<div style={{height:"400px",marginTop:"20px"}}>

<MapContainer center={center} zoom={6} style={{height:"100%"}}>

<TileLayer
url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
/>

{places?.map((p,i)=>(
<Marker key={i} position={[p.lat,p.lng]}>
<Popup>{p.name}</Popup>
</Marker>
))}

</MapContainer>

</div>

)

}