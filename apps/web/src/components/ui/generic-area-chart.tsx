"use client"


import { Area, AreaChart, CartesianGrid, XAxis, YAxis } from "recharts"
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart"

export interface GenericAreaChartProps {
  data: any[]
  config: ChartConfig
  xAxisKey: string
  areas: {
    dataKey: string
    fillOpacity?: number
    stackId?: string
  }[]
  className?: string
  hideGrid?: boolean
  yAxisDomain?: [number, number] | ["auto", "auto"]
}

export function GenericAreaChart({
  data,
  config,
  xAxisKey,
  areas,
  className = "aspect-auto h-[250px] w-full",
  hideGrid = false,
  yAxisDomain,
}: GenericAreaChartProps) {
  return (
    <ChartContainer config={config} className={className}>
      <AreaChart
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
        {areas.map((area) => (
          <Area
            key={area.dataKey}
            type="monotone"
            dataKey={area.dataKey}
            stackId={area.stackId}
            stroke={`var(--color-${area.dataKey})`}
            fill={`var(--color-${area.dataKey})`}
            fillOpacity={area.fillOpacity ?? 0.4}
          />
        ))}
      </AreaChart>
    </ChartContainer>
  )
}
