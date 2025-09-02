import { useState } from "react"
import { existingPlants, optimalSites } from "../data/hydrogenData"

export default function Sidebar({ setView, runAnalysis, analysisResult, onSiteSelect }) {
  const [currentMapView, setCurrentMapView] = useState(0) // 0: existing, 1: possible, 2: both
  const [sortedSites, setSortedSites] = useState([])
  const [showAnalysisPopup, setShowAnalysisPopup] = useState(false)

  const mapViewStates = [
    { 
      id: "existing", 
      icon: "🏭", 
      label: "Established Sites", 
      description: "Currently operational facilities",
      data: existingPlants
    },
    { 
      id: "predictions", 
      icon: "🔵", 
      label: "Possible Sites", 
      description: "Potential development locations",
      data: optimalSites
    },
    { 
      id: "both", 
      icon: "🗺️", 
      label: "All Sites", 
      description: "Complete infrastructure overview",
      data: [...existingPlants, ...optimalSites]
    }
  ]

  const handleMapViewToggle = () => {
    const nextView = (currentMapView + 1) % mapViewStates.length
    setCurrentMapView(nextView)
    setView(mapViewStates[nextView].id)
  }

  const getCurrentViewData = () => {
    return mapViewStates[currentMapView].data
  }

  const generateAnalysis = () => {
    const currentData = getCurrentViewData()
    const viewType = mapViewStates[currentMapView].label
    
    // Sort by cost (lowest to highest)
    const costSorted = [...currentData].sort((a, b) => a.cost - b.cost)
    
    // Sort by carbon emissions (lowest to highest)
    const carbonSorted = [...currentData].sort((a, b) => a.carbon - b.carbon)
    
    setSortedSites(costSorted)
    
    // Generate comprehensive analysis result
    const result = `${viewType.toUpperCase()} - COMPREHENSIVE ANALYSIS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📊 ANALYSIS SCOPE: ${viewType} (${currentData.length} locations)
📅 Analysis Date: ${new Date().toLocaleDateString('en-IN')}

💰 COST ANALYSIS (Lowest to Highest):
${costSorted.slice(0, 5).map((site, index) => 
  `${index + 1}. ${site.name} - ${site.city}
   💰 Cost Index: ${site.cost}/100 ${site.cost <= 70 ? '(Excellent)' : site.cost <= 85 ? '(Good)' : '(High)'}
   🌿 Carbon Index: ${site.carbon}/100
   ⚡ Capacity: ${site.capacity}
   📊 Status: ${site.status}`
).join('\n\n')}

🌿 CARBON EMISSION ANALYSIS (Lowest to Highest):
${carbonSorted.slice(0, 5).map((site, index) => 
  `${index + 1}. ${site.name} - ${site.city}
   🌿 Carbon Index: ${site.carbon}/100 ${site.carbon <= 10 ? '(Excellent)' : site.carbon <= 20 ? '(Good)' : '(High)'}
   💰 Cost Index: ${site.cost}/100
   ⚡ Capacity: ${site.capacity}
   📊 Status: ${site.status}`
).join('\n\n')}

📈 STATISTICAL OVERVIEW:
• Lowest Cost: ${Math.min(...currentData.map(s => s.cost))}/100 (${costSorted[0].name})
• Highest Cost: ${Math.max(...currentData.map(s => s.cost))}/100 (${costSorted[costSorted.length - 1].name})
• Lowest Carbon: ${Math.min(...currentData.map(s => s.carbon))}/100 (${carbonSorted[0].name})
• Highest Carbon: ${Math.max(...currentData.map(s => s.carbon))}/100 (${carbonSorted[carbonSorted.length - 1].name})
• Average Cost: ${(currentData.reduce((sum, s) => sum + s.cost, 0) / currentData.length).toFixed(1)}/100
• Average Carbon: ${(currentData.reduce((sum, s) => sum + s.carbon, 0) / currentData.length).toFixed(1)}/100

🎯 KEY RECOMMENDATIONS:
• Most Cost-Effective: ${costSorted[0].name} (${costSorted[0].cost}/100 cost index)
• Lowest Environmental Impact: ${carbonSorted[0].name} (${carbonSorted[0].carbon}/100 carbon)
• Infrastructure Type: ${viewType} analysis for India's hydrogen ecosystem
• Development Priority: Focus on sites with cost ≤ 70 and carbon ≤ 10 for optimal efficiency`

    runAnalysis(result)
    
    // Show popup notification
    setShowAnalysisPopup(true)
    setTimeout(() => {
      setShowAnalysisPopup(false)
    }, 4000)
  }

  const currentView = mapViewStates[currentMapView]

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2 className="sidebar-title">⚡ Control Panel</h2>
        <p className="sidebar-subtitle">Navigate and analyze India's green hydrogen infrastructure</p>
      </div>

      {/* Map Views Section */}
      <div className="sidebar-section">
        <h3 className="section-title">🗺️ Map Views</h3>
        <div className="map-view-container">
          <div className="map-view-current">
            <div className="current-view-display">
              <div className="current-view-icon">{currentView.icon}</div>
              <div className="current-view-info">
                <div className="current-view-label">{currentView.label}</div>
                <div className="current-view-description">{currentView.description}</div>
                <div className="current-view-count">{currentView.data.length} locations</div>
              </div>
            </div>
            <button className="view-toggle-btn" onClick={handleMapViewToggle}>
              Switch View
            </button>
          </div>
          
          <div className="view-indicators">
            {mapViewStates.map((view, index) => (
              <div 
                key={view.id}
                className={`view-indicator ${index === currentMapView ? 'active' : ''}`}
                onClick={() => {
                  setCurrentMapView(index)
                  setView(view.id)
                }}
              >
                <span className="indicator-icon">{view.icon}</span>
                <span className="indicator-label">{view.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Analysis Section */}
      <div className="sidebar-section">
        <h3 className="section-title">🧮 Analysis</h3>
        <div className="analysis-container">
          <button 
            className="analysis-btn"
            onClick={generateAnalysis}
          >
            🚀 Run Analysis
          </button>

          {sortedSites.length > 0 && (
            <div className="analysis-results">
              <h4 className="results-title">
                📊 Top Ranked Sites (Cost Efficiency)
              </h4>
              <div className="sites-list">
                {sortedSites.slice(0, 5).map((site, index) => (
                  <div 
                    key={site.id} 
                    className="site-item"
                    onClick={() => onSiteSelect && onSiteSelect(site)}
                  >
                    <div className="site-rank">#{index + 1}</div>
                    <div className="site-details">
                      <div className="site-name">{site.name}</div>
                      <div className="site-location">{site.city}</div>
                      <div className="site-metrics">
                        <span className="metric cost">💰 {site.cost}/100</span>
                        <span className="metric carbon">🌿 {site.carbon}/100</span>
                      </div>
                    </div>
                    <div className="efficiency-score">
                      {(200 - site.cost - site.carbon).toFixed(0)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Analysis Popup */}
      {showAnalysisPopup && (
        <div className="analysis-popup-overlay">
          <div className="analysis-popup">
            <div className="popup-header">
              <div className="popup-icon">✅</div>
              <h3 className="popup-title">Analysis Complete!</h3>
            </div>
            <div className="popup-content">
              <p className="popup-text">
                Analysis completed successfully! Check the header's "Export Report" button for detailed PDF results including comprehensive data for all site types.
              </p>
              <div className="popup-stats">
                <div className="popup-stat">
                  <span className="stat-value">{getCurrentViewData().length}</span>
                  <span className="stat-label">Sites Analyzed</span>
                </div>
                <div className="popup-stat">
                  <span className="stat-value">{currentView.label}</span>
                  <span className="stat-label">Analysis Type</span>
                </div>
              </div>
            </div>
            <button 
              className="popup-close-btn"
              onClick={() => setShowAnalysisPopup(false)}
            >
              Got it!
            </button>
          </div>
        </div>
      )}
    </aside>
  )
}