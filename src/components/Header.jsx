import { useState } from "react"
import { useNavigate } from "react-router-dom"
import jsPDF from "jspdf"
import { existingPlants, optimalSites } from "../data/hydrogenData"

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
    doc.text("India Green Hydrogen Infrastructure Detailed Report", 20, 25)
    
    // Subtitle
    doc.setFontSize(12)
    doc.setFont(undefined, 'normal')
    doc.text("National Green Hydrogen Mission - Comprehensive Infrastructure Analysis", 20, 35)
    
    // Date
    const currentDate = new Date().toLocaleDateString('en-IN')
    doc.text(`Generated on: ${currentDate}`, 20, 45)
    
    // Executive Summary
    doc.setFontSize(14)
    doc.setFont(undefined, 'bold')
    doc.text("Executive Summary:", 20, 60)
    
    doc.setFontSize(10)
    doc.setFont(undefined, 'normal')
    const summaryText = `This report provides a comprehensive overview of India's green hydrogen infrastructure, 
including ${existingPlants.length} operational facilities and ${optimalSites.length} optimal locations identified 
for future development based on cost efficiency and carbon emission analysis.`
    
    const splitSummary = doc.splitTextToSize(summaryText, 170)
    doc.text(splitSummary, 20, 70)
    
    // Existing Plants Section
    doc.setFontSize(12)
    doc.setFont(undefined, 'bold')
    doc.text("Existing Hydrogen Plants:", 20, 100)
    
    doc.setFontSize(10)
    doc.setFont(undefined, 'normal')
    
    let yPosition = 115
    existingPlants.slice(0, 8).forEach((plant, index) => {
      doc.text(`${index + 1}. ${plant.name} - ${plant.city}`, 25, yPosition)
      doc.text(`   Capacity: ${plant.capacity} | Status: ${plant.status}`, 30, yPosition + 8)
      yPosition += 20
    })
    
    // Optimal Sites Section
    doc.setFontSize(12)
    doc.setFont(undefined, 'bold')
    doc.text("Optimal Development Sites:", 20, yPosition + 10)
    
    doc.setFontSize(10)
    doc.setFont(undefined, 'normal')
    yPosition += 25
    
    optimalSites.forEach((site, index) => {
      doc.text(`${index + 1}. ${site.name} - ${site.city}`, 25, yPosition)
      doc.text(`   Cost Index: ${site.cost}/100 | Carbon Index: ${site.carbon}/100`, 30, yPosition + 8)
      doc.text(`   Analysis: ${site.analysis}`, 30, yPosition + 16)
      yPosition += 25
    })
    
    // Key Statistics
    doc.setFontSize(12)
    doc.setFont(undefined, 'bold')
    doc.text("Key Infrastructure Statistics:", 20, yPosition + 10)
    
    doc.setFontSize(10)
    doc.setFont(undefined, 'normal')
    yPosition += 25
    doc.text(`• Total Operational Plants: ${existingPlants.length} facilities`, 20, yPosition)
    doc.text(`• Optimal Sites Identified: ${optimalSites.length} locations`, 20, yPosition + 10)
    doc.text("• Combined Operational Capacity: 8.2 MTPA", 20, yPosition + 20)
    doc.text("• Estimated Future Investment: ₹2.4 Lakh Crores", 20, yPosition + 30)
    
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