"use client"


import { GenericPieChart } from "@/components/ui/generic-pie-chart"
import type { ChartConfig } from "@/components/ui/chart"

const chartData = [
  { name: "On Track", value: 65 },
  { name: "At Risk", value: 20 },
  { name: "Off Track", value: 15 },
]

const chartConfig = {
  value: {
    label: "Goals",
  },
  "On Track": {
    label: "On Track",
    color: "hsl(var(--chart-1))",
  },
  "At Risk": {
    label: "At Risk",
    color: "hsl(var(--chart-3))",
  },
  "Off Track": {
    label: "Off Track",
    color: "hsl(var(--destructive))",
  },
} satisfies ChartConfig

export function GoalsProgressChart() {
  return (
    <GenericPieChart
      data={chartData}
      config={chartConfig}
      dataKey="value"
      nameKey="name"
    />
  )
}
