import React, { useEffect, useRef, useState } from 'react';

const SIZE = 180;
const LINE_COUNT = 8;
const PACKET_COUNT = 4;

function randomPacket() {
  return {
    y: 20 + Math.random() * (SIZE - 40),
    x: Math.random() * SIZE,
    id: Math.floor(Math.random() * 9999),
    glitch: Math.random() < 0.2,
    color: Math.random() < 0.5 ? '#00fff7' : '#00ff99',
    life: 0,
  };
}

const DataStreamHUD: React.FC<{ style?: React.CSSProperties }> = ({ style }) => {
  const [packets, setPackets] = useState(() => Array.from({ length: PACKET_COUNT }, randomPacket));
  const [glitch, setGlitch] = useState(false);
  const glitchTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    let frame: number;
    function animate() {
      setPackets((prev) =>
        prev
          .map((p) => ({ ...p, x: p.x + 2 + (p.glitch ? Math.random() * 2 : 0), life: p.life + 0.02 }))
          .filter((p) => p.x < SIZE + 30)
      );
      if (Math.random() < 0.04 && packets.length < PACKET_COUNT) {
        setPackets((prev) => [...prev, randomPacket()]);
      }
      // Random glitch
      if (Math.random() < 0.01 && !glitch) {
        setGlitch(true);
        if (glitchTimeout.current) clearTimeout(glitchTimeout.current);
        glitchTimeout.current = setTimeout(() => setGlitch(false), 120 + Math.random() * 120);
      }
      frame = requestAnimationFrame(animate);
    }
    animate();
    return () => {
      if (glitchTimeout.current) clearTimeout(glitchTimeout.current);
      cancelAnimationFrame(frame);
    };
  }, [packets.length, glitch]);

  // Glitch effect: jitter SVG group
  const glitchTransform = glitch
    ? `translate(${Math.random() * 6 - 3},${Math.random() * 6 - 3}) scale(${1 + (Math.random() - 0.5) * 0.03})`
    : '';

  return (
    <div
      style={{
        position: 'fixed',
        right: 32,
        bottom: 32,
        width: SIZE,
        height: SIZE,
        zIndex: 40,
        pointerEvents: 'none',
        ...style,
      }}
      className="select-none"
    >
      <svg width={SIZE} height={SIZE} style={{ display: 'block' }}>
        <g transform={glitchTransform}>
          {/* Grid */}
          {[...Array(7)].map((_, i) => (
            <line
              key={`h${i}`}
              x1={0}
              x2={SIZE}
              y1={20 + i * 20}
              y2={20 + i * 20}
              stroke="#00fff7"
              opacity={0.08}
              strokeWidth={1}
            />
          ))}
          {/* Data lines */}
          {[...Array(LINE_COUNT)].map((_, i) => (
            <line
              key={`d${i}`}
              x1={0}
              x2={SIZE}
              y1={20 + i * 20}
              y2={20 + i * 20}
              stroke="#00fff7"
              opacity={0.18}
              strokeWidth={2}
            />
          ))}
          {/* Packets */}
          {packets.map((p, i) => (
            <g key={p.id}>
              <circle
                cx={p.x}
                cy={p.y}
                r={p.glitch ? 7 : 5}
                fill={p.color}
                opacity={p.glitch ? 0.7 : 0.9}
                style={{ filter: p.glitch ? 'drop-shadow(0 0 8px #00fff7cc)' : 'none' }}
              />
              <text
                x={p.x + 10}
                y={p.y + 4}
                fontSize={10}
                fill="#00fff7"
                opacity={0.7}
                fontFamily="JetBrains Mono, monospace"
              >
                #{p.id}
              </text>
            </g>
          ))}
        </g>
      </svg>
    </div>
  );
};

export default DataStreamHUD; 