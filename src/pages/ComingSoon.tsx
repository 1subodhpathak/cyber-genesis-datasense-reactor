import { useEffect, useState } from "react";
import ThreeBackground from "@/components/ThreeBackground";
import HUDOverlay from "@/components/HUDOverlay";
import CyberLoader from "@/components/CyberLoader";

const ComingSoon = () => {
  const [loading, setLoading] = useState(true);
  const [glitchText, setGlitchText] = useState("COMING SOON");

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const glitchTexts = ["COMING SOON", "C0M1NG S00N", "LOADING...", "SYSTEM INIT", "COMING SOON"];
    let index = 0;
    
    const interval = setInterval(() => {
      setGlitchText(glitchTexts[index % glitchTexts.length]);
      index++;
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return <CyberLoader onComplete={() => setLoading(false)} />;
  }

  return (
    <div className="relative min-h-screen bg-background overflow-hidden">
      <ThreeBackground />
      <HUDOverlay />
      
      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4">
        <div className="text-center space-y-8">
          {/* Main Title */}
          <div className="relative">
            <h1 className="text-7xl md:text-9xl font-orbitron font-bold text-transparent bg-gradient-to-r from-primary via-cyan-400 to-primary bg-clip-text animate-pulse-glow">
              {glitchText}
            </h1>
            <div className="absolute inset-0 text-7xl md:text-9xl font-orbitron font-bold text-primary/20 animate-glitch">
              COMING SOON
            </div>
          </div>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-muted-foreground font-jetbrains max-w-2xl mx-auto">
            We're building something <span className="text-primary animate-pulse">revolutionary</span>.
            <br />
            Prepare for the ultimate coding experience.
          </p>

          {/* Progress Bar */}
          <div className="w-full max-w-md mx-auto">
            <div className="flex justify-between text-sm text-muted-foreground mb-2">
              <span>System Loading</span>
              <span>87%</span>
            </div>
            <div className="h-2 bg-border rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-primary to-cyan-400 animate-scan" style={{ width: "87%" }}></div>
            </div>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-3 gap-6 mt-16 max-w-4xl mx-auto">
            <div className="cyber-panel p-6 backdrop-blur-sm">
              <div className="text-primary text-3xl mb-4">⚡</div>
              <h3 className="text-lg font-orbitron text-primary mb-2">Lightning Fast</h3>
              <p className="text-sm text-muted-foreground">Optimized performance for seamless coding</p>
            </div>
            
            <div className="cyber-panel p-6 backdrop-blur-sm">
              <div className="text-primary text-3xl mb-4">🧠</div>
              <h3 className="text-lg font-orbitron text-primary mb-2">AI Powered</h3>
              <p className="text-sm text-muted-foreground">Intelligent code assistance and learning</p>
            </div>
            
            <div className="cyber-panel p-6 backdrop-blur-sm">
              <div className="text-primary text-3xl mb-4">🔒</div>
              <h3 className="text-lg font-orbitron text-primary mb-2">Secure</h3>
              <p className="text-sm text-muted-foreground">Enterprise-grade security protocols</p>
            </div>
          </div>

          {/* Countdown Timer */}
          <div className="mt-16 p-6 cyber-panel backdrop-blur-sm max-w-lg mx-auto">
            <h3 className="text-lg font-orbitron text-primary mb-4">Launch Countdown</h3>
            <div className="grid grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-2xl font-bold text-primary">15</div>
                <div className="text-xs text-muted-foreground">DAYS</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">07</div>
                <div className="text-xs text-muted-foreground">HOURS</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">42</div>
                <div className="text-xs text-muted-foreground">MINS</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-primary">18</div>
                <div className="text-xs text-muted-foreground">SECS</div>
              </div>
            </div>
          </div>

          {/* Back Button */}
          <div className="mt-12">
            <a 
              href="/" 
              className="inline-flex items-center px-6 py-3 cyber-border bg-background/50 hover:bg-primary/20 text-primary hover:text-primary-foreground transition-all duration-300 font-jetbrains"
            >
              <span className="mr-2">←</span>
              Back to Main
            </a>
          </div>
        </div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-4 h-4 bg-primary/50 rounded-full animate-float"></div>
      <div className="absolute top-40 right-20 w-6 h-6 bg-cyan-400/30 rounded-full animate-float" style={{ animationDelay: "1s" }}></div>
      <div className="absolute bottom-20 left-20 w-5 h-5 bg-primary/40 rounded-full animate-float" style={{ animationDelay: "2s" }}></div>
      <div className="absolute bottom-40 right-10 w-3 h-3 bg-cyan-400/50 rounded-full animate-float" style={{ animationDelay: "3s" }}></div>
    </div>
  );
};

export default ComingSoon;