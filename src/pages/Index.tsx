import { useState } from 'react';
import CyberLoader from '@/components/CyberLoader';
import ThreeBackground from '@/components/ThreeBackground';
import CyberNav from '@/components/CyberNav';
import CyberButton from '@/components/CyberButton';
import HUDOverlay from '@/components/HUDOverlay';
import SQLTerminal from '@/components/SQLTerminal';
import DataVisualization from '@/components/DataVisualization';
import { Activity } from 'lucide-react';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  if (isLoading) {
    return <CyberLoader onComplete={() => setIsLoading(false)} />;
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Three.js Background */}
      <ThreeBackground />
      
      {/* HUD Overlay */}
      <HUDOverlay />
      
      {/* SQL Terminal */}
      <SQLTerminal />
      
      {/* Data Visualization */}
      <DataVisualization />
      
      {/* Navigation */}
      <CyberNav />

      {/* Main Content */}
      <div className="flex items-center justify-center h-screen relative z-20">
        <div className="text-center space-y-8">
          {/* Main Title */}
          <div className="mb-12">
            <h1 className="text-5xl font-cyber font-bold text-primary mb-4 glitch-text animate-pulse-glow" data-text="DATASENSE PRACTICE ARENA">
              DATASENSE PRACTICE ARENA
            </h1>
            <p className="text-lg font-mono text-muted-foreground tracking-wider">
              {/* ADVANCED PYTHON & SQL PRACTICE PLATFORM */}
              EMPOWERING DATA ENTHUSIASTS TO EXPERTISE
            </p>
            <div className="w-32 h-px bg-primary mx-auto mt-4 animate-pulse" />
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-8 items-center justify-center">
            {/* Join Live Quizzes */}
            <div className="group">
              <CyberButton 
                variant="primary" 
                size="lg"
                className="animate-float"
                style={{ animationDelay: '0s' }}
              >
                JOIN LIVE QUIZZES
              </CyberButton>
              <div className="text-xs font-mono text-muted-foreground mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                REAL-TIME NEURAL CHALLENGES
              </div>
            </div>

            {/* Dashboard */}
            <div className="group">
              <CyberButton 
                variant="secondary" 
                size="lg"
                icon={<Activity className="w-6 h-6" />}
                className="animate-float"
                style={{ animationDelay: '0.5s' }}
              >
                {/* Only icon, no text as requested */}
              </CyberButton>
              <div className="text-xs font-mono text-muted-foreground mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                NEURAL DASHBOARD ACCESS
              </div>
            </div>

            {/* Custom Test */}
            <div className="group">
              <CyberButton 
                variant="primary" 
                size="lg"
                className="animate-float"
                style={{ animationDelay: '1s' }}
              >
                CUSTOM TEST
              </CyberButton>
              <div className="text-xs font-mono text-muted-foreground mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                PERSONALIZED TRAINING PROTOCOLS
              </div>
            </div>
          </div>

          {/* Central HUD Display */}
          <div className="mt-16 hud-overlay border border-primary/30 p-6 max-w-md mx-auto">
            <div className="text-center">
              <div className="text-primary font-mono text-sm mb-2">TRAINING MATRIX STATUS</div>
              <div className="flex justify-center space-x-4 text-xs font-mono">
                <div className="text-cyber-success">● PYTHON</div>
                <div className="text-cyber-success">● SQL</div>
                <div className="text-cyber-warning">● ADVANCED</div>
              </div>
              <div className="mt-4 w-full bg-muted h-1 rounded">
                <div className="bg-primary h-1 rounded animate-pulse" style={{ width: '85%' }} />
              </div>
              <div className="text-xs text-muted-foreground mt-2">NEURAL LINK STABILITY: 85%</div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Geometric Elements */}
      <div className="fixed inset-0 pointer-events-none z-10">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="absolute border border-primary/20 animate-float"
            style={{
              width: `${20 + i * 10}px`,
              height: `${20 + i * 10}px`,
              left: `${10 + i * 20}%`,
              top: `${20 + i * 15}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: `${4 + i}s`
            }}
          />
        ))}
      </div>
    </div>
  );
};

export default Index;
