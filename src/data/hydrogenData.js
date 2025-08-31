// Existing Hydrogen Plants Data (from CSV)
export const existingPlants = [
  {
    id: 1,
    name: "BPCL Green Hydrogen Pilot",
    city: "Bina, Madhya Pradesh",
    lat: 24.183,
    lng: 78.203,
    capacity: "20 MW",
    type: "existing",
    status: "Announced",
    cost: 85,
    carbon: 15,
    coordinates: "24.183°N, 78.203°E",
    description: "BPCL's pioneering green hydrogen pilot project at Bina refinery, focusing on refinery applications with 3,102.5 tonnes H2 per annum capacity."
  },
  {
    id: 2,
    name: "HPCL Green Hydrogen Plant",
    city: "Visakhapatnam, Andhra Pradesh",
    lat: 17.686,
    lng: 83.218,
    capacity: "2.4 MW",
    type: "existing",
    status: "Under Construction",
    cost: 88,
    carbon: 18,
    coordinates: "17.686°N, 83.218°E",
    description: "HPCL's green hydrogen facility at Visakhapatnam refinery with 370 tonnes per annum capacity, scheduled for commissioning."
  },
  {
    id: 3,
    name: "GIPCL Green Hydrogen Project",
    city: "Gujarat",
    lat: 22.258,
    lng: 71.192,
    capacity: "15 MW",
    type: "existing",
    status: "Announced",
    cost: 82,
    carbon: 20,
    coordinates: "22.258°N, 71.192°E",
    description: "Gujarat Industrial Power Company's 15 MW green hydrogen project for chemical industry applications with 2,354.2 tonnes annual capacity."
  },
  {
    id: 4,
    name: "OIL Jorhat AEM Electrolyser",
    city: "Jorhat, Assam",
    lat: 26.757,
    lng: 94.203,
    capacity: "0.1 MW",
    type: "existing",
    status: "Commissioned",
    cost: 95,
    carbon: 8,
    coordinates: "26.757°N, 94.203°E",
    description: "Oil India's commissioned electrolyser at Jorhat pump station for natural gas blending with 3.6 tonnes annual capacity."
  },
  {
    id: 5,
    name: "NTPC Kawas City Gas",
    city: "Surat, Gujarat",
    lat: 21.17,
    lng: 72.831,
    capacity: "0.05 MW",
    type: "existing",
    status: "Commissioned",
    cost: 90,
    carbon: 5,
    coordinates: "21.17°N, 72.831°E",
    description: "India's first green hydrogen blending operation with PNG network at NTPC Kawas, producing 0.7 tonnes annually."
  },
  {
    id: 6,
    name: "NTPC Vindhyachal Green Methanol",
    city: "Vindhyachal, Madhya Pradesh",
    lat: 24.1,
    lng: 82.65,
    capacity: "5 MW",
    type: "existing",
    status: "Under Construction",
    cost: 78,
    carbon: 12,
    coordinates: "24.1°N, 82.65°E",
    description: "NTPC's green hydrogen facility for methanol production from carbon capture at Vindhyachal with 730 tonnes annual capacity."
  },
  {
    id: 7,
    name: "ACME Bikaner Green Hydrogen",
    city: "Bikaner, Rajasthan",
    lat: 28.022,
    lng: 73.311,
    capacity: "6.44 MW",
    type: "existing",
    status: "Commissioned",
    cost: 85,
    carbon: 10,
    coordinates: "28.022°N, 73.311°E",
    description: "ACME's commissioned green hydrogen and ammonia plant for fertilizer applications with 321.2 tonnes annual capacity."
  },
  {
    id: 8,
    name: "NTPC Leh Fuelling Station",
    city: "Leh, Ladakh",
    lat: 34.152,
    lng: 77.577,
    capacity: "0.8 MW",
    type: "existing",
    status: "Under Construction",
    cost: 110,
    carbon: 3,
    coordinates: "34.152°N, 77.577°E",
    description: "NTPC's green hydrogen fuelling station project in Leh for mobility applications with 29.2 tonnes annual capacity."
  },
  {
    id: 9,
    name: "Hygenco Ujjain Demo Plant",
    city: "Ujjain (Makone), Madhya Pradesh",
    lat: 23.176,
    lng: 75.788,
    capacity: "Research Scale",
    type: "existing",
    status: "Commissioned",
    cost: 75,
    carbon: 6,
    coordinates: "23.176°N, 75.788°E",
    description: "India's first truly green hydrogen demonstration plant by Hygenco for research and development purposes."
  },
  {
    id: 10,
    name: "NTPC Ramagundam Green Methanol",
    city: "Ramagundam, Telangana",
    lat: 18.8,
    lng: 79.45,
    capacity: "23.3 MW",
    type: "existing",
    status: "Announced",
    cost: 80,
    carbon: 14,
    coordinates: "18.8°N, 79.45°E",
    description: "NTPC-Siemens-Fichtner collaboration for green methanol production from carbon capture with 3,650 tonnes annual capacity."
  },
  {
    id: 11,
    name: "IOCL Panipat Green Hydrogen JV",
    city: "Panipat, Haryana",
    lat: 29.39,
    lng: 76.963,
    capacity: "100 MW",
    type: "existing",
    status: "Announced",
    cost: 88,
    carbon: 16,
    coordinates: "29.39°N, 76.963°E",
    description: "IOCL-L&T-ReNew joint venture for green hydrogen blending with grey hydrogen, 10,000 tonnes annual capacity."
  },
  {
    id: 12,
    name: "IOCL Mathura Green Hydrogen JV",
    city: "Mathura, Uttar Pradesh",
    lat: 27.492,
    lng: 77.673,
    capacity: "31.9 MW",
    type: "existing",
    status: "Announced",
    cost: 85,
    carbon: 18,
    coordinates: "27.492°N, 77.673°E",
    description: "IOCL-L&T-ReNew joint venture at Mathura refinery for hydrogen blending with 5,000 tonnes annual capacity."
  },
  {
    id: 13,
    name: "Mahagenco Bhusawal Project",
    city: "Bhusawal, Maharashtra",
    lat: 21.046,
    lng: 75.787,
    capacity: "0.1 MW",
    type: "existing",
    status: "Announced",
    cost: 92,
    carbon: 12,
    coordinates: "21.046°N, 75.787°E",
    description: "Maharashtra State Power Generation Company's green hydrogen project for grey hydrogen blending with 15.75 tonnes annual capacity."
  },
  {
    id: 14,
    name: "Ayana-Greenstat Bangalore Pilot",
    city: "Bangalore, Karnataka",
    lat: 12.971,
    lng: 77.594,
    capacity: "Demo Scale",
    type: "existing",
    status: "Announced",
    cost: 90,
    carbon: 8,
    coordinates: "12.971°N, 77.594°E",
    description: "Ayana Renewable Power and Greenstat collaboration for green hydrogen demonstration plant in Bangalore."
  },
  {
    id: 15,
    name: "Fusion Fuel-BGR Cuddalore",
    city: "Cuddalore, Tamil Nadu",
    lat: 11.75,
    lng: 79.75,
    capacity: "Demo Scale",
    type: "existing",
    status: "Announced",
    cost: 88,
    carbon: 10,
    coordinates: "11.75°N, 79.75°E",
    description: "Fusion Fuel Green and BGR Energy Systems demonstration plant for green hydrogen technology development."
  }
];

// Optimal Predicted Sites (from potential sites CSV with low cost/carbon criteria)
export const optimalSites = [
  {
    id: 16,
    name: "Kutch Green Hydrogen Hub",
    city: "Kutch, Gujarat",
    lat: 23.733732,
    lng: 69.859741,
    capacity: "5.0 GW Potential",
    type: "prediction",
    status: "Predicted Optimal",
    cost: 65, // Low cost
    carbon: 8, // Low carbon
    coordinates: "23.734°N, 69.860°E",
    description: "Optimal site with high wind+solar resources, coastal port access, and industrial clusters for exports. Excellent cost-carbon efficiency ratio.",
    analysis: "Best overall cost-carbon balance with export potential"
  },
  {
    id: 17,
    name: "Hazira Industrial Complex",
    city: "Hazira, Gujarat",
    lat: 21.132202,
    lng: 72.75294,
    capacity: "3.5 GW Potential",
    type: "prediction",
    status: "Predicted Optimal",
    cost: 70, // Low cost
    carbon: 12,
    coordinates: "21.132°N, 72.753°E",
    description: "Major industrial cluster with port & pipeline access, proximity to refineries and steel plants. Strong infrastructure foundation.",
    analysis: "Low cost with existing industrial infrastructure"
  },
  {
    id: 18,
    name: "Kakinada Green Port",
    city: "Kakinada, Andhra Pradesh",
    lat: 16.989065,
    lng: 82.247467,
    capacity: "4.0 GW Potential",
    type: "prediction",
    status: "Predicted Optimal",
    cost: 72,
    carbon: 9, // Low carbon
    coordinates: "16.989°N, 82.247°E",
    description: "Coastal port with proposed ammonia/fertilizer demand and nearby renewable energy resources. Excellent for export logistics.",
    analysis: "Low carbon emissions with port connectivity"
  },
  {
    id: 19,
    name: "Visakhapatnam Industrial Hub",
    city: "Visakhapatnam, Andhra Pradesh",
    lat: 17.686815,
    lng: 83.218483,
    capacity: "3.8 GW Potential",
    type: "prediction",
    status: "Predicted Optimal",
    cost: 75,
    carbon: 10, // Low carbon
    coordinates: "17.687°N, 83.218°E",
    description: "Major port with refineries, steel demand, and good renewable energy access. Established industrial ecosystem.",
    analysis: "Low carbon with established industrial base"
  },
  {
    id: 20,
    name: "Tuticorin Green Export Hub",
    city: "Tuticorin, Tamil Nadu",
    lat: 8.764166,
    lng: 78.134834,
    capacity: "4.2 GW Potential",
    type: "prediction",
    status: "Predicted Optimal",
    cost: 68, // Low cost
    carbon: 7, // Low carbon
    coordinates: "8.764°N, 78.135°E",
    description: "Deep-water port with industrial demand and access to wind + solar resources. Strategic location for international exports.",
    analysis: "Excellent cost-carbon efficiency with export potential"
  },
  {
    id: 21,
    name: "Paradip Industrial Port",
    city: "Paradip, Odisha",
    lat: 20.316551,
    lng: 86.611366,
    capacity: "3.2 GW Potential",
    type: "prediction",
    status: "Predicted Optimal",
    cost: 73,
    carbon: 11,
    coordinates: "20.317°N, 86.611°E",
    description: "Major port with steel & fertilizer demand, proximity to industrial clusters. Strong logistics infrastructure.",
    analysis: "Balanced cost-carbon profile with industrial demand"
  },
  {
    id: 22,
    name: "Barmer Solar Hydrogen Zone",
    city: "Barmer, Rajasthan",
    lat: 26.914,
    lng: 71.475,
    capacity: "6.0 GW Potential",
    type: "prediction",
    status: "Predicted Optimal",
    cost: 62, // Very low cost
    carbon: 5, // Very low carbon
    coordinates: "26.914°N, 71.475°E",
    description: "Thar Desert location with very high solar resources and large contiguous land availability for PV-electrolyser plants.",
    analysis: "Lowest cost and carbon footprint - highest efficiency"
  },
  {
    id: 23,
    name: "Mangaluru Port Complex",
    city: "Mangaluru, Karnataka",
    lat: 12.915605,
    lng: 74.855965,
    capacity: "2.8 GW Potential",
    type: "prediction",
    status: "Predicted Optimal",
    cost: 76,
    carbon: 9, // Low carbon
    coordinates: "12.916°N, 74.856°E",
    description: "Port with industrial demand for fertilizer/refinery applications and good renewable energy potential nearby.",
    analysis: "Low carbon emissions with port infrastructure"
  }
];

// Combined data for easy access
export const allSites = [...existingPlants, ...optimalSites];