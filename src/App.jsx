import { useState } from "react"
import Header from "./components/Header"
import Sidebar from "./components/Sidebar"
import Mapview from "./components/Mapview"
import "./index.css"

// Example dataset for analysis
const landData = [
  { name: "Land A", cost: 100, carbon: 30 },
  { name: "Land B", cost: 70, carbon: 40 },
  { name: "Land C", cost: 90, carbon: 25 },
]

export default function App() {
  const [view, setView] = useState("analysis")
  const [analysisResult, setAnalysisResult] = useState("")

  const runAnalysis = () => {
    const leastCost = landData.reduce((a, b) => (a.cost < b.cost ? a : b))
    const leastCarbon = landData.reduce((a, b) => (a.carbon < b.carbon ? a : b))

    const result = `Least Cost Land → ${leastCost.name} (₹${leastCost.cost})
Least Carbon Emission Land → ${leastCarbon.name} (${leastCarbon.carbon} units)`

    setAnalysisResult(result)
  }

  return (
    <div className="app">
      {/* Header gets analysis result for export */}
      <Header analysisResult={analysisResult} />

      {/* Body layout */}
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
