import { useState } from "react"
import { existingPlants, optimalSites } from "../data/hydrogenData"

export default function Sidebar({ setView, runAnalysis, analysisResult, onSiteSelect }) {
  const [activeView, setActiveView] = useState("existing")
  const [analysisFilter, setAnalysisFilter] = useState("all")
  const [sortedSites, setSortedSites] = useState([])

  const handleViewChange = (viewType) => {
    setActiveView(viewType)
    setView(viewType)
  }

  const handleAnalysisFilterChange = (filter) => {
    setAnalysisFilter(filter)
    generateSortedList(filter)
  }

  const generateSortedList = (filter) => {
    let sites = [...optimalSites]
    
    switch (filter) {
      case "cost":
        sites.sort((a, b) => a.cost - b.cost)
        break
      case "carbon":
        sites.sort((a, b) => a.carbon - b.carbon)
        break
      case "all":
      default:
        // Sort by combined efficiency (lower cost + carbon = better)
        sites.sort((a, b) => (a.cost + a.carbon) - (b.cost + b.carbon))
        break
    }
    
    setSortedSites(sites)
  }

  const viewOptions = [
    { 
      id: "existing", 
      icon: "🏭", 
      label: "Established Sites", 
      description: "Operational hydrogen facilities" 
    },
    { 
      id: "predictions", 
      icon: "⭐", 
      label: "Possible Sites", 
      description: "Predicted optimal locations" 
    },
  ]

  return (
    <aside className="sidebar slide-in-right">
      <div className="sidebar-header">
        <h2 className="sidebar-title">⚡ Control Panel</h2>
        <p className="sidebar-subtitle">Navigate and analyze India's green hydrogen infrastructure</p>
      </div>

      {/* View Selection Buttons */}
      <div className="card">
        <h3 className="card-title">🗺️ Map Views</h3>
        <div className="card-content">
          <div className="view-buttons">
            {viewOptions.map((option) => (
              <button
                key={option.id}
                className={`view-button ${activeView === option.id ? 'active' : ''}`}
                onClick={() => handleViewChange(option.id)}
              >
                <span className="view-button-icon">
                  {option.icon}
                </span>
                <div className="view-button-content">
                  <span className="view-button-label">{option.label}</span>
                  <span className="view-button-description">{option.description}</span>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Analysis Section with Filter */}
      <div className="card">
        <h3 className="card-title">🧮 Analysis</h3>
        <div className="card-content card-content-gap">
          <div className="analysis-filter-section">
            <label className="filter-label">Analysis Filter:</label>
            <select 
              className="analysis-dropdown"
              value={analysisFilter}
              onChange={(e) => handleAnalysisFilterChange(e.target.value)}
            >
              <option value="all">All (Combined Efficiency)</option>
              <option value="cost">Least Cost Sites</option>
              <option value="carbon">Least Carbon Emission</option>
            </select>
          </div>
          
          <button 
            className="button button-default button-full hover-lift"
            onClick={() => {
              runAnalysis()
              generateSortedList(analysisFilter)
            }}
          >
            🚀 Generate Analysis
          </button>

          {sortedSites.length > 0 && (
            <div className="sorted-sites-section">
              <h4 className="sorted-sites-title">
                📊 Ranked Sites ({analysisFilter === 'all' ? 'Combined Efficiency' : 
                  analysisFilter === 'cost' ? 'By Cost' : 'By Carbon Emission'})
              </h4>
              <div className="sorted-sites-list">
                {sortedSites.slice(0, 5).map((site, index) => (
                  <div 
                    key={site.id} 
                    className="sorted-site-item hover-lift"
                    onClick={() => onSiteSelect && onSiteSelect(site)}
                  >
                    <div className="site-rank">#{index + 1}</div>
                    <div className="site-info">
                      <div className="site-name">{site.name}</div>
                      <div className="site-metrics">
                        <span className="metric">Cost: {site.cost}/100</span>
                        <span className="metric">Carbon: {site.carbon}/100</span>
                      </div>
                    </div>
                    <div className="efficiency-badge">
                      {analysisFilter === 'cost' ? `${site.cost}/100` :
                       analysisFilter === 'carbon' ? `${site.carbon}/100` :
                       `${site.cost + site.carbon}/200`}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {analysisResult && (
            <div className="analysis-result">
              <h4 className="analysis-result-title">
                Analysis Results:
              </h4>
              <pre className="analysis-result-content">
                {analysisResult}
              </pre>
            </div>
          )}
        </div>
      </div>
    </aside>
  )
}