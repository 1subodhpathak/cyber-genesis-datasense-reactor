import { useEffect, useState } from 'react';

const HUD_WIDTH = 240; // Match DataVisualization HUD width
const HUD_HEIGHT = 90; // Set a fixed height for the circular bar area

const TOTAL_PYTHON = 5000;
const TOTAL_SQL = 5000;
const SOLVED_PYTHON = 3500;
const SOLVED_SQL = 4000;

const CIRCLE_SIZE = 70;
const STROKE_WIDTH = 7;
const RADIUS = (CIRCLE_SIZE - STROKE_WIDTH) / 2;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

function AnimatedCircle({
  solved,
  total,
  color,
  label,
}: {
  solved: number;
  total: number;
  color: string;
  label: string;
}) {
  const [progress, setProgress] = useState(0);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    let current = 0;
    const target = solved;
    const step = Math.max(1, Math.floor(target / 60));
    function animate() {
      current += step;
      if (current >= target) current = target;
      setProgress(current);
      if (current < target) setTimeout(animate, 18);
    }
    animate();
    // eslint-disable-next-line
  }, [solved]);

  const percent = Math.round((progress / total) * 100);
  const offset = CIRCUMFERENCE * (1 - percent / 100);

  return (
    <div
      className="relative flex flex-col items-center justify-center group"
      style={{ width: CIRCLE_SIZE, height: CIRCLE_SIZE }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <svg width={CIRCLE_SIZE} height={CIRCLE_SIZE}>
        <circle
          cx={CIRCLE_SIZE / 2}
          cy={CIRCLE_SIZE / 2}
          r={RADIUS}
          stroke="#222b"
          strokeWidth={STROKE_WIDTH}
          fill="none"
        />
        <circle
          cx={CIRCLE_SIZE / 2}
          cy={CIRCLE_SIZE / 2}
          r={RADIUS}
          stroke={color}
          strokeWidth={STROKE_WIDTH}
          fill="none"
          strokeDasharray={CIRCUMFERENCE}
          strokeDashoffset={offset}
          style={{
            transition: 'stroke-dashoffset 0.3s linear',
            // filter: ``,
          }}
          strokeLinecap="round"
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
        <span className="text-xs font-mono text-primary">{label}</span>
        <span className="text-sm font-bold text-cyan-400">{percent}%</span>
      </div>
      {hovered && (
        <div className="absolute left-1/2 top-full -translate-x-1/2 mt-2 px-2 py-1 rounded bg-[#0C1116] text-cyan-300 text-xs font-mono shadow-lg z-10 border border-cyan-400/30">
          {progress} / {total} solved
        </div>
      )}
    </div>
  );
}

const QuestionProgressCircle = () => (
  <div
    className="fixed z-20"
    style={{
      right: 18,
      top: 'calc(50% - 120px)', // Position below DataVisualization
      width: HUD_WIDTH,
      height: HUD_HEIGHT,
      pointerEvents: 'auto',
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-evenly',
      background: 'transparent',
    }}
  >
    <AnimatedCircle
      solved={SOLVED_PYTHON}
      total={TOTAL_PYTHON}
      color="#00fff7"
      label="Python"
    />
    <AnimatedCircle
      solved={SOLVED_SQL}
      total={TOTAL_SQL}
      color="#ff00a6"
      label="SQL"
    />
  </div>
);

export default QuestionProgressCircle;

// import { useEffect, useState } from 'react';

// const HUD_WIDTH = 240;
// const HUD_HEIGHT = 110;

// const TOTAL_PYTHON = 5000;
// const TOTAL_SQL = 5000;
// const SOLVED_PYTHON = 3500;
// const SOLVED_SQL = 200;

// const CIRCLE_SIZE = 70;
// const STROKE_WIDTH = 7;
// const RADIUS = (CIRCLE_SIZE - STROKE_WIDTH) / 2;
// const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

// function AnimatedCircle({
//   solved,
//   total,
//   color,
//   label,
// }: {
//   solved: number;
//   total: number;
//   color: string;
//   label: string;
// }) {
//   const [progress, setProgress] = useState(0);
//   const [hovered, setHovered] = useState(false);

//   useEffect(() => {
//     let current = 0;
//     const target = solved;
//     const step = Math.max(1, Math.floor(target / 60));
//     function animate() {
//       current += step;
//       if (current >= target) current = target;
//       setProgress(current);
//       if (current < target) setTimeout(animate, 18);
//     }
//     animate();
//     // eslint-disable-next-line
//   }, [solved]);

//   const percent = Math.round((progress / total) * 100);
//   const offset = CIRCUMFERENCE * (1 - percent / 100);

//   return (
//     <div
//       className="relative flex flex-col items-center justify-center group"
//       style={{ width: CIRCLE_SIZE, height: CIRCLE_SIZE }}
//       onMouseEnter={() => setHovered(true)}
//       onMouseLeave={() => setHovered(false)}
//     >
//       <svg width={CIRCLE_SIZE} height={CIRCLE_SIZE}>
//         <circle
//           cx={CIRCLE_SIZE / 2}
//           cy={CIRCLE_SIZE / 2}
//           r={RADIUS}
//           stroke="#222b"
//           strokeWidth={STROKE_WIDTH}
//           fill="none"
//         />
//         <circle
//           cx={CIRCLE_SIZE / 2}
//           cy={CIRCLE_SIZE / 2}
//           r={RADIUS}
//           stroke={color}
//           strokeWidth={STROKE_WIDTH}
//           fill="none"
//           strokeDasharray={CIRCUMFERENCE}
//           strokeDashoffset={offset}
//           style={{
//             transition: 'stroke-dashoffset 0.3s linear',
//             filter: `drop-shadow(0 0 8px ${color}99)`,
//           }}
//           strokeLinecap="round"
//         />
//       </svg>
//       <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
//         <span className="text-xs font-mono text-primary">{label}</span>
//         <span className="text-sm font-bold text-cyan-400">{percent}%</span>
//       </div>
//       {hovered && (
//         <div className="absolute left-1/2 top-full -translate-x-1/2 mt-2 px-2 py-1 rounded bg-[#0C1116] text-cyan-300 text-xs font-mono shadow-lg z-10 border border-cyan-400/30">
//           {progress} / {total} solved
//         </div>
//       )}
//     </div>
//   );
// }

// const QuestionProgressCircle = () => (
//   <div
//     className="fixed z-20"
//     style={{
//       position: 'fixed',
//       right: 18,
//       top: 'calc(50% - 160px)', // Position below DataVisualization
//       width: HUD_WIDTH,
//       height: HUD_HEIGHT,
//       pointerEvents: 'auto',
//     }}
//   >
//     <div
//       className="hud-overlay border-0 p-3 shadow-xl relative overflow-hidden bg-transparent flex flex-col items-center justify-center"
//       style={{ width: HUD_WIDTH, height: HUD_HEIGHT, minHeight: HUD_HEIGHT }}
//     >
//       <div className="flex flex-row items-center justify-evenly w-full mb-2">
//         <AnimatedCircle
//           solved={SOLVED_PYTHON}
//           total={TOTAL_PYTHON}
//           color="#00fff7"
//           label="Python"
//         />
//         <AnimatedCircle
//           solved={SOLVED_SQL}
//           total={TOTAL_SQL}
//           color="#ff00a6"
//           label="SQL"
//         />
//       </div>
//       <div className="flex flex-row items-center justify-evenly w-full mt-1 text-[11px] font-mono text-cyan-300 opacity-80">
//         <span>Python Total: <span className="font-bold text-cyan-400">{TOTAL_PYTHON}</span></span>
//         <span>SQL Total: <span className="font-bold text-pink-400">{TOTAL_SQL}</span></span>
//       </div>
//     </div>
//   </div>
// );

// export default QuestionProgressCircle;