// import React, { useEffect, useRef, useState } from 'react';
// import backgroundMusic from '../assets/mp3/binary.mp3';
// // import buttonClickSound from '../assets/mp3/button-click.mp3';

// /**
//  * @param {Object} props
//  * @param {React.ReactNode} props.children
//  */
// interface SoundManagerProps {
//   children?: React.ReactNode;
// }
// const SoundManager: React.FC<SoundManagerProps> = ({ children }) => {
//   const [isMuted, setIsMuted] = useState(false);
//   const audioRef = useRef(null);
//   const clickAudioRef = useRef(null);

//   useEffect(() => {
//     if (!audioRef.current) return;
//     audioRef.current.loop = true;
//     audioRef.current.volume = 0.5;
//     if (isMuted) {
//       audioRef.current.pause();
//     } else {
//       audioRef.current.play().catch(() => {});
//     }
//   }, [isMuted]);

//   // Play click sound on button click (except mute/unmute)
//   useEffect(() => {
//     const handleButtonClick = (e) => {
//       // Exclude mute/unmute button
//       if (
//         e.target.closest('button') &&
//         !e.target.closest('[data-sound-mute]') &&
//         clickAudioRef.current
//       ) {
//         clickAudioRef.current.currentTime = 0;
//         clickAudioRef.current.play().catch(() => {});
//       }
//     };
//     document.addEventListener('click', handleButtonClick);
//     return () => document.removeEventListener('click', handleButtonClick);
//   }, []);

//   // Handle mute/unmute
//   const toggleMute = () => {
//     setIsMuted((prev) => !prev);
//   };

//   return (
//     <>
//       {/* Background music audio element */}
//       <audio ref={audioRef} src={backgroundMusic} preload="none"/>
//       {/* Button click sound audio element */}
//       {/* <audio ref={clickAudioRef} src={buttonClickSound} /> */}
//       {/* {children} */}
//       {/* Mute/Unmute Button */}
//       <button
//         data-sound-mute
//         onClick={toggleMute}
//         className=" w-9 h-9 bg-gray-900/80 backdrop-blur-xl border border-cyan-400/50 rounded-full flex items-center justify-center hover:bg-cyan-400/10 transition-all duration-300 group"
//         title={isMuted ? 'Unmute Background' : 'Mute Background'}
//       >
//         {isMuted ? (
//           <svg className="w-6 h-6 text-cyan-400 group-hover:text-cyan-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
//           </svg>
//         ) : (
//           <svg className="w-6 h-6 text-cyan-400 group-hover:text-cyan-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//             <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 14.142M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
//           </svg>
//         )}
//         {/* Glow effect */}
//         <div className="absolute inset-0 rounded-full bg-cyan-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
//       </button>
//     </>
//   );
// };

// export default SoundManager;

import React, { useEffect, useRef, useState } from 'react';
import backgroundMusic from '../assets/mp3/binary.mp3';

interface SoundManagerProps {
  children?: React.ReactNode;
}

const SoundManager: React.FC<SoundManagerProps> = ({ children }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [hasUserInteracted, setHasUserInteracted] = useState(false);
  const [audioReady, setAudioReady] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const clickAudioRef = useRef<HTMLAudioElement>(null);

  // Handle audio setup
  useEffect(() => {
    if (!audioRef.current) return;
    
    audioRef.current.loop = true;
    audioRef.current.volume = 0.5;
    
    // Set up audio ready state
    const handleCanPlay = () => setAudioReady(true);
    audioRef.current.addEventListener('canplaythrough', handleCanPlay);
    
    return () => {
      if (audioRef.current) {
        audioRef.current.removeEventListener('canplaythrough', handleCanPlay);
      }
    };
  }, []);

  // Handle play/pause based on mute state and user interaction
  useEffect(() => {
    if (!audioRef.current || !audioReady) return;

    if (isMuted) {
      audioRef.current.pause();
    } else if (hasUserInteracted) {
      // Only try to play if user has interacted with the page
      audioRef.current.play().catch((error) => {
        console.log('Audio play failed:', error);
      });
    }
  }, [isMuted, hasUserInteracted, audioReady]);

  // Listen for first user interaction to enable audio
  useEffect(() => {
    const handleFirstInteraction = () => {
      setHasUserInteracted(true);
      // Remove listeners after first interaction
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('keydown', handleFirstInteraction);
      document.removeEventListener('touchstart', handleFirstInteraction);
    };

    document.addEventListener('click', handleFirstInteraction);
    document.addEventListener('keydown', handleFirstInteraction);
    document.addEventListener('touchstart', handleFirstInteraction);

    return () => {
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('keydown', handleFirstInteraction);
      document.removeEventListener('touchstart', handleFirstInteraction);
    };
  }, []);

  // Play click sound on button click (except mute/unmute)
  useEffect(() => {
    const handleButtonClick = (e: Event) => {
      // Exclude mute/unmute button
      if (
        (e.target as Element)?.closest('button') &&
        !(e.target as Element)?.closest('[data-sound-mute]') &&
        clickAudioRef.current
      ) {
        clickAudioRef.current.currentTime = 0;
        clickAudioRef.current.play().catch(() => {});
      }
    };
    
    document.addEventListener('click', handleButtonClick);
    return () => document.removeEventListener('click', handleButtonClick);
  }, []);

  // Handle mute/unmute
  const toggleMute = () => {
    setIsMuted((prev) => !prev);
  };

  return (
    <>
      {/* Background music audio element */}
      <audio 
        ref={audioRef} 
        src={backgroundMusic} 
        preload="auto"
      />
      
      {/* Button click sound audio element */}
      {/* <audio ref={clickAudioRef} src={buttonClickSound} /> */}
      
      {/* Show indicator if audio is waiting for user interaction */}
      {/* {!hasUserInteracted && !isMuted && (
        <div className="fixed top-4 right-4 z-50 bg-gray-900/90 backdrop-blur-sm border border-cyan-400/30 rounded-lg px-3 py-2 text-cyan-400 text-sm">
          Click anywhere to enable audio
        </div>
      )} */}
      
      {/* Mute/Unmute Button */}
      <button
        data-sound-mute
        onClick={toggleMute}
        className="w-9 h-9 bg-gray-900/80 backdrop-blur-xl border border-cyan-400/50 rounded-full flex items-center justify-center hover:bg-cyan-400/10 transition-all duration-300 group"
        title={isMuted ? 'Unmute Background' : 'Mute Background'}
      >
        {isMuted ? (
          <svg className="w-6 h-6 text-cyan-400 group-hover:text-cyan-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
          </svg>
        ) : (
          <svg className="w-6 h-6 text-cyan-400 group-hover:text-cyan-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 14.142M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
          </svg>
        )}
        
        {/* Visual indicator for audio state */}
        {!isMuted && hasUserInteracted && audioReady && (
          <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse" />
        )}
        
        {/* Glow effect */}
        <div className="absolute inset-0 rounded-full bg-cyan-400/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
      </button>
    </>
  );
};

export default SoundManager;