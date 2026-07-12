"use client"


import { GenericLineChart } from "@/components/ui/generic-line-chart"
import type { ChartConfig } from "@/components/ui/chart"

const chartData = [
  { month: "Feb", overall: 75, env: 80, soc: 70, gov: 75 },
  { month: "Mar", overall: 76, env: 81, soc: 71, gov: 76 },
  { month: "Apr", overall: 78, env: 83, soc: 73, gov: 78 },
  { month: "May", overall: 79, env: 84, soc: 74, gov: 79 },
  { month: "Jun", overall: 81, env: 86, soc: 75, gov: 81 },
  { month: "Jul", overall: 82, env: 88, soc: 76, gov: 82 }
]

const chartConfig = {
  overall: {
    label: "Overall",
    color: "var(--foreground)",
  },
  env: {
    label: "Environmental",
    color: "var(--chart-1)",
  },
  soc: {
    label: "Social",
    color: "var(--chart-2)",
  },
  gov: {
    label: "Governance",
    color: "var(--chart-3)",
  }
} satisfies ChartConfig

export function EsgPerformanceChart() {
  return (
    <GenericLineChart
      data={chartData}
      config={chartConfig}
      xAxisKey="month"
      yAxisDomain={[60, 100]}
      lines={[
        { dataKey: "overall", strokeWidth: 2.5, dot: { r: 4 }, activeDot: { r: 6 } },
        { dataKey: "env", strokeWidth: 2 },
        { dataKey: "soc", strokeWidth: 2 },
        { dataKey: "gov", strokeWidth: 2 },
      ]}
    />
  )
}
