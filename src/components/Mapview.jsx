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

// Enhanced marker icons with better styling and clear differentiation
const createCustomIcon = (color, symbol = "H₂", size = [36, 36]) => {
  return new L.DivIcon({
    className: 'custom-marker',
    html: `
      <div style="
        width: ${size[0]}px;
        height: ${size[1]}px;
        background: ${color};
        border: 3px solid white;
        border-radius: 50%;
        box-shadow: 0 4px 12px rgba(0,0,0,0.4);
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        color: white;
        font-size: 11px;
        font-family: 'Inter', sans-serif;
        text-shadow: 0 1px 2px rgba(0,0,0,0.5);
      ">
        ${symbol}
      </div>
    `,
    iconSize: size,
    iconAnchor: [size[0]/2, size[1]/2],
  })
}

// Distinct icons for different site types
const existingIcon = createCustomIcon('#ef4444', '🏭')  // Red for existing plants
const potentialIcon = createCustomIcon('#22c55e', '🌱')  // Green for potential sites
const optimalIcon = createCustomIcon('#8b5cf6', '⭐')   // Purple for optimal locations
const researchIcon = createCustomIcon('#3b82f6', '🔬')  // Blue for research centers
const industrialIcon = createCustomIcon('#f97316', '🏗️') // Orange for industrial

// Comprehensive India Hydrogen Infrastructure Data with enhanced analysis
const hydrogenPlants = [
  // Existing Plants (Red markers) - Based on actual operational facilities
  { 
    id: 1, 
    name: "IOCL Panipat Refinery", 
    city: "Panipat, Haryana", 
    lat: 29.390, 
    lng: 76.963, 
    capacity: "1.3 MTPA", 
    type: "existing", 
    status: "Operational",
    cost: 95,
    carbon: 25,
    logistics: "Excellent highway and rail connectivity"
  },
  { 
    id: 2, 
    name: "BPCL Kochi Refinery", 
    city: "Kochi, Kerala", 
    lat: 9.9312, 
    lng: 76.2673, 
    capacity: "0.8 MTPA", 
    type: "existing", 
    status: "Operational",
    cost: 88,
    carbon: 22,
    logistics: "Major port access"
  },
  { 
    id: 3, 
    name: "HPCL Visakhapatnam", 
    city: "Visakhapatnam, AP", 
    lat: 17.686, 
    lng: 83.218, 
    capacity: "1.2 MTPA", 
    type: "existing", 
    status: "Operational",
    cost: 92,
    carbon: 28,
    logistics: "Port and industrial hub"
  },
  { 
    id: 4, 
    name: "Reliance Jamnagar", 
    city: "Jamnagar, Gujarat", 
    lat: 22.258, 
    lng: 71.192, 
    capacity: "2.1 MTPA", 
    type: "existing", 
    status: "Operational",
    cost: 85,
    carbon: 30,
    logistics: "World's largest refinery complex"
  },
  { 
    id: 5, 
    name: "ONGC Hazira", 
    city: "Hazira, Gujarat", 
    lat: 21.170, 
    lng: 72.831, 
    capacity: "0.9 MTPA", 
    type: "existing", 
    status: "Operational",
    cost: 90,
    carbon: 26,
    logistics: "Petrochemical hub with port access"
  },
]

const potentialSites = [
  // Potential Sites (Green markers) - Future development locations
  { 
    id: 6, 
    name: "Kutch Solar Park", 
    city: "Kutch, Gujarat", 
    lat: 23.733, 
    lng: 69.859, 
    capacity: "5.0 GW", 
    type: "potential", 
    status: "Planned", 
    renewable: "Solar",
    cost: 75,
    carbon: 8,
    logistics: "Remote but excellent solar potential"
  },
  { 
    id: 7, 
    name: "Ladakh Solar Project", 
    city: "Leh, Ladakh", 
    lat: 34.152, 
    lng: 77.577, 
    capacity: "3.0 GW", 
    type: "potential", 
    status: "Under Development", 
    renewable: "Solar",
    cost: 110,
    carbon: 5,
    logistics: "Remote high-altitude location"
  },
  { 
    id: 8, 
    name: "Rajasthan Wind Farm", 
    city: "Jaisalmer, Rajasthan", 
    lat: 26.911, 
    lng: 70.922, 
    capacity: "2.5 GW", 
    type: "potential", 
    status: "Planned", 
    renewable: "Wind",
    cost: 82,
    carbon: 12,
    logistics: "Good rail connectivity"
  },
  { 
    id: 9, 
    name: "Tamil Nadu Offshore Wind", 
    city: "Tuticorin, Tamil Nadu", 
    lat: 8.764, 
    lng: 78.134, 
    capacity: "4.0 GW", 
    type: "potential", 
    status: "Feasibility Study", 
    renewable: "Offshore Wind",
    cost: 95,
    carbon: 10,
    logistics: "Excellent port facilities"
  },
  { 
    id: 10, 
    name: "Andhra Pradesh Solar Hub", 
    city: "Anantapur, AP", 
    lat: 14.6819, 
    lng: 77.6006, 
    capacity: "2.8 GW", 
    type: "potential", 
    status: "Planned", 
    renewable: "Solar",
    cost: 78,
    carbon: 15,
    logistics: "Good highway access"
  },
]

// Optimal locations based on cost and carbon analysis
const optimalSites = [
  {
    id: 11,
    name: "Singrauli Green Zone",
    city: "Singrauli, MP",
    lat: 24.200,
    lng: 82.650,
    capacity: "3.5 GW",
    type: "optimal",
    status: "Recommended",
    renewable: "Solar + Wind Hybrid",
    cost: 65, // Lowest cost
    carbon: 6, // Very low carbon
    logistics: "Coal belt transition zone with existing infrastructure",
    analysis: "Most cost-effective location"
  },
  {
    id: 12,
    name: "Rewa Ultra Mega Solar",
    city: "Rewa, MP",
    lat: 24.536,
    lng: 81.303,
    capacity: "4.2 GW",
    type: "optimal",
    status: "Recommended",
    renewable: "Solar",
    cost: 68,
    carbon: 4, // Lowest carbon footprint
    logistics: "Existing solar infrastructure",
    analysis: "Lowest carbon emission potential"
  },
  {
    id: 13,
    name: "Bhavnagar Green Port",
    city: "Bhavnagar, Gujarat",
    lat: 21.764,
    lng: 72.151,
    capacity: "2.8 GW",
    type: "optimal",
    status: "Recommended",
    renewable: "Solar + Wind",
    cost: 72,
    carbon: 7,
    logistics: "Strategic port location for export",
    analysis: "Optimal cost-carbon balance"
  }
]

const researchCenters = [
  // Research & Development Centers (Blue markers)
  { 
    id: 14, 
    name: "IIT Delhi H2 Lab", 
    city: "New Delhi", 
    lat: 28.6139, 
    lng: 77.2090, 
    capacity: "Research", 
    type: "research", 
    status: "Active",
    cost: 0,
    carbon: 0,
    logistics: "Academic research facility"
  },
  { 
    id: 15, 
    name: "CSIR-NCL Pune", 
    city: "Pune, Maharashtra", 
    lat: 18.5204, 
    lng: 73.8567, 
    capacity: "R&D", 
    type: "research", 
    status: "Active",
    cost: 0,
    carbon: 0,
    logistics: "Industrial research hub"
  },
  { 
    id: 16, 
    name: "ISRO Hydrogen Center", 
    city: "Bengaluru, Karnataka", 
    lat: 12.9716, 
    lng: 77.5946, 
    capacity: "Space Applications", 
    type: "research", 
    status: "Active",
    cost: 0,
    carbon: 0,
    logistics: "Aerospace research facility"
  },
]

const industrialClusters = [
  // Industrial Hydrogen Clusters (Orange markers)
  { 
    id: 17, 
    name: "Dahej Industrial Cluster", 
    city: "Dahej, Gujarat", 
    lat: 21.717, 
    lng: 72.617, 
    capacity: "Industrial Hub", 
    type: "industrial", 
    status: "Operational",
    cost: 88,
    carbon: 35,
    logistics: "Major petrochemical hub"
  },
  { 
    id: 18, 
    name: "Paradip Port Complex", 
    city: "Paradip, Odisha", 
    lat: 20.316, 
    lng: 86.611, 
    capacity: "Port Integration", 
    type: "industrial", 
    status: "Planned",
    cost: 85,
    carbon: 28,
    logistics: "Major port with coal handling"
  },
  { 
    id: 19, 
    name: "Kandla Port Zone", 
    city: "Kandla, Gujarat", 
    lat: 23.033, 
    lng: 70.217, 
    capacity: "Export Hub", 
    type: "industrial", 
    status: "Under Development",
    cost: 80,
    carbon: 32,
    logistics: "India's largest port by cargo volume"
  },
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
      case "optimal":
        setActiveMarkers(optimalSites)
        break
      case "research":
        setActiveMarkers(researchCenters)
        break
      case "industrial":
        setActiveMarkers(industrialClusters)
        break
      case "all":
        setActiveMarkers([...hydrogenPlants, ...potentialSites, ...optimalSites, ...researchCenters, ...industrialClusters])
        break
      default:
        setActiveMarkers([...hydrogenPlants, ...potentialSites, ...optimalSites])
    }
  }, [view])

  const getMarkerIcon = (type) => {
    switch (type) {
      case "existing":
        return existingIcon
      case "potential":
        return potentialIcon
      case "optimal":
        return optimalIcon
      case "research":
        return researchIcon
      case "industrial":
        return industrialIcon
      default:
        return existingIcon
    }
  }

  const getMarkerColor = (type) => {
    switch (type) {
      case "existing":
        return "#ef4444"
      case "potential":
        return "#22c55e"
      case "optimal":
        return "#8b5cf6"
      case "research":
        return "#3b82f6"
      case "industrial":
        return "#f97316"
      default:
        return "#ef4444"
    }
  }

  const getAnalysisInfo = (site) => {
    if (site.type === "optimal") {
      if (site.cost <= 70) {
        return "🏆 Most Cost-Effective Location"
      } else if (site.carbon <= 6) {
        return "🌿 Lowest Carbon Footprint"
      } else {
        return "⚖️ Optimal Cost-Carbon Balance"
      }
    }
    return ""
  }

  if (mapLoading) {
    return (
      <div className="map-loading">
        <div className="spinner"></div>
        <div className="map-loading-text">Loading India Hydrogen Infrastructure Map...</div>
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
        style={{ height: '100%', width: '100%' }}
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
            <Popup className="custom-popup" maxWidth={300}>
              <div style={{ minWidth: '250px', fontFamily: 'Inter, sans-serif' }}>
                <h3 style={{ 
                  color: getMarkerColor(site.type), 
                  marginBottom: '12px',
                  fontSize: '1.1rem',
                  fontWeight: '700',
                  borderBottom: `2px solid ${getMarkerColor(site.type)}`,
                  paddingBottom: '8px'
                }}>
                  {site.name}
                </h3>
                
                {getAnalysisInfo(site) && (
                  <div style={{
                    background: 'rgba(139, 92, 246, 0.1)',
                    padding: '8px 12px',
                    borderRadius: '8px',
                    marginBottom: '12px',
                    border: '1px solid rgba(139, 92, 246, 0.3)',
                    fontSize: '0.875rem',
                    fontWeight: '600',
                    color: '#8b5cf6'
                  }}>
                    {getAnalysisInfo(site)}
                  </div>
                )}
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <p style={{ marginBottom: '4px', fontWeight: '600', fontSize: '0.9rem' }}>
                    📍 <span style={{ color: '#A1D1B1' }}>{site.city}</span>
                  </p>
                  <p style={{ marginBottom: '4px', fontSize: '0.9rem' }}>
                    ⚡ Capacity: <span style={{ color: '#A1D1B1', fontWeight: '600' }}>{site.capacity}</span>
                  </p>
                  <p style={{ marginBottom: '4px', fontSize: '0.9rem' }}>
                    📊 Status: <span style={{ color: '#22c55e', fontWeight: '600' }}>{site.status}</span>
                  </p>
                  
                  {site.renewable && (
                    <p style={{ marginBottom: '4px', fontSize: '0.9rem' }}>
                      🌱 Source: <span style={{ color: '#3b82f6', fontWeight: '600' }}>{site.renewable}</span>
                    </p>
                  )}
                  
                  {site.cost > 0 && (
                    <div style={{ 
                      marginTop: '8px', 
                      padding: '8px', 
                      background: 'rgba(161, 209, 177, 0.1)', 
                      borderRadius: '6px',
                      fontSize: '0.8rem'
                    }}>
                      <p style={{ marginBottom: '2px' }}>
                        💰 Cost Index: <span style={{ fontWeight: '600', color: site.cost <= 70 ? '#22c55e' : site.cost <= 85 ? '#f59e0b' : '#ef4444' }}>{site.cost}/100</span>
                      </p>
                      <p style={{ marginBottom: '2px' }}>
                        🌿 Carbon Index: <span style={{ fontWeight: '600', color: site.carbon <= 10 ? '#22c55e' : site.carbon <= 20 ? '#f59e0b' : '#ef4444' }}>{site.carbon}/100</span>
                      </p>
                      <p style={{ fontSize: '0.75rem', color: '#94a3b8', marginTop: '4px' }}>
                        🚛 {site.logistics}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Add circles for major hydrogen production regions */}
        {(view === "all" || view === "regions") && (
          <>
            <Circle
              center={[23.0, 72.0]}
              radius={100000}
              pathOptions={{
                color: '#A1D1B1',
                fillColor: '#A1D1B1',
                fillOpacity: 0.15,
                weight: 2
              }}
            >
              <Popup>
                <div style={{ fontFamily: 'Inter, sans-serif' }}>
                  <strong style={{ color: '#A1D1B1' }}>Gujarat Hydrogen Hub</strong><br/>
                  <span style={{ fontSize: '0.875rem', color: '#cbd5e1' }}>
                    Major industrial hydrogen production region with excellent port connectivity
                  </span>
                </div>
              </Popup>
            </Circle>
            
            <Circle
              center={[28.7, 77.1]}
              radius={80000}
              pathOptions={{
                color: '#22c55e',
                fillColor: '#22c55e',
                fillOpacity: 0.15,
                weight: 2
              }}
            >
              <Popup>
                <div style={{ fontFamily: 'Inter, sans-serif' }}>
                  <strong style={{ color: '#22c55e' }}>Delhi NCR Hydrogen Corridor</strong><br/>
                  <span style={{ fontSize: '0.875rem', color: '#cbd5e1' }}>
                    Emerging hydrogen infrastructure hub with research facilities
                  </span>
                </div>
              </Popup>
            </Circle>

            <Circle
              center={[24.0, 81.0]}
              radius={90000}
              pathOptions={{
                color: '#8b5cf6',
                fillColor: '#8b5cf6',
                fillOpacity: 0.15,
                weight: 2
              }}
            >
              <Popup>
                <div style={{ fontFamily: 'Inter, sans-serif' }}>
                  <strong style={{ color: '#8b5cf6' }}>Madhya Pradesh Optimal Zone</strong><br/>
                  <span style={{ fontSize: '0.875rem', color: '#cbd5e1' }}>
                    Identified as most cost-effective and low-carbon region for green hydrogen
                  </span>
                </div>
              </Popup>
            </Circle>
          </>
        )}
      </MapContainer>
    </div>
  )
}