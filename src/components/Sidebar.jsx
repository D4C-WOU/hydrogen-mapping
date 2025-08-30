import EnergyMixChart from "./Energymixchart"

export default function Sidebar() {
  return (
    <aside className="sidebar slide-in-right">
      <h2 className="sidebar-title">⚡ Hydrogen Dashboard</h2>
      
      <div className="card">
        <div className="card-content card-content-gap">
          <input className="input" placeholder="Enter Country / City" />
          <button className="button button-default button-full">🔍 Search</button>
        </div>
      </div>

      <div className="card">
        <div className="card-content">
          <h3 className="card-title">📊 Energy Mix</h3>
          <EnergyMixChart />
        </div>
      </div>
    </aside>
  )
}