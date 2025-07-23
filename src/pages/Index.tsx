import { useState, useRef, useEffect, FormEvent } from 'react';
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
import CyberCoreHUD from '@/components/CyberCoreHUD';
import WorldMapHUD from '@/components/WorldMapHUD';
import buttonClickSound from '../assets/mp3/button-click.mp3';

const Chatbot = () => {
  const [messages, setMessages] = useState<{ text: string; isUser: boolean }[]>([]);
  const [input, setInput] = useState('');
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const buttonclickRef = useRef<HTMLAudioElement | null>(null);

  const playButtonClick = () => {
    if (buttonclickRef.current) {
      buttonclickRef.current.currentTime = 0;
      buttonclickRef.current.play();
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = (e: FormEvent) => {
    playButtonClick();
    e.preventDefault();
    const trimmedInput = input.trim();
    if (!trimmedInput) return;

    setMessages((prev) => [...prev, { text: trimmedInput, isUser: true }]);
    setInput('');

    setTimeout(() => {
      const isGreeting = /quiz|test|hello|hi/i.test(trimmedInput);
      const aiResponse = isGreeting
        ? 'Ready to help you with data challenges!'
        : 'I am your AI assistant. Ask me anything about data, gaming, or this dashboard!';
      setMessages((prev) => [...prev, { text: aiResponse, isUser: false }]);
    }, 700);
  };

  return (
    <div className="relative w-full max-w-lg mx-auto flex flex-col h-56">
      <audio ref={buttonclickRef} src={buttonClickSound} preload="auto" />
      {/* Glow background */}
      <div className="absolute inset-0 z-0 rounded-lg pointer-events-none animate-pulse-glow bg-cyan-400/20 blur-2xl" />
      {/* Chatbot content */}
      <div className="relative z-10 bg-[#0C1116] text-cyan-100 shadow-[0_0_24px_rgba(0,255,255,0.25)] flex flex-col h-full rounded-lg">
        <div className="border-b border-cyan-400/25 px-3 py-2 font-bold tracking-widest text-lg flex-shrink-0 text-cyan-200 uppercase drop-shadow-lg">
          DATASENSE AI ASSISTANT
        </div>

        <div className="flex-1 px-3 py-2 overflow-y-auto text-xs min-h-0" id="chatbot-messages">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`mb-2 flex items-end ${msg.isUser ? 'justify-end' : 'justify-start'}`}
            >
              {!msg.isUser && (
                <div className="mr-2 flex-shrink-0">
                  {/* AI Avatar */}
                  <span className=" w-6 h-6 rounded-full bg-cyan-400/80 shadow-lg flex items-center justify-center animate-bounce">
                    🤖
                  </span>
                </div>
              )}
              <div
                className={`px-3 py-2 rounded-lg max-w-[70%] transition-all duration-300
                  ${msg.isUser
                    ? 'bg-cyan-500/20 text-cyan-100 border border-cyan-400/40 animate-fade-in-right'
                    : 'bg-cyan-400/10 text-cyan-200 border border-cyan-400/30 animate-fade-in-left'
                  }`}
              >
                {msg.text}
              </div>
              {msg.isUser && (
                <div className="ml-2 flex-shrink-0">
                  {/* User Avatar */}
                  <span className="w-6 h-6 rounded-full bg-cyan-600/80 shadow-lg flex items-center justify-center animate-bounce">
                    <svg width="18" height="18" fill="none"><circle cx="9" cy="9" r="8" fill="#0ff" /></svg>
                  </span>
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex items-center border-t border-cyan-400/25 px-2 py-2 flex-shrink-0"
        >
          <input
            type="text"
            className="flex-1 bg-cyan-400/10 text-cyan-100 placeholder:text-cyan-200/50 text-xs px-2 py-1 rounded-md outline-none mr-2"
            placeholder="Ask me anything..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            autoComplete="off"
          />
          <CyberButton
            variant="primary"
            size="sm"
            style={{ animationDelay: '0s' }}
            type="submit"
          >
            Send
          </CyberButton>
        </form>
      </div>
    </div>
  );
};

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [popupOpen, setPopupOpen] = useState(false);
  const [popupBadge, setPopupBadge] = useState('SQL');
  const [popupDesc, setPopupDesc] = useState('');
  const [popupLink, setPopupLink] = useState('');

  const buttonclickRef = useRef<HTMLAudioElement | null>(null);

  const playButtonClick = () => {
    if (buttonclickRef.current) {
      buttonclickRef.current.currentTime = 0;
      buttonclickRef.current.play();
    }
  };

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
    playButtonClick();
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
      <audio ref={buttonclickRef} src={buttonClickSound} preload="auto" />
      <div className="flex flex-col min-h-screen relative z-20">
        {/* Top Section - Title and Buttons */}
        <div className="flex-1 flex items-center justify-center py-4">
          <div className="text-center space-y-6 max-w-6xl mx-auto px-0">
            {/* Main Title */}
            <div className="mb-2 pt-10">
              <h1 className="text-4xl md:text-5xl font-cyber font-bold text-primary mb-3 glitch-text animate-pulse-glow" data-text="DATASENSE PRACTICE ARENA">
                DATASENSE PRACTICE ARENA
              </h1>
              <p className="text-base md:text-lg font-mono text-muted-foreground tracking-wider">
                {/* ADVANCED PYTHON & SQL PRACTICE PLATFORM */}
                EMPOWERING DATA ENTHUSIASTS TO EXPERTISE
              </p>
              <div className="w-32 h-px bg-primary mx-auto mt-3 animate-pulse" />
            </div>
            
            {/* Action Buttons */}
            <div className="mb-1">
              <div className="flex flex-col sm:flex-row gap-6 items-center justify-center mb-6">
                {/* Join Live Quizzes */}
                <div className="group">
                  <CyberButton 
                    variant="primary" 
                    size="md"
                    className="animate-float w-48"
                    style={{ animationDelay: '0s' }}
                    onClick={() => handleOpenPopup('SQL')}
                  >
                    JOIN LIVE QUIZZES
                  </CyberButton>
                  <div className="text-xs font-mono text-muted-foreground mt-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    REAL-TIME NEURAL CHALLENGES
                  </div>
                </div>
                {/* Dashboard */}
                <div className="group">
                  <CyberButton 
                    variant="secondary" 
                    size="md"
                    className="animate-float"
                    style={{ animationDelay: '0.5s' }}
                    icon={
                      <LayoutDashboard className="w-8 h-8 font-bold" fill="currentColor" color="currentColor" />
                    }
                    onClick={() => handleOpenPopup('Dashboard')}
                  >
                    {/* Only icon, no text as requested */}
                  </CyberButton>
                  <div className="text-xs font-mono text-muted-foreground mt-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    NEURAL DASHBOARD ACCESS
                  </div>
                </div>
                {/* Custom Test */}
                <div className="group">
                  <CyberButton 
                    variant="primary" 
                    size="md"
                    className="animate-float w-48"
                    style={{ animationDelay: '1s' }}
                    onClick={() => handleOpenPopup('Custom Test')}
                  >
                    CUSTOM TEST
                  </CyberButton>
                  <div className="text-xs font-mono text-muted-foreground mt-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    PERSONALIZED TRAINING PROTOCOLS
                  </div>
                </div>
              </div>
              {/* New row for MOCK QUIZ and PRACTICE QUESTION */}
              <div className="flex flex-col sm:flex-row gap-6 items-center justify-center">
                <CyberButton 
                  variant="primary" 
                  size="md"
                  className="animate-float w-48"
                  style={{ animationDelay: '1.2s' }}
                  onClick={() => handleOpenPopup('Mock Quiz')}
                >
                  MOCK QUIZ
                </CyberButton>
                
                <CyberButton 
                  variant="primary" 
                  size="md"
                  className="animate-float w-48"
                  style={{ animationDelay: '1.4s' }}
                  onClick={() => handleOpenPopup('Practice Question')}
                >
                  PRACTICE QUESTION
                </CyberButton>
              </div>
            </div>
            
            {/* Chatbot - Fixed height, won't push content */}
            <div className="mb-8">
              <Chatbot />
            </div>
          </div>
        </div>
        
        {/* Bottom Section - Training Matrix (Fixed at bottom) */}
        <div className="flex-shrink-0 pb-8">
          <div className="flex justify-center gap-3 max-w-4xl mx-auto px-4">
            {/* TRAINING MATRIX STATUS Card */}
            <div className="hud-overlay border border-primary/30 p-4 w-64">
              <div className="text-center">
                <div className="text-primary font-mono text-xs mb-2 font-bold ">TRAINING MATRIX STATUS</div>
                <div className="flex justify-center space-x-3 text-xs font-mono">
                  <div className="text-cyber-success">● PYTHON</div>
                  <div className="text-cyber-success">● SQL</div>
                  <div className="text-cyber-warning">● ADVANCED</div>
                </div>
                <div className="mt-3 w-full bg-muted h-1 rounded">
                  <div className="bg-primary h-1 rounded animate-pulse" style={{ width: '85%' }} />
                </div>
                <div className="text-xs text-muted-foreground mt-2">NEURAL LINK STABILITY: 85%</div>
              </div>
            </div>
            {/* SYSTEM STATUS Card */}
            <div className="hud-overlay border border-primary/30 p-4 w-64">
              <div className="text-center">
                <div className="text-primary font-mono text-xs mb-2 font-bold ">SYSTEM STATUS</div>
                <div className="flex justify-center space-x-3 text-xs font-mono">
                  <div className="text-cyber-success">● ONLINE</div>
                  <div className="text-cyber-warning">● SYNCED</div>
                </div>
                <div className="mt-3 w-full bg-muted h-1 rounded">
                  <div className="bg-cyan-400 h-1 rounded animate-pulse" style={{ width: '92%' }} />
                </div>
                <div className="text-xs text-muted-foreground mt-2">ALL SYSTEMS NOMINAL</div>
              </div>
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
        {/* <div className="absolute border border-primary/20 animate-float" style={{ width: '20px', height: '20px', left: '10%', top: '20%', animationDelay: '0.5s', animationDuration: '4s' }} /> */}

      </div>
      {/* Place GlobeLottie just left of the TRAINING MATRIX STATUS box */}
      <GlobeLottie style={{ position: 'absolute', left: 12, bottom: 240, width: 200, height: 200, zIndex: 30, pointerEvents: 'none', filter: 'drop-shadow(0 0 16px #00fff7cc)', background: 'transparent' }} />
      {/* Popup */}
      <FuturisticGlitchPopup open={popupOpen} onClose={() => setPopupOpen(false)} badgeType={popupBadge} description={popupDesc} yesLink={popupLink} />
      <WorldMapHUD style={{ right: 12, bottom: 12 }} />
      <CyberCoreHUD style={{ left: 12, bottom: 12 }} />
    </div>
  );
};

export default Index;