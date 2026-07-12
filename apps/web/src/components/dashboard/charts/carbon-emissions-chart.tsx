"use client"


import { GenericBarChart } from "@/components/ui/generic-bar-chart"
import type { ChartConfig } from "@/components/ui/chart"

const chartData = [
  { period: "Q1 '25", emissions: 2400 },
  { period: "Q2 '25", emissions: 2350 },
  { period: "Q3 '25", emissions: 2300 },
  { period: "Q4 '25", emissions: 2150 },
  { period: "Q1 '26", emissions: 2100 },
  { period: "Q2 '26", emissions: 1950 },
  { period: "Q3 '26", emissions: 1842 }
]

const chartConfig = {
  emissions: {
    label: "Emissions (tCO2e)",
    color: "var(--chart-1)",
  },
} satisfies ChartConfig

export function CarbonEmissionsChart() {
  return (
    <GenericBarChart
      data={chartData}
      config={chartConfig}
      xAxisKey="period"
      className="aspect-auto h-[250px] w-full"
      bars={[
        { dataKey: "emissions", radius: [4, 4, 0, 0], maxBarSize: 40 }
      ]}
    />
  )
}
