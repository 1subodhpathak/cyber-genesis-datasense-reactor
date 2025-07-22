import Lottie from 'lottie-react';
import globeAnimation from '../assets/lottie/globe.json';
import React from 'react';

const defaultStyle: React.CSSProperties = {
  position: 'fixed',
  right: 32,
  bottom: 32,
  width: 220,
  height: 220,
  zIndex: 50,
  pointerEvents: 'none',
  filter: 'drop-shadow(0 0 16px #00fff7cc)',
  background: 'transparent',
};

const GlobeLottie = ({ style }: { style?: React.CSSProperties }) => (
  <div style={{ ...defaultStyle, ...style }}>
    <Lottie
      animationData={globeAnimation}
      loop
      autoplay
      style={{ width: '100%', height: '100%', background: 'transparent' }}
      rendererSettings={{ preserveAspectRatio: 'xMidYMid slice' }}
    />
  </div>
);

export default GlobeLottie; 