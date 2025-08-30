import { useState, useEffect } from "react"
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import L from "leaflet"

// Fix for default markers in React Leaflet
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

// Enhanced marker icons with better styling
const createCustomIcon = (color, size = [32, 32]) => {
  return new L.DivIcon({
    className: 'custom-marker',
    html: `
      <div style="
        width: ${size[0]}px;
        height: ${size[1]}px;
        background: ${color};
        border: 3px solid white;
        border-radius: 50%;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        color: white;
        font-size: 12px;
      ">
        H₂
      </div>
    `,
    iconSize: size,
    iconAnchor: [size[0]/2, size[1]/2],
  })
}

const redIcon = createCustomIcon('#ef4444')
const greenIcon = createCustomIcon('#22c55e')
const blueIcon = createCustomIcon('#3b82f6')
const orangeIcon = createCustomIcon('#f97316')

// Comprehensive India Hydrogen Infrastructure Data
const hydrogenPlants = [
  // Existing Plants (Red markers)
  { id: 1, name: "IOCL Panipat Refinery", city: "Panipat, Haryana", lat: 29.390, lng: 76.963, capacity: "1.3 MTPA", type: "existing", status: "Operational" },
  { id: 2, name: "BPCL Kochi Refinery", city: "Kochi, Kerala", lat: 9.9312, lng: 76.2673, capacity: "0.8 MTPA", type: "existing", status: "Operational" },
  { id: 3, name: "HPCL Visakhapatnam", city: "Visakhapatnam, AP", lat: 17.686, lng: 83.218, capacity: "1.2 MTPA", type: "existing", status: "Operational" },
  { id: 4, name: "Reliance Jamnagar", city: "Jamnagar, Gujarat", lat: 22.258, lng: 71.192, capacity: "2.1 MTPA", type: "existing", status: "Operational" },
  { id: 5, name: "ONGC Hazira", city: "Hazira, Gujarat", lat: 21.170, lng: 72.831, capacity: "0.9 MTPA", type: "existing", status: "Operational" },
]

const potentialSites = [
  // Potential Sites (Green markers)
  { id: 6, name: "Kutch Solar Park", city: "Kutch, Gujarat", lat: 23.733, lng: 69.859, capacity: "5.0 GW", type: "potential", status: "Planned", renewable: "Solar" },
  { id: 7, name: "Ladakh Solar Project", city: "Leh, Ladakh", lat: 34.152, lng: 77.577, capacity: "3.0 GW", type: "potential", status: "Under Development", renewable: "Solar" },
  { id: 8, name: "Rajasthan Wind Farm", city: "Jaisalmer, Rajasthan", lat: 26.911, lng: 70.922, capacity: "2.5 GW", type: "potential", status: "Planned", renewable: "Wind" },
  { id: 9, name: "Tamil Nadu Offshore Wind", city: "Tuticorin, Tamil Nadu", lat: 8.764, lng: 78.134, capacity: "4.0 GW", type: "potential", status: "Feasibility Study", renewable: "Offshore Wind" },
  { id: 10, name: "Andhra Pradesh Solar", city: "Anantapur, AP", lat: 14.6819, lng: 77.6006, capacity: "2.8 GW", type: "potential", status: "Planned", renewable: "Solar" },
]

const researchCenters = [
  // Research & Development Centers (Blue markers)
  { id: 11, name: "IIT Delhi H2 Lab", city: "New Delhi", lat: 28.6139, lng: 77.2090, capacity: "Research", type: "research", status: "Active" },
  { id: 12, name: "CSIR-NCL Pune", city: "Pune, Maharashtra", lat: 18.5204, lng: 73.8567, capacity: "R&D", type: "research", status: "Active" },
  { id: 13, name: "ISRO Hydrogen Center", city: "Bengaluru, Karnataka", lat: 12.9716, lng: 77.5946, capacity: "Space Applications", type: "research", status: "Active" },
  { id: 14, name: "BARC Mumbai", city: "Mumbai, Maharashtra", lat: 19.0760, lng: 72.8777, capacity: "Nuclear H2", type: "research", status: "Active" },
]

const industrialClusters = [
  // Industrial Hydrogen Clusters (Orange markers)
  { id: 15, name: "Dahej Industrial Cluster", city: "Dahej, Gujarat", lat: 21.717, lng: 72.617, capacity: "Industrial Hub", type: "industrial", status: "Operational" },
  { id: 16, name: "Paradip Port Complex", city: "Paradip, Odisha", lat: 20.316, lng: 86.611, capacity: "Port Integration", type: "industrial", status: "Planned" },
  { id: 17, name: "Kandla Port Zone", city: "Kandla, Gujarat", lat: 23.033, lng: 70.217, capacity: "Export Hub", type: "industrial", status: "Under Development" },
]

export default function Mapview({ view }) {
  const [mapLoading, setMapLoading] = useState(true)
  const [activeMarkers, setActiveMarkers] = useState([])

  useEffect(() => {
    // Simulate map loading
    const timer = setTimeout(() => {
      setMapLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    // Update markers based on view
    switch (view) {
      case "plants":
        setActiveMarkers(hydrogenPlants)
        break
      case "potential":
        setActiveMarkers(potentialSites)
        break
      case "research":
        setActiveMarkers(researchCenters)
        break
      case "industrial":
        setActiveMarkers(industrialClusters)
        break
      case "all":
        setActiveMarkers([...hydrogenPlants, ...potentialSites, ...researchCenters, ...industrialClusters])
        break
      default:
        setActiveMarkers([...hydrogenPlants, ...potentialSites])
    }
  }, [view])

  const getMarkerIcon = (type) => {
    switch (type) {
      case "existing":
        return redIcon
      case "potential":
        return greenIcon
      case "research":
        return blueIcon
      case "industrial":
        return orangeIcon
      default:
        return redIcon
    }
  }

  const getMarkerColor = (type) => {
    switch (type) {
      case "existing":
        return "#ef4444"
      case "potential":
        return "#22c55e"
      case "research":
        return "#3b82f6"
      case "industrial":
        return "#f97316"
      default:
        return "#ef4444"
    }
  }

  if (mapLoading) {
    return (
      <div className="map-loading">
        <div className="spinner"></div>
        <div className="map-loading-text">Loading India Hydrogen Map...</div>
      </div>
    )
  }

  return (
    <div className="map-container fade-in">
      <MapContainer 
        center={[22.9734, 78.6569]} 
        zoom={5} 
        className="leaflet-container"
        zoomControl={true}
        scrollWheelZoom={true}
        doubleClickZoom={true}
        dragging={true}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          maxZoom={18}
          minZoom={4}
        />

        {/* Render markers based on active view */}
        {activeMarkers.map((site) => (
          <Marker 
            key={site.id} 
            position={[site.lat, site.lng]} 
            icon={getMarkerIcon(site.type)}
          >
            <Popup className="custom-popup">
              <div style={{ minWidth: '200px' }}>
                <h3 style={{ 
                  color: getMarkerColor(site.type), 
                  marginBottom: '8px',
                  fontSize: '1.1rem',
                  fontWeight: '700'
                }}>
                  {site.name}
                </h3>
                <p style={{ marginBottom: '4px', fontWeight: '600' }}>
                  📍 {site.city}
                </p>
                <p style={{ marginBottom: '4px' }}>
                  ⚡ Capacity: <span style={{ color: '#ff9933', fontWeight: '600' }}>{site.capacity}</span>
                </p>
                <p style={{ marginBottom: '4px' }}>
                  📊 Status: <span style={{ color: '#22c55e', fontWeight: '600' }}>{site.status}</span>
                </p>
                {site.renewable && (
                  <p style={{ marginBottom: '4px' }}>
                    🌱 Source: <span style={{ color: '#3b82f6', fontWeight: '600' }}>{site.renewable}</span>
                  </p>
                )}
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Add circles for major hydrogen production regions */}
        {view === "all" || view === "regions" ? (
          <>
            <Circle
              center={[23.0, 72.0]}
              radius={100000}
              pathOptions={{
                color: '#ff9933',
                fillColor: '#ff9933',
                fillOpacity: 0.1,
                weight: 2
              }}
            >
              <Popup>
                <strong>Gujarat Hydrogen Hub</strong><br/>
                Major industrial hydrogen production region
              </Popup>
            </Circle>
            
            <Circle
              center={[28.7, 77.1]}
              radius={80000}
              pathOptions={{
                color: '#22c55e',
                fillColor: '#22c55e',
                fillOpacity: 0.1,
                weight: 2
              }}
            >
              <Popup>
                <strong>Delhi NCR Hydrogen Corridor</strong><br/>
                Emerging hydrogen infrastructure hub
              </Popup>
            </Circle>
          </>
        ) : null}
      </MapContainer>
    </div>
  )
}