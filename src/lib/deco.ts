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

// Table Mountain from the city bowl, left to right: Devil's Peak, the flat table,
// Lion's Head, then Signal Hill running down to the sea. x and y both run 0 to 1.
const CAPE_TOWN: [number, number][] = [
  [0.0, 0.08],
  [0.06, 0.16],
  [0.13, 0.5],
  [0.19, 0.78],
  [0.24, 0.66],
  [0.28, 0.5],
  [0.33, 0.48],
  [0.36, 0.86],
  [0.39, 0.92],
  [0.62, 0.92],
  [0.65, 0.84],
  [0.68, 0.52],
  [0.72, 0.34],
  [0.76, 0.32],
  [0.81, 0.66],
  [0.84, 0.74],
  [0.87, 0.6],
  [0.93, 0.3],
  [1.0, 0.2],
];

// Height of the profile at x, straight line between the two control points either side.
function profileAt(x: number): number {
  for (let i = 1; i < CAPE_TOWN.length; i += 1) {
    const [x0, y0] = CAPE_TOWN[i - 1];
    const [x1, y1] = CAPE_TOWN[i];
    if (x <= x1) return y0 + ((y1 - y0) * (x - x0)) / (x1 - x0);
  }
  return CAPE_TOWN[CAPE_TOWN.length - 1][1];
}

type SkylineOptions = {
  width: number;
  height: number;
  // Tread height, as a fraction of the profile. Bigger steps read more ziggurat.
  step?: number;
  // How often the profile is sampled across the width.
  samples?: number;
};

// The profile as a staircase rather than slopes, which is what turns a mountain
// into deco. Returns one closed `d`, filled from the silhouette down to the base.
export function skylinePath({
  width,
  height,
  step = 0.07,
  samples = 200,
}: SkylineOptions): string {
  // Flip to SVG coordinates, where y grows downwards.
  const toY = (h: number) => (1 - Math.round(h / step) * step) * height;

  let last = toY(profileAt(0));
  const parts = [`M0 ${height}`, `L0 ${last.toFixed(2)}`];

  for (let i = 1; i <= samples; i += 1) {
    const x = (i / samples) * width;
    const y = toY(profileAt(i / samples));
    if (y === last) continue;

    // Tread first, then riser, so every corner stays square.
    parts.push(
      `L${x.toFixed(2)} ${last.toFixed(2)}`,
      `L${x.toFixed(2)} ${y.toFixed(2)}`,
    );
    last = y;
  }

  parts.push(`L${width} ${last.toFixed(2)}`, `L${width} ${height}`, 'Z');
  return parts.join('');
}

type BracketOptions = {
  size: number;
  lines: number;
  gap: number;
};

// Nested right angles for a corner, each arm shorter than the one outside it.
export function cornerBracket({ size, lines, gap }: BracketOptions): string {
  const arms: string[] = [];

  for (let i = 0; i < lines; i += 1) {
    const o = i * gap;
    const arm = size - i * gap * 2.2;
    if (arm <= o) break;
    arms.push(`M${o} ${arm.toFixed(2)}L${o} ${o}L${arm.toFixed(2)} ${o}`);
  }

  return arms.join('');
}
