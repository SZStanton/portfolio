// Art deco geometry as plain maths, kept out of the components that draw it.
// Angles are degrees clockwise from the positive x-axis, so 90 points straight down.

const rad = (deg: number) => (deg * Math.PI) / 180;

type SunburstOptions = {
  cx: number;
  cy: number;
  radius: number;
  count: number;
  from: number;
  to: number;
  // How much of each ray's slot is solid, so 0.45 leaves the rest as the gap.
  duty?: number;
  // Length multiplier on every other ray. The uneven lengths are what read as deco.
  alternate?: number;
};

// Returns one `d` for the whole fan, so it draws as a single path rather than N shapes.
export function sunburstPath({
  cx,
  cy,
  radius,
  count,
  from,
  to,
  duty = 0.45,
  alternate = 0.72,
}: SunburstOptions): string {
  const step = (to - from) / count;
  const wedges: string[] = [];

  for (let i = 0; i < count; i += 1) {
    const start = from + i * step;
    const end = start + step * duty;
    const r = i % 2 === 1 ? radius * alternate : radius;

    const x1 = cx + r * Math.cos(rad(start));
    const y1 = cy + r * Math.sin(rad(start));
    const x2 = cx + r * Math.cos(rad(end));
    const y2 = cy + r * Math.sin(rad(end));

    wedges.push(
      `M${cx} ${cy}L${x1.toFixed(2)} ${y1.toFixed(2)}L${x2.toFixed(2)} ${y2.toFixed(2)}Z`,
    );
  }

  return wedges.join('');
}

type FanOptions = {
  cx: number;
  cy: number;
  count: number;
  rMin: number;
  rMax: number;
};

// Nested semicircles sharing one origin, the repeating unit of a deco fan border.
export function fanPath({ cx, cy, count, rMin, rMax }: FanOptions): string {
  const step = (rMax - rMin) / count;
  const arcs: string[] = [];

  for (let i = 1; i <= count; i += 1) {
    const r = (rMin + i * step).toFixed(2);
    // Sweep 1 bulges the arc upwards, since y grows downwards in SVG.
    arcs.push(
      `M${(cx - Number(r)).toFixed(2)} ${cy}A${r} ${r} 0 0 1 ${(cx + Number(r)).toFixed(2)} ${cy}`,
    );
  }

  return arcs.join('');
}
