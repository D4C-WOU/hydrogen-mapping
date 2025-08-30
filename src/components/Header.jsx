import { useState } from "react"
import { useNavigate } from "react-router-dom"
import jsPDF from "jspdf"

export default function Header({ analysisResult }) {
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleLogin = () => {
    navigate("/auth")
  }

  const handleExport = () => {
    const doc = new jsPDF()
    
    // Header
    doc.setFontSize(20)
    doc.setFont(undefined, 'bold')
    doc.text("India Green Hydrogen Infrastructure Report", 20, 25)
    
    // Subtitle
    doc.setFontSize(12)
    doc.setFont(undefined, 'normal')
    doc.text("National Green Hydrogen Mission - Infrastructure Analysis", 20, 35)
    
    // Date
    const currentDate = new Date().toLocaleDateString('en-IN')
    doc.text(`Generated on: ${currentDate}`, 20, 45)
    
    // Analysis results
    doc.setFontSize(14)
    doc.setFont(undefined, 'bold')
    doc.text("Analysis Results:", 20, 60)
    
    doc.setFontSize(10)
    doc.setFont(undefined, 'normal')
    const analysisText = analysisResult || "No analysis has been run yet. Please run the land analysis to generate results."
    
    // Split text into lines to fit page width
    const splitText = doc.splitTextToSize(analysisText, 170)
    doc.text(splitText, 20, 70)
    
    // Additional info
    doc.setFontSize(12)
    doc.setFont(undefined, 'bold')
    doc.text("Key Infrastructure Statistics:", 20, 120)
    
    doc.setFontSize(10)
    doc.setFont(undefined, 'normal')
    doc.text("• Total Operational Plants: 15 facilities", 20, 135)
    doc.text("• Combined Capacity: 8.2 MTPA", 20, 145)
    doc.text("• Potential Sites Identified: 25 locations", 20, 155)
    doc.text("• Estimated Investment: ₹2.4 Lakh Crores", 20, 165)
    
    doc.save("India_Hydrogen_Infrastructure_Report.pdf")
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="header slide-in-top">
      <div className="header-logo">
        <span className="header-logo-emoji">🇮🇳</span>
        <div className="header-text">
          <h1 className="header-title">India Hydrogen Dashboard</h1>
          <span className="header-subtitle">National Green Hydrogen Mission</span>
        </div>
      </div>

      {/* Desktop Navigation */}
      <nav className="header-nav desktop-nav">
        <button className="header-button hover-lift focus-ring">
          🏠 <span>Home</span>
        </button>
        <button className="header-button hover-lift focus-ring">
          📊 <span>Analytics</span>
        </button>
        <button className="header-button hover-lift focus-ring">
          🗺️ <span>Map View</span>
        </button>
        <button 
          className="header-button hover-lift focus-ring" 
          onClick={handleLogin}
        >
          🔐 <span>Login</span>
        </button>
        <button 
          className="header-button header-primary hover-lift focus-ring" 
          onClick={handleExport}
        >
          📤 <span>Export Report</span>
        </button>
      </nav>

      {/* Mobile Menu Button */}
      <button 
        className="mobile-menu-btn"
        onClick={toggleMenu}
        aria-label="Toggle menu"
      >
        <span className={`hamburger ${isMenuOpen ? 'active' : ''}`}>
          <span></span>
          <span></span>
          <span></span>
        </span>
      </button>

      {/* Mobile Navigation */}
      <nav className={`mobile-nav ${isMenuOpen ? 'open' : ''}`}>
        <button className="header-button mobile-nav-item" onClick={() => setIsMenuOpen(false)}>
          🏠 Home
        </button>
        <button className="header-button mobile-nav-item" onClick={() => setIsMenuOpen(false)}>
          📊 Analytics
        </button>
        <button className="header-button mobile-nav-item" onClick={() => setIsMenuOpen(false)}>
          🗺️ Map View
        </button>
        <button 
          className="header-button mobile-nav-item" 
          onClick={() => { handleLogin(); setIsMenuOpen(false); }}
        >
          🔐 Login
        </button>
        <button 
          className="header-button header-primary mobile-nav-item" 
          onClick={() => { handleExport(); setIsMenuOpen(false); }}
        >
          📤 Export Report
        </button>
      </nav>

      {/* Mobile overlay */}
      {isMenuOpen && (
        <div 
          className="mobile-overlay"
          onClick={() => setIsMenuOpen(false)}
        />
      )}
    </header>
  )
}