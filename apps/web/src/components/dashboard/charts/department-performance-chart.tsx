"use client"


import { GenericAreaChart } from "@/components/ui/generic-area-chart"
import type { ChartConfig } from "@/components/ui/chart"

const chartData = [
  { month: "Jan", hr: 70, it: 75, r_and_d: 72 },
  { month: "Feb", hr: 72, it: 78, r_and_d: 75 },
  { month: "Mar", hr: 78, it: 80, r_and_d: 79 },
  { month: "Apr", hr: 82, it: 81, r_and_d: 82 },
  { month: "May", hr: 85, it: 81, r_and_d: 84 },
  { month: "Jun", hr: 88, it: 82, r_and_d: 85 },
]

const chartConfig = {
  hr: {
    label: "HR",
    color: "hsl(var(--chart-1))",
  },
  it: {
    label: "IT",
    color: "hsl(var(--chart-2))",
  },
  r_and_d: {
    label: "R&D",
    color: "hsl(var(--chart-3))",
  },
} satisfies ChartConfig

export function DepartmentPerformanceChart() {
  return (
    <GenericAreaChart
      data={chartData}
      config={chartConfig}
      xAxisKey="month"
      yAxisDomain={[60, 100]}
      areas={[
        { dataKey: "r_and_d", stackId: "1", fillOpacity: 0.4 },
        { dataKey: "it", stackId: "1", fillOpacity: 0.4 },
        { dataKey: "hr", stackId: "1", fillOpacity: 0.4 },
      ]}
    />
  )
}
