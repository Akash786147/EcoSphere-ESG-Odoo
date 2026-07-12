"use client"


import { Cell, Pie, PieChart as RechartsPieChart } from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

export interface GenericPieChartProps {
  data: any[]
  config: ChartConfig
  dataKey: string
  nameKey: string
  className?: string
  innerRadius?: number
  strokeWidth?: number
}

export function GenericPieChart({
  data,
  config,
  dataKey,
  nameKey,
  className = "mx-auto aspect-square max-h-[200px]",
  innerRadius = 60,
  strokeWidth = 5,
}: GenericPieChartProps) {
  return (
    <ChartContainer config={config} className={className}>
      <RechartsPieChart>
        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
        <Pie
          data={data}
          dataKey={dataKey}
          nameKey={nameKey}
          innerRadius={innerRadius}
          strokeWidth={strokeWidth}
        >
          {data.map((entry, index) => {
            const chartConfigKey = entry[nameKey] as keyof typeof config
            const color = config[chartConfigKey]?.color || `hsl(var(--chart-${(index % 5) + 1}))`
            return <Cell key={`cell-${index}`} fill={color} />
          })}
        </Pie>
      </RechartsPieChart>
    </ChartContainer>
  )
}
