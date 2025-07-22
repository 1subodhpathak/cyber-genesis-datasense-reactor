import React, { useEffect, useRef } from 'react';

const GRID_SIZE = 200;
const GRID_DIVS = 8;
const PATH_POINTS = [
  [10, 180], [40, 120], [80, 160], [120, 60], [160, 100], [190, 30],
];

const LABELS = [
  { label: 'SQL', point: PATH_POINTS[2] },
  { label: 'Python', point: PATH_POINTS[4] },
];

const STATIC_FLOATING_LABELS = [
  { label: 'Practice SQL', position: [30, 40] },
  { label: 'Master Python', position: [120, 150] },
  { label: 'Learn Joins', position: [80, 100] },
];

const DISTANCE_THRESHOLD = 12;

function getPathD(points: number[][]) {
  return points.map((p, i) => (i === 0 ? `M${p[0]},${p[1]}` : `L${p[0]},${p[1]}`)).join(' ');
}

function getDistance(p1: { x: number; y: number }, p2: number[]) {
  return Math.hypot(p1.x - p2[0], p1.y - p2[1]);
}

const PathTrackerHUD: React.FC<{ style?: React.CSSProperties }> = ({ style }) => {
  const pathRef = useRef<SVGPathElement>(null);
  const tracerRef = useRef<SVGPathElement>(null);
  const headRef = useRef<SVGCircleElement>(null);
  const labelRefs = useRef<(SVGTextElement | null)[]>([]);

  useEffect(() => {
    let frame: number;
    let t = 0;

    const animate = () => {
      t = (t + 0.005) % 1;
      const path = pathRef.current;
      const tracer = tracerRef.current;
      const head = headRef.current;

      if (path && tracer && head) {
        const totalLength = path.getTotalLength();
        const tracerLength = totalLength * 0.18;
        const tracerStart = totalLength * t;

        tracer.setAttribute('stroke-dasharray', `${tracerLength} ${totalLength}`);
        tracer.setAttribute('stroke-dashoffset', `${-tracerStart}`);

        const headPoint = path.getPointAtLength(Math.min(tracerStart + tracerLength, totalLength - 1));
        head.setAttribute('cx', headPoint.x.toString());
        head.setAttribute('cy', headPoint.y.toString());

        LABELS.forEach(({ point }, i) => {
          const distance = getDistance(headPoint, point);
          const labelEl = labelRefs.current[i];
          if (labelEl) {
            labelEl.setAttribute('opacity', distance < DISTANCE_THRESHOLD ? '1' : '0');
          }
        });
      }

      frame = requestAnimationFrame(animate);
    };

    animate();
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        right:252,
        bottom: 32,
        width: GRID_SIZE + 16,
        height: GRID_SIZE + 14,
        zIndex: 50,
        pointerEvents: 'none',
        ...style,
      }}
      className="select-none"
    >
      <div
        className="hud-overlay border border-0 shadow-xl p-2 bg-transparent animate-float"
        style={{ width: GRID_SIZE + 16, height: GRID_SIZE + 32 }}
      >
        <svg width={GRID_SIZE} height={GRID_SIZE} style={{ display: 'block', margin: '0 auto' }}>
          {/* Grid */}
          {[...Array(GRID_DIVS + 1)].map((_, i) => (
            <line
              key={`h${i}`}
              x1={0}
              x2={GRID_SIZE}
              y1={(i * GRID_SIZE) / GRID_DIVS}
              y2={(i * GRID_SIZE) / GRID_DIVS}
              stroke="#00fff7"
              opacity={0.08}
              strokeWidth={1}
            />
          ))}
          {[...Array(GRID_DIVS + 1)].map((_, i) => (
            <line
              key={`v${i}`}
              y1={0}
              y2={GRID_SIZE}
              x1={(i * GRID_SIZE) / GRID_DIVS}
              x2={(i * GRID_SIZE) / GRID_DIVS}
              stroke="#00fff7"
              opacity={0.08}
              strokeWidth={1}
            />
          ))}

          {/* Axes */}
          <line x1={0} y1={GRID_SIZE} x2={GRID_SIZE} y2={GRID_SIZE} stroke="#00fff7" strokeWidth={2} opacity={0.5} />
          <polygon points={`${GRID_SIZE},${GRID_SIZE} ${GRID_SIZE - 10},${GRID_SIZE - 5} ${GRID_SIZE - 10},${GRID_SIZE + 5}`} fill="#00fff7" opacity={0.7} />
          <line x1={0} y1={GRID_SIZE} x2={0} y2={0} stroke="#00fff7" strokeWidth={2} opacity={0.5} />
          <polygon points={`0,0 -5,10 5,10`} fill="#00fff7" opacity={0.7} />

          {/* Static path */}
          <path ref={pathRef} d={getPathD(PATH_POINTS)} stroke="#00fff7" strokeWidth={2} opacity={0.18} fill="none" />

          {/* Animated tracer */}
          <path
            ref={tracerRef}
            d={getPathD(PATH_POINTS)}
            stroke="#00fff7"
            strokeWidth={3}
            fill="none"
            style={{ filter: 'drop-shadow(0 0 8px #00fff7cc)' }}
          />

          {/* Glowing head */}
          <circle
            ref={headRef}
            r={6}
            fill="#00fff7"
            opacity={0.85}
            style={{ filter: 'drop-shadow(0 0 12px #00fff7cc)' }}
          />

          {/* Floating labels (appear when near point) */}
          {LABELS.map(({ label, point }, i) => (
            <text
              key={i}
              ref={el => (labelRefs.current[i] = el)}
              x={point[0] + 8}
              y={point[1] - 8}
              fill="#00fff7"
              fontSize="10"
              opacity={0}
              style={{
                transition: 'opacity 0.3s ease-in-out',
                fontFamily: 'monospace',
                userSelect: 'none',
              }}
            >
              {label}
            </text>
          ))}

          {/* Static floating grid texts */}
          {STATIC_FLOATING_LABELS.map(({ label, position }, i) => (
            <text
              key={`static-${i}`}
              x={position[0]}
              y={position[1]}
              className='animate-float'
              fill="#00fff7"
              fontSize="10"
              opacity={0.5}
              style={{
                fontFamily: 'monospace',
                filter: 'drop-shadow(0 0 4px #00fff7aa)',
                userSelect: 'none',
              }}
            >
              {label}
            </text>
          ))}
        </svg>
      </div>
    </div>
  );
};

export default PathTrackerHUD;
