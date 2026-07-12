"use client"

import { Bar, BarChart, CartesianGrid, XAxis } from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

export interface GenericBarChartProps {
  data: any[]
  config: ChartConfig
  xAxisKey: string
  bars: {
    dataKey: string
    radius?: [number, number, number, number] | number
    maxBarSize?: number
  }[]
  className?: string
  hideGrid?: boolean
}

export function GenericBarChart({
  data,
  config,
  xAxisKey,
  bars,
  className = "aspect-auto h-[250px] w-full",
  hideGrid = false,
}: GenericBarChartProps) {
  return (
    <ChartContainer config={config} className={className}>
      <BarChart
        accessibilityLayer
        data={data}
        margin={{ left: 0, right: 0, top: 0, bottom: 0 }}
      >
        {!hideGrid && <CartesianGrid vertical={false} strokeDasharray="3 3" className="stroke-muted" />}
        <XAxis
          dataKey={xAxisKey}
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          className="text-xs font-medium"
        />
        <ChartTooltip
          cursor={{ fill: "var(--muted)", opacity: 0.5 }}
          content={<ChartTooltipContent />}
        />
        {bars.map((bar) => (
          <Bar
            key={bar.dataKey}
            dataKey={bar.dataKey}
            fill={`var(--color-${bar.dataKey})`}
            radius={bar.radius ?? [4, 4, 0, 0]}
            maxBarSize={bar.maxBarSize}
          />
        ))}
      </BarChart>
    </ChartContainer>
  )
}
