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
    doc.text("Green Hydrogen Mapping - Infrastructure Report", 20, 25)
    
    // Subtitle
    doc.setFontSize(12)
    doc.setFont(undefined, 'normal')
    doc.text("National Green Hydrogen Mission - Site Analysis Report", 20, 35)
    
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
    
    let yPosition = 90
    
    // Existing Plants Section
    doc.setFontSize(12)
    doc.setFont(undefined, 'bold')
    doc.text("Existing Hydrogen Plants:", 20, yPosition)
    
    doc.setFontSize(10)
    doc.setFont(undefined, 'normal')
    
    yPosition += 15
    existingPlants.slice(0, 8).forEach((plant, index) => {
      doc.text(`${index + 1}. ${plant.name} - ${plant.city}`, 25, yPosition)
      doc.text(`   Capacity: ${plant.capacity} | Status: ${plant.status}`, 30, yPosition + 6)
      doc.text(`   Cost Index: ${plant.cost}/100 | Carbon Index: ${plant.carbon}/100`, 30, yPosition + 12)
      yPosition += 18
    })
    
    // Add new page for optimal sites
    doc.addPage()
    yPosition = 25
    
    // Optimal Sites Section with comprehensive data
    doc.setFontSize(12)
    doc.setFont(undefined, 'bold')
    doc.text("Optimal Development Sites - Detailed Analysis:", 20, yPosition)
    
    doc.setFontSize(10)
    doc.setFont(undefined, 'normal')
    yPosition += 15
    
    optimalSites.forEach((site, index) => {
      doc.text(`${index + 1}. ${site.name} - ${site.city}`, 25, yPosition)
      doc.text(`   Location: ${site.coordinates}`, 30, yPosition + 6)
      doc.text(`   Capacity Potential: ${site.capacity}`, 30, yPosition + 12)
      doc.text(`   Cost Index: ${site.cost}/100 | Carbon Index: ${site.carbon}/100`, 30, yPosition + 18)
      doc.text(`   Status: ${site.status}`, 30, yPosition + 24)
      
      // Split long analysis text
      const analysisLines = doc.splitTextToSize(`   Analysis: ${site.analysis}`, 160)
      doc.text(analysisLines, 30, yPosition + 30)
      
      // Split long description text
      const descriptionLines = doc.splitTextToSize(`   Description: ${site.description}`, 160)
      doc.text(descriptionLines, 30, yPosition + 36 + (analysisLines.length * 6))
      
      yPosition += 50 + (analysisLines.length * 6) + (descriptionLines.length * 6)
      
      // Add new page if needed
      if (yPosition > 250) {
        doc.addPage()
        yPosition = 25
      }
    })
    
    // Add new page for statistics
    doc.addPage()
    yPosition = 25
    
    // Key Statistics
    doc.setFontSize(12)
    doc.setFont(undefined, 'bold')
    doc.text("Comprehensive Infrastructure Statistics:", 20, yPosition)
    
    doc.setFontSize(10)
    doc.setFont(undefined, 'normal')
    yPosition += 15
    
    // Existing Plants Statistics
    doc.text("EXISTING PLANTS STATISTICS:", 20, yPosition)
    yPosition += 10
    doc.text(`• Total Operational/Announced Plants: ${existingPlants.length} facilities`, 25, yPosition)
    doc.text(`• Average Cost Index: ${(existingPlants.reduce((sum, p) => sum + p.cost, 0) / existingPlants.length).toFixed(1)}/100`, 25, yPosition + 8)
    doc.text(`• Average Carbon Index: ${(existingPlants.reduce((sum, p) => sum + p.carbon, 0) / existingPlants.length).toFixed(1)}/100`, 25, yPosition + 16)
    doc.text(`• Most Cost-Effective Existing: ${existingPlants.sort((a, b) => a.cost - b.cost)[0].name}`, 25, yPosition + 24)
    doc.text(`• Lowest Carbon Existing: ${existingPlants.sort((a, b) => a.carbon - b.carbon)[0].name}`, 25, yPosition + 32)
    
    yPosition += 50
    
    // Optimal Sites Statistics
    doc.text("OPTIMAL SITES STATISTICS:", 20, yPosition)
    yPosition += 10
    doc.text(`• Total Optimal Sites Identified: ${optimalSites.length} locations`, 25, yPosition)
    doc.text(`• Average Cost Index: ${(optimalSites.reduce((sum, p) => sum + p.cost, 0) / optimalSites.length).toFixed(1)}/100`, 25, yPosition + 8)
    doc.text(`• Average Carbon Index: ${(optimalSites.reduce((sum, p) => sum + p.carbon, 0) / optimalSites.length).toFixed(1)}/100`, 25, yPosition + 16)
    doc.text(`• Most Cost-Effective Optimal: ${optimalSites.sort((a, b) => a.cost - b.cost)[0].name}`, 25, yPosition + 24)
    doc.text(`• Lowest Carbon Optimal: ${optimalSites.sort((a, b) => a.carbon - b.carbon)[0].name}`, 25, yPosition + 32)
    doc.text(`• Combined Potential Capacity: ${optimalSites.reduce((sum, site) => {
      const capacity = parseFloat(site.capacity.replace(/[^0-9.]/g, '')) || 0
      return sum + capacity
    }, 0).toFixed(1)} GW`, 25, yPosition + 40)
    
    yPosition += 60
    
    // Investment and Development Insights
    doc.text("INVESTMENT & DEVELOPMENT INSIGHTS:", 20, yPosition)
    yPosition += 10
    doc.text("• Estimated Total Investment Required: ₹3.8 Lakh Crores", 25, yPosition)
    doc.text("• Priority Development Regions: Gujarat, Andhra Pradesh, Rajasthan", 25, yPosition + 8)
    doc.text("• Export Potential: Coastal sites offer significant export opportunities", 25, yPosition + 16)
    doc.text("• Technology Focus: Solar-wind hybrid systems for optimal efficiency", 25, yPosition + 24)
    doc.text("• Timeline: 2025-2030 for major capacity additions", 25, yPosition + 32)
    
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
          <h1 className="header-title">Green Hydrogen Mapping</h1>
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