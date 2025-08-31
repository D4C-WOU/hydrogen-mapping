import { useState } from "react"
import { existingPlants, optimalSites } from "../data/hydrogenData"

export default function Sidebar({ setView, runAnalysis, analysisResult, onSiteSelect }) {
  const [activeView, setActiveView] = useState("existing")
  const [analysisFilter, setAnalysisFilter] = useState("all")
  const [sortedSites, setSortedSites] = useState([])
  const [analysisCompleted, setAnalysisCompleted] = useState(false)

  const handleViewToggle = (viewType) => {
    setActiveView(viewType)
    setView(viewType)
  }

  const handleAnalysisFilterChange = (filter) => {
    setAnalysisFilter(filter)
  }

  const generateAnalysis = () => {
    let sites = [...existingPlants]
    
    switch (analysisFilter) {
      case "cost":
        sites.sort((a, b) => b.cost - a.cost) // Highest to lowest cost
        break
      case "carbon":
        sites.sort((a, b) => b.carbon - a.carbon) // Highest to lowest carbon
        break
      case "all":
      default:
        // Sort by combined cost + carbon (highest to lowest)
        sites.sort((a, b) => (b.cost + b.carbon) - (a.cost + a.carbon))
        break
    }
    
    setSortedSites(sites)
    setAnalysisCompleted(true)
    
    // Generate analysis result for export
    const analysisType = analysisFilter === 'cost' ? 'Land Cost' : 
                        analysisFilter === 'carbon' ? 'Carbon Emission' : 
                        'Combined Cost & Carbon Emission'
    
    const result = `ESTABLISHED SITES ANALYSIS - ${analysisType.toUpperCase()}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

📊 ANALYSIS TYPE: ${analysisType} (Highest to Lowest)
📅 Analysis Date: ${new Date().toLocaleDateString('en-IN')}
🏭 Total Established Sites Analyzed: ${sites.length}

🔝 TOP RANKED SITES:
${sites.slice(0, 5).map((site, index) => 
  `${index + 1}. ${site.name}
   📍 Location: ${site.city}
   💰 Cost Index: ${site.cost}/100
   🌿 Carbon Index: ${site.carbon}/100
   ⚡ Capacity: ${site.capacity}
   📊 Status: ${site.status}
   ${analysisFilter === 'all' ? `🎯 Combined Score: ${site.cost + site.carbon}/200` : ''}
   ────────────────────────────────────────`
).join('\n')}

📈 STATISTICAL SUMMARY:
• Highest Cost Index: ${Math.max(...sites.map(s => s.cost))}/100
• Lowest Cost Index: ${Math.min(...sites.map(s => s.cost))}/100
• Highest Carbon Index: ${Math.max(...sites.map(s => s.carbon))}/100
• Lowest Carbon Index: ${Math.min(...sites.map(s => s.carbon))}/100
• Average Cost Index: ${(sites.reduce((sum, s) => sum + s.cost, 0) / sites.length).toFixed(1)}/100
• Average Carbon Index: ${(sites.reduce((sum, s) => sum + s.carbon, 0) / sites.length).toFixed(1)}/100

🎯 KEY INSIGHTS:
• Most Cost-Intensive: ${sites[0].name} (${sites[0].cost}/100)
• Highest Carbon Footprint: ${sites.find(s => s.carbon === Math.max(...sites.map(site => site.carbon))).name} (${Math.max(...sites.map(s => s.carbon))}/100)
• Most Efficient Overall: ${sites[sites.length - 1].name}
• Analysis Focus: ${analysisType} optimization for established hydrogen infrastructure`

    runAnalysis(result)
    
    // Show alert after analysis is complete
    setTimeout(() => {
      alert("Analysis is done, click export report to download and see the analysis")
    }, 500)
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

      {/* Map Views Section */}
      <div className="card">
        <h3 className="card-title">🗺️ Map Views</h3>
        <div className="card-content">
          <div className="view-buttons">
            {viewOptions.map((option) => (
              <button
                key={option.id}
                className={`view-button ${activeView === option.id ? 'active' : ''}`}
                onClick={() => handleViewToggle(option.id)}
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

      {/* Analysis Section */}
      <div className="card">
        <h3 className="card-title">🧮 Analysis</h3>
        <div className="card-content card-content-gap">
          <div className="analysis-filter-section">
            <label className="filter-label">Analysis of Established Sites:</label>
            <select 
              className="analysis-dropdown"
              value={analysisFilter}
              onChange={(e) => handleAnalysisFilterChange(e.target.value)}
            >
              <option value="all">All (Cost & Carbon Emission)</option>
              <option value="cost">Land Cost (Highest to Lowest)</option>
              <option value="carbon">Carbon Emission (Highest to Lowest)</option>
            </select>
          </div>
          
          <button 
            className="button button-default button-full hover-lift"
            onClick={generateAnalysis}
          >
            🚀 Generate Analysis
          </button>

          {sortedSites.length > 0 && (
            <div className="sorted-sites-section">
              <h4 className="sorted-sites-title">
                📊 Ranked Established Sites ({analysisFilter === 'all' ? 'Cost & Carbon' : 
                  analysisFilter === 'cost' ? 'By Land Cost' : 'By Carbon Emission'}) - Highest to Lowest
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
              
              {analysisCompleted && (
                <div className="analysis-complete-notice">
                  <p className="analysis-notice-text">
                    ✅ Analysis completed! Click "Export Report" to download the detailed analysis.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </aside>
  )
}