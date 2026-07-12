"use client"


import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

export interface GenericLineChartProps {
  data: any[]
  config: ChartConfig
  xAxisKey: string
  lines: {
    dataKey: string
    strokeWidth?: number
    dot?: boolean | object
    activeDot?: boolean | object
  }[]
  className?: string
  hideGrid?: boolean
  yAxisDomain?: [number, number] | ["auto", "auto"]
}

export function GenericLineChart({
  data,
  config,
  xAxisKey,
  lines,
  className = "aspect-auto h-[250px] w-full",
  hideGrid = false,
  yAxisDomain,
}: GenericLineChartProps) {
  return (
    <ChartContainer config={config} className={className}>
      <LineChart
        accessibilityLayer
        data={data}
        margin={{ left: 0, right: 0, top: 10, bottom: 0 }}
      >
        {!hideGrid && <CartesianGrid vertical={false} strokeDasharray="3 3" className="stroke-muted" />}
        <XAxis
          dataKey={xAxisKey}
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          className="text-xs font-medium"
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          className="text-xs font-mono"
          domain={yAxisDomain}
          width={30}
        />
        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
        {lines.map((line) => (
          <Line
            key={line.dataKey}
            dataKey={line.dataKey}
            type="linear"
            stroke={`var(--color-${line.dataKey})`}
            strokeWidth={line.strokeWidth ?? 2}
            dot={line.dot ?? false}
            activeDot={line.activeDot}
          />
        ))}
      </LineChart>
    </ChartContainer>
  )
}
