import { useState } from "react"
import EnergyMixChart from "./Energymixchart"

export default function Sidebar({ setView, runAnalysis, analysisResult }) {
  const [searchTerm, setSearchTerm] = useState("")
  const [activeView, setActiveView] = useState("all")

  const handleViewChange = (viewType) => {
    setActiveView(viewType)
    setView(viewType)
  }

  const viewOptions = [
    { id: "all", label: "🗺️ All Sites", description: "Complete hydrogen infrastructure overview" },
    { id: "plants", label: "🏭 Existing Plants", description: "Operational hydrogen facilities" },
    { id: "potential", label: "🌱 Potential Sites", description: "Future development locations" },
    { id: "research", label: "🔬 Research Centers", description: "R&D and innovation hubs" },
    { id: "industrial", label: "🏗️ Industrial Clusters", description: "Manufacturing and export zones" },
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
        <p className="sidebar-subtitle">National Green Hydrogen Mission - Real-time Infrastructure Mapping</p>
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
                className={`button ${activeView === option.id ? 'button-default' : 'button-secondary'} button-full`}
                onClick={() => handleViewChange(option.id)}
              >
                {option.label}
              </button>
            ))}
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
        <h3 className="card-title">🧮 Land Analysis</h3>
        <div className="card-content card-content-gap">
          <p className="card-description">
            Analyze optimal locations for hydrogen infrastructure based on cost, carbon footprint, and logistics.
          </p>
          <button 
            className="button button-default button-full hover-lift"
            onClick={runAnalysis}
          >
            🚀 Run Analysis
          </button>
          {analysisResult && (
            <div className="analysis-result">
              <h4 style={{ color: 'var(--saffron)', marginBottom: 'var(--space-sm)', fontSize: '0.875rem', fontWeight: '600' }}>
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
                border: '1px solid var(--border-primary)'
              }}>
                {analysisResult}
              </pre>
            </div>
          )}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card">
        <h3 className="card-title">⚡ Quick Actions</h3>
        <div className="card-content card-content-gap">
          <button className="button button-secondary button-full hover-lift">
            📈 View Trends
          </button>
          <button className="button button-secondary button-full hover-lift">
            📋 Generate Report
          </button>
          <button className="button button-secondary button-full hover-lift">
            🌐 Export Data
          </button>
        </div>
      </div>
    </aside>
  )
}