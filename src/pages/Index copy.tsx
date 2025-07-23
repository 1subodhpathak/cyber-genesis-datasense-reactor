import React, { useState, useRef, useEffect, FormEvent } from 'react';
import CyberLoader from '@/components/CyberLoader';
import ThreeBackground from '@/components/ThreeBackground';
import CyberNav from '@/components/CyberNav';
import CyberButton from '@/components/CyberButton';
import HUDOverlay from '@/components/HUDOverlay';
import SQLTerminal from '@/components/SQLTerminal';
import DataVisualization from '@/components/DataVisualization';
import { LayoutDashboard } from 'lucide-react';
import GlobeLottie from '@/components/GlobeLottie';
import PathTrackerHUD from '@/components/PathTrackerHUD';
import FuturisticGlitchPopup from '@/components/FuturisticGlitchPopup';
// import SignalRadarHUD from '@/components/SignalRadarHUD';
import DataStreamHUD from '@/components/DataStreamHUD';
import CyberCoreHUD from '@/components/CyberCoreHUD';
import WorldMapHUD from '@/components/WorldMapHUD';

const Chatbot = () => {
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmedInput = input.trim();
    if (!trimmedInput) return;

    setMessages((prev) => [...prev, { text: trimmedInput, isUser: true }]);
    setInput('');

    setTimeout(() => {
      const isGreeting = /quiz|test|hello|hi/i.test(trimmedInput);
      const aiResponse = isGreeting
        ? 'AI: Ready to help you with data challenges!'
        : 'AI: I am your AI assistant. Ask me anything about data, gaming, or this dashboard!';
      setMessages((prev) => [...prev, { text: aiResponse, isUser: false }]);
    }, 700);
  };

  return (
    <div className="fixed bottom-[60px] right-[60px] z-[102] min-w-[260px] min-h-[220px] bg-cyan-400/10 text-cyan-100 shadow-[0_0_24px_rgba(0,255,255,0.25)] flex flex-col">
      <div className="border-b border-cyan-400/25 px-4 py-3 font-light tracking-widest">
        AI Assistant
      </div>

      <div className="flex-1 px-4 py-3 overflow-y-auto text-sm" id="chatbot-messages">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`mb-2 ${msg.isUser ? 'text-right' : 'text-left'} text-cyan-100`}
          >
            {msg.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex items-center border-t border-cyan-400/25 px-3 py-2"
      >
        <input
          type="text"
          className="flex-1 bg-cyan-400/10 text-cyan-100 placeholder:text-cyan-200/50 text-sm px-3 py-2 rounded-md outline-none mr-2"
          placeholder="Ask me anything..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          autoComplete="off"
        />
        <button
          type="submit"
          className="bg-gradient-to-r from-cyan-300 to-cyan-100 text-[#0a1a22] text-sm px-4 py-2 rounded-md font-orbitron hover:from-cyan-100 hover:to-cyan-300 transition"
        >
          Send
        </button>
      </form>
    </div>
  );
};

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupBadge, setPopupBadge] = useState('SQL');
  const [popupDesc, setPopupDesc] = useState('');
  const [popupLink, setPopupLink] = useState('');

  // Map badgeType to description and link
  const popupData = {
    SQL: {
      description: 'Ready to join a live SQL quiz? You will be redirected to the SQL quiz arena.',
      yesLink: '#',
    },
    Dashboard: {
      description: 'Access the neural dashboard for advanced analytics and controls.',
      yesLink: '#',
    },
    'Custom Test': {
      description: 'Start a custom test tailored to your skills and interests.',
      yesLink: '#',
    },
    'Mock Quiz': {
      description: 'Take a mock quiz to practice and improve your performance.',
      yesLink: '#',
    },
    'Practice Question': {
      description: 'Practice with individual questions to sharpen your knowledge.',
      yesLink: '#',
    },
  };

  if (isLoading) {
    return <CyberLoader onComplete={() => setIsLoading(false)} />;
  }

  // Helper to open popup with badge type
  const handleOpenPopup = (badgeType) => {
    setPopupBadge(badgeType);
    setPopupDesc(popupData[badgeType]?.description || 'Are you ready to proceed?');
    setPopupLink(popupData[badgeType]?.yesLink || '/');
    setPopupOpen(true);
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Three.js Background */}
      <ThreeBackground />
      {/* HUD Overlay */}
      {/* <HUDOverlay /> */}
      <PathTrackerHUD />
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
          <div className="mb-16">
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
          <div className="pb-8">
            <div className="flex flex-col sm:flex-row gap-8 items-center justify-center">
              {/* Join Live Quizzes */}
              <div className="group">
                <CyberButton 
                  variant="primary" 
                  size="lg"
                  className="animate-float w-64"
                  style={{ animationDelay: '0s' }}
                  onClick={() => handleOpenPopup('SQL')}
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
                  className="animate-float text-lg"
                  style={{ animationDelay: '0.5s' }}
                  icon={
                    <LayoutDashboard className="w-12 h-12 font-bold" fill="currentColor" color="currentColor" />
                  }
                  onClick={() => handleOpenPopup('Dashboard')}
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
                  className="animate-float w-64"
                  style={{ animationDelay: '1s' }}
                  onClick={() => handleOpenPopup('Custom Test')}
                >
                  CUSTOM TEST
                </CyberButton>
                <div className="text-xs font-mono text-muted-foreground mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  PERSONALIZED TRAINING PROTOCOLS
                </div>
              </div>
            </div>
            {/* New row for MOCK QUIZ and PRACTICE QUESTION */}
            <div className="flex flex-col sm:flex-row gap-8 items-center justify-center mt-8">
              <CyberButton 
                variant="primary" 
                size="lg"
                className="animate-float w-64"
                style={{ animationDelay: '1.2s' }}
                onClick={() => handleOpenPopup('Mock Quiz')}
              >
                MOCK QUIZ
              </CyberButton>
              
              <CyberButton 
                variant="primary" 
                size="lg"
                className="animate-float w-64"
                style={{ animationDelay: '1.4s' }}
                onClick={() => handleOpenPopup('Practice Question')}
              >
                PRACTICE QUESTION
              </CyberButton>
            </div>
          </div>
          <Chatbot />
          {/* Central HUD Display */}
          <div className="mb-16 hud-overlay border border-primary/30 p-6 max-w-md mx-auto">
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
      {/* Place GlobeLottie just left of the TRAINING MATRIX STATUS box */}
      <GlobeLottie style={{ position: 'absolute', left: 200, bottom: 40, width: 220, height: 220, zIndex: 30, pointerEvents: 'none', filter: 'drop-shadow(0 0 16px #00fff7cc)', background: 'transparent' }} />
      {/* <GlobeHUD /> */}
      {/* Popup */}
      <FuturisticGlitchPopup open={popupOpen} onClose={() => setPopupOpen(false)} badgeType={popupBadge} description={popupDesc} yesLink={popupLink} />
      {/* Place SignalRadarHUD in bottom left */}
      <WorldMapHUD style={{ left: 12, bottom: 12 }} />
      {/* Place DataStreamHUD in bottom right */}
      <CyberCoreHUD style={{ right: 12, bottom: 12 }} />
      {/* <DataStreamHUD style={{ right: 32, bottom: 32 }} /> */}
    </div>
  );
};

export default Index;
