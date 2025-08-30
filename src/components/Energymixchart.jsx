import { ResponsivePie } from "@nivo/pie"


export default function EnergyMixChart() {
  const data = [
    { id: "Solar", value: 40 },
    { id: "Wind", value: 30 },
    { id: "Hydro", value: 20 },
    { id: "Hydrogen", value: 10 },
  ]

  return (
    <div style={{ height: 250 }}>
      <ResponsivePie
        data={data}
        margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
        innerRadius={0.5}
        padAngle={1}
        cornerRadius={5}
        colors={{ scheme: "set2" }}
        borderWidth={1}
        borderColor={{ from: "color", modifiers: [["darker", 0.2]] }}
        enableArcLinkLabels={false}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor="#333333"
      />
    </div>
  )
}
