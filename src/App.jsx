import { useState } from "react"
import { Routes, Route } from "react-router-dom"
import Header from "./components/Header"
import Sidebar from "./components/Sidebar"
import Mapview from "./components/Mapview"
import Authpage from "./components/Authpage"
import "./index.css"

// Enhanced dataset for analysis with more realistic Indian locations
const landData = [
  { 
    name: "Gujarat - Kutch Solar Park", 
    cost: 85, 
    carbon: 15, 
    location: "Kutch, Gujarat",
    renewable: "Solar",
    logistics: "Excellent port access"
  },
  { 
    name: "Rajasthan - Jaisalmer Wind Farm", 
    cost: 92, 
    carbon: 12, 
    location: "Jaisalmer, Rajasthan",
    renewable: "Wind",
    logistics: "Good rail connectivity"
  },
  { 
    name: "Ladakh - High Altitude Solar", 
    cost: 110, 
    carbon: 8, 
    location: "Leh, Ladakh",
    renewable: "Solar",
    logistics: "Remote location"
  },
  { 
    name: "Tamil Nadu - Offshore Wind", 
    cost: 95, 
    carbon: 10, 
    location: "Tuticorin, Tamil Nadu",
    renewable: "Offshore Wind",
    logistics: "Excellent port facilities"
  },
  { 
    name: "Andhra Pradesh - Solar Hub", 
    cost: 78, 
    carbon: 18, 
    location: "Anantapur, AP",
    renewable: "Solar",
    logistics: "Good highway access"
  },
]

function Dashboard() {
  const [view, setView] = useState("all")
  const [analysisResult, setAnalysisResult] = useState("")

  const runAnalysis = () => {
    // Enhanced analysis with more detailed results
    const leastCost = landData.reduce((a, b) => (a.cost < b.cost ? a : b))
    const leastCarbon = landData.reduce((a, b) => (a.carbon < b.carbon ? a : b))
    const bestLogistics = landData.filter(land => land.logistics.includes("Excellent"))
    
    const avgCost = (landData.reduce((sum, land) => sum + land.cost, 0) / landData.length).toFixed(1)
    const avgCarbon = (landData.reduce((sum, land) => sum + land.carbon, 0) / landData.length).toFixed(1)

    const result = `OPTIMAL SITE ANALYSIS RESULTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

💰 MOST COST-EFFECTIVE LOCATION:
   ${leastCost.name}
   Cost Index: ${leastCost.cost}/100
   Location: ${leastCost.location}
   Energy Source: ${leastCost.renewable}

🌱 LOWEST CARBON FOOTPRINT:
   ${leastCarbon.name}
   Carbon Index: ${leastCarbon.carbon}/100
   Location: ${leastCarbon.location}
   Energy Source: ${leastCarbon.renewable}

🚛 BEST LOGISTICS ACCESS:
   ${bestLogistics.map(site => `${site.name} (${site.location})`).join('\n   ')}

📊 OVERALL AVERAGES:
   Average Cost Index: ${avgCost}/100
   Average Carbon Index: ${avgCarbon}/100

🎯 RECOMMENDATION:
   ${leastCarbon.name} offers the best environmental impact
   while ${leastCost.name} provides optimal cost efficiency.`

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