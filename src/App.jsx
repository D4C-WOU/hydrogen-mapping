import { useState } from "react"
import { Routes, Route } from "react-router-dom"
import Header from "./components/Header"
import Sidebar from "./components/Sidebar"
import Mapview from "./components/Mapview"
import Authpage from "./components/Authpage"
import { existingPlants, optimalSites } from "./data/hydrogenData"
import "./index.css"


function Dashboard() {
  const [view, setView] = useState("existing")
  const [analysisResult, setAnalysisResult] = useState("")

  const runAnalysis = () => {
    // Enhanced analysis with existing and predicted sites
    const allSites = [...existingPlants, ...optimalSites]
    const leastCost = allSites.reduce((a, b) => (a.cost < b.cost ? a : b))
    const leastCarbon = allSites.reduce((a, b) => (a.carbon < b.carbon ? a : b))
    const optimalPredictions = optimalSites.filter(site => site.cost <= 70 || site.carbon <= 10)
    
    const avgCost = (allSites.reduce((sum, site) => sum + site.cost, 0) / allSites.length).toFixed(1)
    const avgCarbon = (allSites.reduce((sum, site) => sum + site.carbon, 0) / allSites.length).toFixed(1)

    const result = `COMPREHENSIVE HYDROGEN INFRASTRUCTURE ANALYSIS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

🏭 EXISTING FACILITIES OVERVIEW:
   Total Operational/Announced: ${existingPlants.length} plants
   Average Cost Index: ${(existingPlants.reduce((sum, p) => sum + p.cost, 0) / existingPlants.length).toFixed(1)}/100
   Average Carbon Index: ${(existingPlants.reduce((sum, p) => sum + p.carbon, 0) / existingPlants.length).toFixed(1)}/100

💰 MOST COST-EFFECTIVE LOCATION:
   ${leastCost.name}
   Cost Index: ${leastCost.cost}/100 | Carbon: ${leastCost.carbon}/100
   Location: ${leastCost.city}
   Coordinates: ${leastCost.coordinates}

🌱 LOWEST CARBON FOOTPRINT:
   ${leastCarbon.name}
   Carbon Index: ${leastCarbon.carbon}/100 | Cost: ${leastCarbon.cost}/100
   Location: ${leastCarbon.city}
   Coordinates: ${leastCarbon.coordinates}

⭐ TOP PREDICTED OPTIMAL SITES:
   ${optimalPredictions.slice(0, 3).map(site => 
     `${site.name} - ${site.analysis}`
   ).join('\n   ')}

📊 OVERALL AVERAGES:
   Average Cost Index: ${avgCost}/100
   Average Carbon Index: ${avgCarbon}/100
   Total Sites Analyzed: ${allSites.length}

🎯 KEY RECOMMENDATIONS:
   • ${leastCarbon.name} offers the best environmental impact
   • ${leastCost.name} provides optimal cost efficiency
   • Focus development on predicted sites with cost ≤70 or carbon ≤10`

    setAnalysisResult(result)
  }

  return (
    <div className="app">
      <Header analysisResult={analysisResult} />
      <div className="main-layout">
        <div className="sidebar-container">
          <Sidebar
            setView={setView}
            runAnalysis={runAnalysis}
            analysisResult={analysisResult}
          />
        </div>
        <div className="map-container">
          <Mapview view={view} />
        </div>
      </div>
    </div>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/auth" element={<Authpage />} />
    </Routes>
  )
}