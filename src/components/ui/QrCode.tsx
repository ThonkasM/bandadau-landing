const GRID = 11;
/** Patrón determinista (decorativo): finder patterns en tres esquinas + módulos de relleno. */
const FILL = [
  '00110101100', '01001010010', '10011100101', '01100011010', '10101010011',
  '00011101100', '11010010110', '01101101001', '10010011100', '01011100110', '00101001011',
];

function inFinder(x: number, y: number): boolean {
  return (x < 3 && y < 3) || (x > GRID - 4 && y < 3) || (x < 3 && y > GRID - 4);
}

export function QrCode({ className }: { className?: string }) {
  const cells: { x: number; y: number }[] = [];
  for (let y = 0; y < GRID; y += 1) {
    for (let x = 0; x < GRID; x += 1) {
      if (!inFinder(x, y) && FILL[y]?.[x] === '1') cells.push({ x, y });
    }
  }
  const finders = [
    [0, 0],
    [GRID - 3, 0],
    [0, GRID - 3],
  ] as const;
  return (
    <svg viewBox={`0 0 ${GRID} ${GRID}`} className={className} aria-hidden="true" shapeRendering="crispEdges">
      {cells.map(({ x, y }) => (
        <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" className="fill-primary" />
      ))}
      {finders.map(([x, y]) => (
        <g key={`${x}-${y}`}>
          <rect x={x} y={y} width="3" height="3" className="fill-primary" />
          <rect x={x + 0.5} y={y + 0.5} width="2" height="2" className="fill-surface" />
          <rect x={x + 1} y={y + 1} width="1" height="1" className="fill-primary" />
        </g>
      ))}
    </svg>
  );
}
