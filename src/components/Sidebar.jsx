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
    { 
      id: "all", 
      icon: "🗺️", 
      label: "All Sites", 
      description: "Complete hydrogen infrastructure overview" 
    },
    { 
      id: "plants", 
      icon: "🏭", 
      label: "Existing Plants", 
      description: "Operational hydrogen facilities" 
    },
    { 
      id: "potential", 
      icon: "🌱", 
      label: "Potential Sites", 
      description: "Future development locations" 
    },
    { 
      id: "optimal", 
      icon: "⭐", 
      label: "Optimal Locations", 
      description: "Best cost & carbon efficiency sites" 
    },
    { 
      id: "research", 
      icon: "🔬", 
      label: "Research Centers", 
      description: "R&D and innovation hubs" 
    },
    { 
      id: "industrial", 
      icon: "🏗️", 
      label: "Industrial Clusters", 
      description: "Manufacturing and export zones" 
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
                Existing Hydrogen Plants
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
              <div style={{ 
                width: '16px', 
                height: '16px', 
                background: '#22c55e', 
                borderRadius: '50%',
                border: '2px solid white',
                boxShadow: '0 2px 4px rgba(0,0,0,0.3)'
              }}></div>
              <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                Potential Development Sites
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
                Optimal Locations (Cost & Carbon Efficient)
              </span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-md)' }}>
              <div style={{ 
                width: '16px', 
                height: '16px', 
                background: '#3b82f6', 
                borderRadius: '50%',
                border: '2px solid white',
                boxShadow: '0 2px 4px rgba(0,0,0,0.3)'
              }}></div>
              <span style={{ fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                Research & Development Centers
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
        <h3 className="card-title">🧮 Land Analysis</h3>
        <div className="card-content card-content-gap">
          <p className="card-description">
            Analyze optimal locations for hydrogen infrastructure based on cost efficiency, carbon footprint, and logistics accessibility.
          </p>
          <button 
            className="button button-default button-full hover-lift"
            onClick={runAnalysis}
          >
            🚀 Run Comprehensive Analysis
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