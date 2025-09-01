import { useState, useEffect } from "react"
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import L from "leaflet"
import { existingPlants, optimalSites } from "../data/hydrogenData"

// Fix for default markers in React Leaflet
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
})

// Enhanced marker icons for existing and predicted sites
const createCustomIcon = (color, symbol = "H₂", size = [40, 40]) => {
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
        font-size: 12px;
        font-family: 'Inter', sans-serif;
        text-shadow: 0 1px 2px rgba(0,0,0,0.5);
        cursor: pointer;
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
const predictionIcon = createCustomIcon('#3b82f6', '🔵')   // Blue for predicted optimal sites

export default function Mapview({ view, selectedSite, onSiteSelect }) {
  const [mapLoading, setMapLoading] = useState(true)
  const [activeMarkers, setActiveMarkers] = useState([])
  const [mapInstance, setMapInstance] = useState(null)

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
      case "existing":
        setActiveMarkers(existingPlants)
        break
      case "predictions":
        setActiveMarkers(optimalSites)
        break
      case "both":
        setActiveMarkers([...existingPlants, ...optimalSites])
        break
      default:
        setActiveMarkers([...existingPlants, ...optimalSites])
    }
  }, [view])

  // Center map on selected site
  useEffect(() => {
    if (selectedSite && mapInstance) {
      mapInstance.setView([selectedSite.lat, selectedSite.lng], 8)
    }
  }, [selectedSite, mapInstance])

  const getMarkerIcon = (type) => {
    switch (type) {
      case "existing":
        return existingIcon
      case "prediction":
        return predictionIcon
      default:
        return existingIcon
    }
  }

  const getMarkerColor = (type) => {
    switch (type) {
      case "existing":
        return "#ef4444"
      case "prediction":
        return "#3b82f6"
      default:
        return "#ef4444"
    }
  }

  const getEfficiencyBadge = (site) => {
    if (site.type === "prediction") {
      if (site.cost <= 65 && site.carbon <= 8) {
        return "🏆 Highest Efficiency - Low Cost & Carbon"
      } else if (site.cost <= 70) {
        return "💰 Low Cost Location"
      } else if (site.carbon <= 10) {
        return "🌱 Low Carbon Emission"
      } else {
        return "⚖️ Balanced Cost-Carbon Profile"
      }
    }
    return ""
  }

  const handleMarkerClick = (site) => {
    if (onSiteSelect) {
      onSiteSelect(site)
    }
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
    <div className="map-wrapper">
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
          whenCreated={setMapInstance}
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
              eventHandlers={{
                click: () => handleMarkerClick(site)
              }}
            >
              <Popup className="custom-popup" maxWidth={350}>
                <div style={{ minWidth: '280px', fontFamily: 'Inter, sans-serif' }}>
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
                  
                  {getEfficiencyBadge(site) && (
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
                      {getEfficiencyBadge(site)}
                    </div>
                  )}
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <p style={{ marginBottom: '4px', fontWeight: '600', fontSize: '0.9rem' }}>
                      📍 <span style={{ color: '#A1D1B1' }}>Location: {site.city}</span>
                    </p>
                    <p style={{ marginBottom: '4px', fontSize: '0.9rem' }}>
                      🌐 <span style={{ color: '#A1D1B1', fontWeight: '600' }}>Coordinates: {site.coordinates}</span>
                    </p>
                    <p style={{ marginBottom: '4px', fontSize: '0.9rem' }}>
                      ⚡ Capacity: <span style={{ color: '#A1D1B1', fontWeight: '600' }}>{site.capacity}</span>
                    </p>
                    <p style={{ marginBottom: '4px', fontSize: '0.9rem' }}>
                      📊 Status: <span style={{ color: '#22c55e', fontWeight: '600' }}>{site.status}</span>
                    </p>
                    
                    <div style={{ 
                      marginTop: '12px', 
                      padding: '12px', 
                      background: 'rgba(161, 209, 177, 0.1)', 
                      borderRadius: '8px',
                      fontSize: '0.85rem',
                      lineHeight: '1.4'
                    }}>
                      <p style={{ 
                        color: '#A1D1B1', 
                        fontWeight: '600', 
                        marginBottom: '8px',
                        fontSize: '0.9rem'
                      }}>
                        📋 Description:
                      </p>
                      <p style={{ color: '#cbd5e1' }}>
                        {site.description}
                      </p>
                    </div>
                    
                    {site.cost > 0 && (
                      <div style={{ 
                        marginTop: '8px', 
                        padding: '10px', 
                        background: 'rgba(161, 209, 177, 0.08)', 
                        borderRadius: '6px',
                        fontSize: '0.8rem',
                        border: '1px solid rgba(161, 209, 177, 0.2)'
                      }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                          <span>💰 Cost Index:</span>
                          <span style={{ 
                            fontWeight: '600', 
                            color: site.cost <= 70 ? '#22c55e' : site.cost <= 85 ? '#f59e0b' : '#ef4444' 
                          }}>
                            {site.cost}/100
                          </span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <span>🌿 Carbon Index:</span>
                          <span style={{ 
                            fontWeight: '600', 
                            color: site.carbon <= 10 ? '#22c55e' : site.carbon <= 20 ? '#f59e0b' : '#ef4444' 
                          }}>
                            {site.carbon}/100
                          </span>
                        </div>
                        {site.analysis && (
                          <p style={{ 
                            fontSize: '0.75rem', 
                            color: '#8b5cf6', 
                            marginTop: '6px',
                            fontWeight: '600',
                            fontStyle: 'italic'
                          }}>
                            🎯 {site.analysis}
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      </div>

      {/* Selected Site Card */}
      {selectedSite && (
        <div className="selected-site-card">
          <div className="selected-site-header">
            <h3 className="selected-site-title">{selectedSite.name}</h3>
            <button 
              className="close-card-btn"
              onClick={() => onSiteSelect && onSiteSelect(null)}
            >
              ✕
            </button>
          </div>
          <div className="selected-site-content">
            <p className="selected-site-location">
              📍 {selectedSite.city}
            </p>
            <p className="selected-site-coordinates">
              🌐 {selectedSite.coordinates}
            </p>
            <p className="selected-site-description">
              {selectedSite.description}
            </p>
            {selectedSite.type === "prediction" && (
              <div className="selected-site-metrics">
                <div className="metric-item">
                  <span>Cost Index:</span>
                  <span className={`metric-value ${selectedSite.cost <= 70 ? 'good' : selectedSite.cost <= 85 ? 'medium' : 'high'}`}>
                    {selectedSite.cost}/100
                  </span>
                </div>
                <div className="metric-item">
                  <span>Carbon Index:</span>
                  <span className={`metric-value ${selectedSite.carbon <= 10 ? 'good' : selectedSite.carbon <= 20 ? 'medium' : 'high'}`}>
                    {selectedSite.carbon}/100
                  </span>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}