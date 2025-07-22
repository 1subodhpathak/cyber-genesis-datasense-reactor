import React, { useEffect, useRef, useState } from 'react';
import HolographicPanel from './HolographicPanel';
import GlitchText from './GlitchText';
import CyberButton from '@/components/CyberButton';
import buttonClickSound from '../assets/mp3/button-click.mp3';
// import glitchSound from '../assets/mp3/glitch.mp3';

/**
 * @param {Object} props
 * @param {boolean} props.open
 * @param {function} props.onClose
 * @param {'Python'|'SQL'} props.badgeType
 */
const FuturisticGlitchPopup = ({ open, onClose, badgeType, description, yesLink }) => {
  const [show, setShow] = useState(open);
  const [triggerGlitch, setTriggerGlitch] = useState(false);
  const audioRef = useRef(null);
  const buttonClickRef = useRef(null);

  useEffect(() => {
    if (open) {
      setShow(true);
      setTriggerGlitch(true);
      if (audioRef.current) {
        audioRef.current.currentTime = 0;
        audioRef.current.play();
      }
    } else {
      setTimeout(() => setShow(false), 400); // allow exit animation
    }
  }, [open]);

  const handleYes = () => {
    if (buttonClickRef.current) {
      buttonClickRef.current.currentTime = 0;
      buttonClickRef.current.play();
    }
    setTimeout(() => {
      if (yesLink) {
        window.location.href = yesLink;
      }
    }, 80);
  };

  const handleNo = () => {
    if (buttonClickRef.current) {
      buttonClickRef.current.currentTime = 0;
      buttonClickRef.current.play();
    }
    setTimeout(onClose, 80);
  };

  if (!show) return null;

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm transition-opacity duration-400 ${open ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
         onClick={onClose}>
      {/* <audio ref={audioRef} src={glitchSound} preload="auto" /> */}
      <div onClick={e => e.stopPropagation()}>
        <audio ref={buttonClickRef} src={buttonClickSound} preload="auto" />
        <HolographicPanel className={`w-[800px] max-w-[90vw] min-h-[400px] p-12 relative animate-glitch-popup`}>
          <GlitchText triggerGlitch={triggerGlitch} className="text-4xl font-bold text-cyan-300 text-center mb-8 select-none">
            {`Let's Get Started`}
          </GlitchText>
          <div className="text-center text-white text-xl font-mono mb-12 leading-relaxed px-4">
            {description}
          </div>
          <div className="flex justify-center gap-12 mb-8 flex-wrap">
              <div className="group">
                <CyberButton 
                  variant="primary" 
                  size="lg"
                  className="animate-float w-64"
                  style={{ animationDelay: '0s' }}
                  onClick={handleYes}
                >
                  Yes
                </CyberButton>
              </div>
              <div className="group">
                <CyberButton 
                  variant="primary" 
                  size="lg"
                  className="animate-float w-64"
                  style={{ animationDelay: '0s' }}
                  onClick={handleNo}
                >
                  No
                </CyberButton>
              </div>
          </div>
        </HolographicPanel>
      </div>
    </div>
  );
};

export default FuturisticGlitchPopup;