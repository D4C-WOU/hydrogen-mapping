import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import L from "leaflet"

// Red & Blue marker icons
const redIcon = new L.Icon({
  iconUrl: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
  iconSize: [32, 32],
})
const blueIcon = new L.Icon({
  iconUrl: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
  iconSize: [32, 32],
})

// Example Hydrogen Plants (India)
const plants = [
  { id: 1, name: "Plant 1 - Delhi", city: "Delhi", lat: 28.61, lng: 77.20, capacity: "500 MW" },
  { id: 2, name: "Plant 2 - Mumbai", city: "Mumbai", lat: 19.07, lng: 72.87, capacity: "300 MW" },
  { id: 3, name: "Plant 3 - Chennai", city: "Chennai", lat: 13.08, lng: 80.27, capacity: "250 MW" },
  { id: 4, name: "Plant 4 - Bengaluru", city: "Bengaluru", lat: 12.97, lng: 77.59, capacity: "400 MW" },
]

export default function Mapview({ view }) {
  return (
    <div className="map-container">
      <MapContainer center={[22.97, 78.65]} zoom={5} className="map-container">
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />

        {view === "plants" &&
          plants.map((plant) => (
            <Marker key={plant.id} position={[plant.lat, plant.lng]} icon={redIcon}>
              <Popup>
                <strong>{plant.name}</strong><br />
                {plant.city}<br />
                Capacity: {plant.capacity}
              </Popup>
            </Marker>
          ))}

        {view === "predictions" &&
          plants.map((plant) => (
            <Marker key={plant.id} position={[plant.lat, plant.lng]} icon={blueIcon}>
              <Popup>
                Predicted Site:<br />
                <strong>{plant.name}</strong><br />
                {plant.city}
              </Popup>
            </Marker>
          ))}
      </MapContainer>
    </div>
  )
}
