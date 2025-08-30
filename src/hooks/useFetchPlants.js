import { useState, useEffect } from "react"
import plantsData from "../data/hydrogenPlant.json"

export default function useFetchPlants() {
  const [plants, setPlants] = useState([])

  useEffect(() => {
    setPlants(plantsData)
  }, [])

  return plants
}
