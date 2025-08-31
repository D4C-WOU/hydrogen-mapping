import { useState } from "react"
import EnergyMixChart from "./Energymixchart"

export default function Sidebar({ setView, runAnalysis, analysisResult }) {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeView, setActiveView] = useState("existing")

  const handleViewChange = (viewType) => {
    setActiveView(viewType)
    setView(viewType)
  }

  const viewOptions = [
    { 
      id: "existing", 
      icon: "🏭", 
      label: "Existing Factories", 
      description: "Operational hydrogen facilities" 
    },
    { 
      id: "predictions", 
      icon: "⭐", 
      label: "Predictions", 
      description: "Best cost & carbon efficiency sites" 
    },
  ]

  const stats = [
    { label: "Active Plants", value: "15", unit: "facilities" },
    { label: "Total Capacity", value: "8.2", unit: "MTPA" },
    { label: "Potential Sites", value: "25", unit: "locations" },
    { label: "Investment", value: "₹2.4L", unit: "crores" },
  ]

  return (
    <aside className="sidebar slide-in-right">
      <div className="sidebar-header">
        <h2 className="sidebar-title">⚡ Hydrogen Dashboard</h2>
        <p className="sidebar-subtitle">National Green Hydrogen Mission - Real-time Infrastructure Mapping & Analysis</p>
      </div>

      {/* Search and Filters */}
      <div className="card">
        <h3 className="card-title">🔍 Search & Filter</h3>
        <div className="card-content card-content-gap">
          <input 
            className="input" 
            placeholder="Search by city, state, or facility name..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          
          <div className="view-buttons">
            {viewOptions.map((option) => (
              <button
                key={option.id}
                className={`view-button ${activeView === option.id ? 'active' : ''}`}
                onClick={() => handleViewChange(option.id)}
              >
                <span className="view-button-icon" style={{ fontSize: '1.25rem', minWidth: '1.5rem' }}>
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

      {/* Legend */}
      <div className="card">
        <h3 className="card-title">🎯 Map Legend</h3>
        <div className="card-content">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-md)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
              <div style={{ 
                width: '16px', 
                height: '16px', 
                background: '#ef4444', 
                borderRadius: '50%',
                border: '2px solid white',
                boxShadow: '0 2px 4px rgba(0,0,0,0.3)'
              }}></div>
              <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                Existing Hydrogen Factories
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
              <div style={{ 
                width: '16px', 
                height: '16px', 
                background: '#8b5cf6', 
                borderRadius: '50%',
                border: '2px solid white',
                boxShadow: '0 2px 4px rgba(0,0,0,0.3)'
              }}></div>
              <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                Predicted Optimal Sites (Low Cost/Carbon)
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Overview */}
      <div className="card">
        <h3 className="card-title">📊 Infrastructure Stats</h3>
        <div className="stats-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card hover-lift">
              <div className="stat-value">{stat.value}</div>
              <div className="stat-label">{stat.label}</div>
              <div className="stat-unit">{stat.unit}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Energy Mix Chart */}
      <div className="card">
        <h3 className="card-title">🔋 Energy Mix Analysis</h3>
        <div className="chart-container">
          <EnergyMixChart />
        </div>
      </div>

      {/* Analysis Section */}
      <div className="card">
        <h3 className="card-title">🧮 Site Analysis</h3>
        <div className="card-content card-content-gap">
          <p className="card-description">
            Comprehensive analysis of existing facilities and predicted optimal locations for hydrogen infrastructure development.
          </p>
          <button 
            className="button button-default button-full hover-lift"
            onClick={runAnalysis}
          >
            🚀 Generate Site Analysis
          </button>
          {analysisResult && (
            <div className="analysis-result">
              <h4 style={{ 
                color: 'var(--mint-primary)', 
                marginBottom: 'var(--space-sm)', 
                fontSize: '0.875rem', 
                fontWeight: '600' 
              }}>
                Analysis Results:
              </h4>
              <pre style={{ 
                background: 'var(--bg-glass)', 
                padding: 'var(--space-md)', 
                borderRadius: 'var(--radius-md)',
                fontSize: '0.8rem',
                lineHeight: '1.4',
                color: 'var(--text-secondary)',
                whiteSpace: 'pre-wrap',
                border: '1px solid var(--border-primary)',
                fontFamily: 'Inter, monospace'
              }}>
                {analysisResult}
              </pre>
            </div>
          )}
        </div>
      </div>
    </aside>
  )
}