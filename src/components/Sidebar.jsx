import { useState } from "react"
import { existingPlants, optimalSites } from "../data/hydrogenData"

export default function Sidebar({ setView, runAnalysis, analysisResult, onSiteSelect }) {
  const [currentMapView, setCurrentMapView] = useState(0) // 0: existing, 1: possible, 2: both
  const [analysisFilter, setAnalysisFilter] = useState("all")
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
    
    let sites = [...currentData]
    
    // Sort based on analysis filter
    switch (analysisFilter) {
      case "cost":
        sites.sort((a, b) => a.cost - b.cost) // Lowest to highest cost
        break
      case "carbon":
        sites.sort((a, b) => a.carbon - b.carbon) // Lowest to highest carbon
        break
      case "all":
      default:
        sites.sort((a, b) => (a.cost + a.carbon) - (b.cost + b.carbon)) // Lowest to highest combined
        break
    }
    
    setSortedSites(sites)
    
    // Generate comprehensive analysis result
    const analysisType = analysisFilter === 'cost' ? 'Land Cost Analysis' : 
                        analysisFilter === 'carbon' ? 'Carbon Emission Analysis' : 
                        'Combined Cost & Carbon Analysis'
    
    const result = `${viewType.toUpperCase()} - ${analysisType.toUpperCase()}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📊 ANALYSIS SCOPE: ${viewType} (${sites.length} locations)
📅 Analysis Date: ${new Date().toLocaleDateString('en-IN')}
🎯 Ranking: ${analysisFilter === 'cost' ? 'Land Cost' : analysisFilter === 'carbon' ? 'Carbon Emissions' : 'Combined Efficiency'} (Lowest to Highest)

🏆 TOP PERFORMING SITES:
${sites.slice(0, 5).map((site, index) => 
  `${index + 1}. ${site.name}
   📍 Location: ${site.city}
   💰 Cost Index: ${site.cost}/100 ${site.cost <= 70 ? '(Excellent)' : site.cost <= 85 ? '(Good)' : '(High)'}
   🌿 Carbon Index: ${site.carbon}/100 ${site.carbon <= 10 ? '(Excellent)' : site.carbon <= 20 ? '(Good)' : '(High)'}
   ⚡ Capacity: ${site.capacity}
   📊 Status: ${site.status}
   ${analysisFilter === 'all' ? `🎯 Combined Score: ${site.cost + site.carbon}/200` : ''}
   ${site.analysis ? `💡 Key Insight: ${site.analysis}` : ''}
   ────────────────────────────────────────`
).join('\n')}

📈 STATISTICAL OVERVIEW:
• Best Cost Index: ${Math.min(...sites.map(s => s.cost))}/100 (${sites.find(s => s.cost === Math.min(...sites.map(site => site.cost))).name})
• Worst Cost Index: ${Math.max(...sites.map(s => s.cost))}/100 (${sites.find(s => s.cost === Math.max(...sites.map(site => site.cost))).name})
• Best Carbon Index: ${Math.min(...sites.map(s => s.carbon))}/100 (${sites.find(s => s.carbon === Math.min(...sites.map(site => site.carbon))).name})
• Worst Carbon Index: ${Math.max(...sites.map(s => s.carbon))}/100 (${sites.find(s => s.carbon === Math.max(...sites.map(site => site.carbon))).name})
• Average Cost Index: ${(sites.reduce((sum, s) => sum + s.cost, 0) / sites.length).toFixed(1)}/100
• Average Carbon Index: ${(sites.reduce((sum, s) => sum + s.carbon, 0) / sites.length).toFixed(1)}/100

🎯 KEY STRATEGIC INSIGHTS:
• Most Cost-Effective: ${sites[0].name} (${sites[0].cost}/100 cost index)
• Lowest Environmental Impact: ${sites.find(s => s.carbon === Math.min(...sites.map(site => site.carbon))).name} (${Math.min(...sites.map(s => s.carbon))}/100 carbon)
• Optimal Balance: ${sites[0].name} leads in ${analysisFilter === 'cost' ? 'cost efficiency' : analysisFilter === 'carbon' ? 'environmental performance' : 'overall efficiency'}
• Infrastructure Type: ${viewType} analysis for India's hydrogen ecosystem
• Development Priority: Focus on sites with combined scores ≤ 140/200 for optimal ROI`

    runAnalysis(result)
    
    // Show popup notification
    setShowAnalysisPopup(true)
    setTimeout(() => {
      setShowAnalysisPopup(false)
    }, 4000)
  }

  const currentView = mapViewStates[currentMapView]

  return (
    <aside className="sidebar slide-in-right">
      <div className="sidebar-header">
        <h2 className="sidebar-title">⚡ Control Panel</h2>
        <p className="sidebar-subtitle">Navigate and analyze India's green hydrogen infrastructure</p>
      </div>

      {/* Enhanced Map Views Section */}
      <div className="card">
        <h3 className="card-title">🗺️ Map Views</h3>
        <div className="card-content">
          <div className="map-view-toggle">
            <button
              className="map-view-button"
              onClick={handleMapViewToggle}
            >
              <div className="map-view-icon">
                {currentView.icon}
              </div>
              <div className="map-view-content">
                <span className="map-view-label">{currentView.label}</span>
                <span className="map-view-description">{currentView.description}</span>
                <span className="map-view-count">{currentView.data.length} locations</span>
              </div>
              <div className="map-view-arrow">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M9 18l6-6-6-6"/>
                </svg>
              </div>
            </button>
            
            <div className="map-view-indicator">
              <div className="view-dots">
                {mapViewStates.map((_, index) => (
                  <div 
                    key={index}
                    className={`view-dot ${index === currentMapView ? 'active' : ''}`}
                  />
                ))}
              </div>
              <span className="view-counter">{currentMapView + 1} of {mapViewStates.length}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Enhanced Analysis Section */}
      <div className="card">
        <h3 className="card-title">🧮 Analysis</h3>
        <div className="card-content card-content-gap">
          <div className="analysis-filter-section">
            <label className="filter-label">Analysis Type for {currentView.label}:</label>
            <select 
              className="analysis-dropdown"
              value={analysisFilter}
              onChange={(e) => setAnalysisFilter(e.target.value)}
            >
              <option value="all">Combined Efficiency (Cost + Carbon)</option>
              <option value="cost">Land Cost Analysis (Low to High)</option>
              <option value="carbon">Carbon Emissions (Low to High)</option>
            </select>
          </div>
          
          <button 
            className="button button-default button-full hover-lift"
            onClick={generateAnalysis}
          >
            🚀 Run Analysis
          </button>

          {sortedSites.length > 0 && (
            <div className="sorted-sites-section">
              <h4 className="sorted-sites-title">
                📊 Ranked {currentView.label} ({analysisFilter === 'all' ? 'Best Efficiency' : 
                  analysisFilter === 'cost' ? 'Lowest Cost' : 'Lowest Carbon'} First)
              </h4>
              <div className="sorted-sites-list">
                {sortedSites.slice(0, 6).map((site, index) => (
                  <div 
                    key={site.id} 
                    className="sorted-site-item hover-lift"
                    onClick={() => onSiteSelect && onSiteSelect(site)}
                  >
                    <div className="site-rank">#{index + 1}</div>
                    <div className="site-info">
                      <div className="site-name">{site.name}</div>
                      <div className="site-location">{site.city}</div>
                      <div className="site-metrics">
                        <span className="metric">💰 {site.cost}/100</span>
                        <span className="metric">🌿 {site.carbon}/100</span>
                      </div>
                    </div>
                    <div className="efficiency-badge">
                      {analysisFilter === 'cost' ? `${site.cost}` :
                       analysisFilter === 'carbon' ? `${site.carbon}` :
                       `${site.cost + site.carbon}`}
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
            <div className="analysis-popup-header">
              <div className="analysis-popup-icon">✅</div>
              <h3 className="analysis-popup-title">Analysis Complete!</h3>
            </div>
            <div className="analysis-popup-content">
              <p className="analysis-popup-text">
                Your {currentView.label.toLowerCase()} analysis is ready. Click "Export Report" in the header to download the detailed results.
              </p>
              <div className="analysis-popup-stats">
                <div className="popup-stat">
                  <span className="popup-stat-value">{getCurrentViewData().length}</span>
                  <span className="popup-stat-label">Sites Analyzed</span>
                </div>
                <div className="popup-stat">
                  <span className="popup-stat-value">{analysisFilter === 'cost' ? 'Cost' : analysisFilter === 'carbon' ? 'Carbon' : 'Combined'}</span>
                  <span className="popup-stat-label">Analysis Type</span>
                </div>
              </div>
            </div>
            <button 
              className="analysis-popup-close"
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