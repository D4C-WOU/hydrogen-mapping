import { useNavigate } from "react-router-dom"
import jsPDF from "jspdf"

export default function Header({ analysisResult }) {
  const navigate = useNavigate()

  const handleLogin = () => {
    navigate("/auth")
  }

  const handleExport = () => {
    const doc = new jsPDF()
    doc.setFontSize(18)
    doc.text("Hydrogen Land Analysis Report", 20, 20)
    doc.setFontSize(12)
    doc.text(analysisResult || "No analysis run yet.", 20, 40)
    doc.save("Hydrogen_Analysis_Report.pdf")
  }

  return (
    <header className="header slide-in-top">
      <div className="header-logo">
        <span className="header-logo-emoji">🇮🇳</span>
        <div>
          <h1 className="header-title">India Hydrogen Dashboard</h1>
          <span className="header-subtitle">National Green Hydrogen Mission</span>
        </div>
      </div>

      <div className="header-actions">
        <button className="header-button header-big">🏠 Home</button>
        <button className="header-button header-big" onClick={handleLogin}>🔐 Login</button>
        <button className="header-button header-big" onClick={handleExport}>📤 Export</button>
      </div>
    </header>
  )
}
