interface TrendPoint {
  label: string;
  value: number;
}

interface MiniTrendLineProps {
  points: TrendPoint[];
  color?: string;
  valueSuffix?: string;
}

const X_START = 40;
const X_END = 600;
const Y_TOP = 20;
const Y_BOTTOM = 170;

export function MiniTrendLine({ points, color = "var(--primary)", valueSuffix = "%" }: MiniTrendLineProps) {
  const values = points.map((p) => p.value);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const step = (X_END - X_START) / (points.length - 1 || 1);

  const coords = points.map((p, i) => {
    const x = X_START + step * i;
    const y = Y_BOTTOM - ((p.value - min) / range) * (Y_BOTTOM - Y_TOP);
    return { x, y, value: p.value };
  });

  const linePoints = coords.map((c) => `${c.x},${c.y}`).join(" ");
  const areaPoints = `${X_START},${Y_BOTTOM} ${linePoints} ${X_END},${Y_BOTTOM}`;
  const last = coords[coords.length - 1];

  return (
    <svg viewBox="0 0 640 200" className="w-full h-auto">
      <polygon points={areaPoints} fill={color} opacity={0.08} />
      <polyline points={linePoints} fill="none" stroke={color} strokeWidth={2} />
      {last && <circle cx={last.x} cy={last.y} r={4} fill={color} />}
      {last && (
        <text x={last.x - 14} y={last.y - 10} className="text-[11px] font-semibold" fill={color}>
          {last.value}
          {valueSuffix}
        </text>
      )}
      <g className="text-[10.5px] fill-muted-foreground">
        {coords.map((c, i) => (
          <text key={points[i].label} x={c.x - 10} y={192}>
            {points[i].label}
          </text>
        ))}
      </g>
    </svg>
  );
}
