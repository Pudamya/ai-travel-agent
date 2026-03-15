import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css"

export default function MapView({ places = [] }) {
  const validPlaces = places.filter(
    (p) => typeof p.lat === "number" && typeof p.lng === "number"
  )

  const center =
    validPlaces.length > 0
      ? [validPlaces[0].lat, validPlaces[0].lng]
      : [7.8731, 80.7718]

  return (
    <div className="mapShell">
      <MapContainer center={center} zoom={validPlaces.length ? 11 : 6} style={{ height: "100%", width: "100%" }}>
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {validPlaces.map((p, i) => (
          <Marker key={i} position={[p.lat, p.lng]}>
            <Popup>{p.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}