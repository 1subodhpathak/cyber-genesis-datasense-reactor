import { useEffect, useState } from 'react';

interface CyberLoaderProps {
  onComplete: () => void;
}

const CyberLoader = ({ onComplete }: CyberLoaderProps) => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<'initializing' | 'connecting' | 'authenticating' | 'complete'>('initializing');

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => onComplete(), 1000);
          return 100;
        }
        return prev + Math.random() * 3;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [onComplete]);

  useEffect(() => {
    if (progress < 30) setPhase('initializing');
    else if (progress < 70) setPhase('connecting');
    else if (progress < 100) setPhase('authenticating');
    else setPhase('complete');
  }, [progress]);

  const getPhaseText = () => {
    switch (phase) {
      case 'initializing': return 'INITIALIZING NEURAL LINK...';
      case 'connecting': return 'CONNECTING TO DATASENSE MATRIX...';
      case 'authenticating': return 'AUTHENTICATING CYBER PROTOCOLS...';
      case 'complete': return 'ACCESS GRANTED - WELCOME TO THE MATRIX';
      default: return '';
    }
  };

  return (
    <div className="fixed inset-0 bg-background z-50 flex items-center justify-center">
      {/* Matrix Background */}
      <div className="absolute inset-0 opacity-10">
        {Array.from({ length: 20 }).map((_, i) => (
          <div
            key={i}
            className="absolute text-primary font-mono text-xs animate-matrix-rain"
            style={{
              left: `${i * 5}%`,
              animationDelay: `${i * 0.1}s`,
              animationDuration: '3s'
            }}
          >
            {Array.from({ length: 50 }).map((_, j) => (
              <div key={j} className="block">
                {Math.random() > 0.5 ? '1' : '0'}
              </div>
            ))}
          </div>
        ))}
      </div>

      {/* Main Loader */}
      <div className="relative z-10 text-center">
        {/* Logo */}
        <div className="mb-8">
          <h1 className="text-6xl font-cyber font-bold text-primary cyber-glow animate-pulse-glow">
            DATASENSE
          </h1>
          <div className="text-sm font-mono text-muted-foreground mt-2 tracking-widest">
            NEURAL TRAINING INTERFACE
          </div>
        </div>

        {/* HUD Frame */}
        <div className="hud-overlay border-2 border-primary/30 p-8 max-w-md mx-auto">
          {/* Phase Text */}
          <div className="mb-6">
            <div className="text-primary font-mono text-sm glitch-text" data-text={getPhaseText()}>
              {getPhaseText()}
            </div>
          </div>

          {/* Progress Bar */}
          <div className="mb-6">
            <div className="bg-muted h-2 rounded-full overflow-hidden relative">
              <div 
                className="h-full bg-primary transition-all duration-300 cyber-glow"
                style={{ width: `${progress}%` }}
              />
              <div className="absolute inset-0 scan-line" />
            </div>
            <div className="text-primary font-mono text-xs mt-2 text-right">
              {Math.floor(progress)}%
            </div>
          </div>

          {/* System Status */}
          <div className="space-y-1 text-xs font-mono">
            <div className="flex justify-between">
              <span className="text-muted-foreground">CPU:</span>
              <span className="text-cyber-success">ONLINE</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">NEURAL LINK:</span>
              <span className="text-cyber-success">ACTIVE</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">SECURITY:</span>
              <span className="text-cyber-warning">ENCRYPTING</span>
            </div>
          </div>
        </div>

        {/* Corner Decorations */}
        <div className="absolute top-4 left-4 w-8 h-8 border-t-2 border-l-2 border-primary/50" />
        <div className="absolute top-4 right-4 w-8 h-8 border-t-2 border-r-2 border-primary/50" />
        <div className="absolute bottom-4 left-4 w-8 h-8 border-b-2 border-l-2 border-primary/50" />
        <div className="absolute bottom-4 right-4 w-8 h-8 border-b-2 border-r-2 border-primary/50" />
      </div>
    </div>
  );
};

export default CyberLoader;