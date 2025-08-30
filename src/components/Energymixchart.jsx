import { ResponsivePie } from "@nivo/pie"

export default function EnergyMixChart() {
  const data = [
    { 
      id: "Solar", 
      label: "Solar Power",
      value: 35, 
      color: "#A1D1B1" 
    },
    { 
      id: "Wind", 
      label: "Wind Power",
      value: 28, 
      color: "#8BC49C" 
    },
    { 
      id: "Hydro", 
      label: "Hydroelectric",
      value: 22, 
      color: "#6ee7b7" 
    },
    { 
      id: "Hydrogen", 
      label: "Green Hydrogen",
      value: 15, 
      color: "#1C2529" 
    },
  ]

  return (
    <div style={{ height: 280 }}>
      <ResponsivePie
        data={data}
        margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
        innerRadius={0.6}
        padAngle={2}
        cornerRadius={6}
        activeOuterRadiusOffset={8}
        colors={{ datum: 'data.color' }}
        borderWidth={2}
        borderColor={{ from: 'color', modifiers: [['darker', 0.3]] }}
        enableArcLinkLabels={false}
        arcLabelsSkipAngle={10}
        arcLabelsTextColor="#ffffff"
        arcLabelsRadiusOffset={0.55}
        theme={{
          background: 'transparent',
          text: {
            fontSize: 12,
            fill: '#A1D1B1',
            fontWeight: 600
          },
          tooltip: {
            container: {
              background: 'rgba(28, 37, 41, 0.95)',
              color: '#ffffff',
              fontSize: '14px',
              borderRadius: '8px',
              boxShadow: '0 8px 25px rgba(0, 0, 0, 0.3)',
              border: '1px solid rgba(161, 209, 177, 0.2)',
              backdropFilter: 'blur(20px)'
            }
          }
        }}
        animate={true}
        motionConfig="gentle"
        transitionMode="centerRadius"
        legends={[
          {
            anchor: 'bottom',
            direction: 'row',
            justify: false,
            translateX: 0,
            translateY: 20,
            itemsSpacing: 0,
            itemWidth: 60,
            itemHeight: 18,
            itemTextColor: '#A1D1B1',
            itemDirection: 'left-to-right',
            itemOpacity: 1,
            symbolSize: 12,
            symbolShape: 'circle',
            effects: [
              {
                on: 'hover',
                style: {
                  itemTextColor: '#B8E0C4'
                }
              }
            ]
          }
        ]}
      />
    </div>
  )
}