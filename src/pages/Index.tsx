import { useState, useRef, useEffect, FormEvent } from 'react';
import CyberLoader from '@/components/CyberLoader';
import ThreeBackground from '@/components/ThreeBackground';
import CyberNav from '@/components/CyberNav';
import CyberButton from '@/components/CyberButton';
import SQLTerminal from '@/components/SQLTerminal';
import DataVisualization from '@/components/DataVisualization';
import { LayoutDashboard } from 'lucide-react';
import GlobeLottie from '@/components/GlobeLottie';
import PathTrackerHUD from '@/components/PathTrackerHUD';
import FuturisticGlitchPopup from '@/components/FuturisticGlitchPopup';
import CyberCoreHUD from '@/components/CyberCoreHUD';
import WorldMapHUD from '@/components/WorldMapHUD';
import buttonClickSound from '../assets/mp3/button-click.mp3';
import QuestionProgressCircle from '@/components/QuestionProgressCircle';

// Custom hook to detect mobile devices
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);

  return isMobile;
};

// AnimatedBar component for smooth progress animation
const AnimatedBar = ({ percent, color }: { percent: number; color: string }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let start: number | null = null;
    let animationFrame: number;

    const duration = 900; // ms, adjust for speed
    const animate = (timestamp: number) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      const nextProgress = Math.min(percent, Math.round((elapsed / duration) * percent));
      setProgress(nextProgress);
      if (nextProgress < percent) {
        animationFrame = requestAnimationFrame(animate);
      }
    };
    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [percent]);

  return (
    <div className="w-full bg-muted h-1 rounded">
      <div
        className={`${color} h-1 rounded animate-pulse`}
        style={{ width: `${progress}%`, transition: 'width 0.1s linear' }}
      />
    </div>
  );
};

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
    <div className="relative w-full max-w-md mx-auto flex flex-col h-40 md:h-48">
      <audio ref={buttonclickRef} src={buttonClickSound} preload="auto" />
      {/* Glow background */}
      <div className="absolute inset-0 z-0 rounded-lg pointer-events-none animate-pulse-glow bg-cyan-400/20 blur-xl" />
      {/* Chatbot content */}
      <div className="relative z-10 bg-[#0C1116] text-cyan-100 shadow-[0_0_20px_rgba(0,255,255,0.25)] flex flex-col h-full rounded-lg">
        <div className="border-b border-cyan-400/25 px-2.5 py-1.5 font-bold tracking-widest text-sm md:text-base text-cyan-200 drop-shadow-lg text-left">
          DataSense AI Assistant
        </div>

        <div className="flex-1 px-2.5 py-1.5 overflow-y-auto text-xs min-h-0" id="chatbot-messages">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`mb-1.5 flex items-end ${msg.isUser ? 'justify-end' : 'justify-start'}`}
            >
              {!msg.isUser && (
                <div className="mr-1.5 flex-shrink-0">
                  <span className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-cyan-400/80 shadow-lg flex items-center justify-center animate-bounce text-xs">
                    🤖
                  </span>
                </div>
              )}
              <div
                className={`px-2 py-1 md:px-2.5 md:py-1.5 rounded-md max-w-[70%] transition-all duration-300 text-xs
                  ${msg.isUser
                    ? 'bg-cyan-500/20 text-cyan-100 border border-cyan-400/40 animate-fade-in-right'
                    : 'bg-cyan-400/10 text-cyan-200 border border-cyan-400/30 animate-fade-in-left'
                  }`}
              >
                {msg.text}
              </div>
              {msg.isUser && (
                <div className="ml-1.5 flex-shrink-0">
                  <span className="w-4 h-4 md:w-5 md:h-5 rounded-full bg-cyan-600/80 shadow-lg flex items-center justify-center animate-bounce">
                    <svg width="12" height="12" fill="none"><circle cx="6" cy="6" r="5" fill="#0ff" /></svg>
                  </span>
                </div>
              )}
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <form
          onSubmit={handleSubmit}
          className="flex items-center border-t border-cyan-400/25 px-1.5 py-1.5 flex-shrink-0"
        >
          <input
            type="text"
            className="flex-1 bg-cyan-400/10 text-cyan-100 placeholder:text-cyan-200/50 text-xs px-1.5 py-1 rounded-md outline-none mr-1.5"
            placeholder="Ask me anything..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            autoComplete="off"
          />
          <CyberButton
            variant="outline"
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
  const isMobile = useIsMobile();

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
    <div className="min-h-[100dvh] relative overflow-auto">
      {/* Three.js Background - Always render */}
      <ThreeBackground />
      
      {/* Desktop-only components */}
      {!isMobile && (
        <>
          <PathTrackerHUD />
          <SQLTerminal />
          <DataVisualization />
          <QuestionProgressCircle />
          <GlobeLottie style={{ 
            position: 'absolute', 
            left: 28, 
            bottom: 242, 
            width: 170, 
            height: 170, 
            zIndex: 30, 
            pointerEvents: 'none', 
            filter: 'drop-shadow(0 0 14px #00fff7cc)', 
            background: 'transparent' 
          }} />
          <WorldMapHUD style={{ right: 10, bottom: 10 }} />
          <CyberCoreHUD style={{ left: 10, bottom: 10 }} />
          
          {/* Floating Geometric Elements - Desktop only */}
          <div className="fixed inset-0 pointer-events-none z-10">
            {Array.from({ length: 5 }).map((_, i) => (
              <div
                key={i}
                className="absolute border border-primary/20 animate-float"
                style={{
                  width: `${18 + i * 9}px`,
                  height: `${18 + i * 9}px`,
                  left: `${10 + i * 20}%`,
                  top: `${20 + i * 15}%`,
                  animationDelay: `${i * 0.5}s`,
                  animationDuration: `${4 + i}s`
                }}
              />
            ))}
          </div>
        </>
      )}
      
      {/* Navigation - Always render */}
      <CyberNav />
      
      {/* Main Content */}
      <audio ref={buttonclickRef} src={buttonClickSound} preload="auto" />
      <div className="flex flex-col min-h-[100dvh] relative overflow-auto">
        {/* Mobile Layout */}
        {isMobile ? (
          <div className="flex flex-col min-h-[100dvh] p-4 pt-20">
            {/* Title Area */}
            <div className="text-center mb-20 pt-8">
              <div className="relative w-fit mx-auto">
                <div className="absolute inset-0 animate-pulse-glow bg-cyan-400/20 blur-xl rounded-lg pointer-events-none"></div>
                <h1 className="text-3xl sm:text-4xl font-black-ops-one font-bold text-primary mb-3">
                  DATASENSE PRACTICE ARENA
                </h1>
                <p className="text-sm font-mono text-white ">
                  EMPOWERING DATA ENTHUSIASTS TO EXPERTISE
                </p>
              </div>
            </div>
            
            {/* Button Area */}
            <div className="flex-1 flex items-center justify-center mb-20">
              <div className="space-y-6">
                {/* First row - Two buttons */}
                <div className="flex gap-4 justify-center">
                  <CyberButton 
                    variant="primary" 
                    size="sm"
                    className="flex-1 max-w-[200px]"
                    style={{ animationDelay: '0s' }}
                    onClick={() => handleOpenPopup('SQL')}
                  >
                    Join Live Tests
                  </CyberButton>
                  
                  <CyberButton 
                    variant="primary" 
                    size="sm"
                    className="flex-1 max-w-[140px]"
                    style={{ animationDelay: '0s' }}
                    onClick={() => handleOpenPopup('Custom Test')}
                  >
                    Custom Test
                  </CyberButton>
                </div>
                
                {/* Second row - Dashboard button (circular) */}
                <div className="flex justify-center">
                  <CyberButton
                    variant="secondary"
                    size="md"
                    className="
                      !rounded-full
                      !w-12 !h-12
                      p-0
                      shadow-cyan-400/40 hover:shadow-cyan-400/80 transition-shadow
                      animate-spin-slow
                      ring-2 ring-cyan-400/60 hover:ring-cyan-400/90
                      relative
                      group
                    "
                    style={{
                      minWidth: '3rem',
                      minHeight: '3rem',
                      width: '3rem',
                      height: '3rem',
                      animationDelay: '0s'
                    }}
                    icon={
                      <LayoutDashboard
                        className="w-6 h-6 font-bold flex-shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6"
                        fill="currentColor"
                        color="currentColor"
                      />
                    }
                    onClick={() => handleOpenPopup('Dashboard')}
                  >
                  </CyberButton>
                </div>
                
                {/* Third row - Two buttons */}
                <div className="flex gap-4 justify-center">
                  <CyberButton 
                    variant="primary" 
                    size="sm"
                    className="flex-1 max-w-[140px]"
                    style={{ animationDelay: '0s' }}
                    onClick={() => handleOpenPopup('Mock Quiz')}
                  >
                    Mock Tests
                  </CyberButton>
                  
                  <CyberButton 
                    variant="primary" 
                    size="sm"
                    className="flex-1 max-w-[200px]"
                    style={{ animationDelay: '0s' }}
                    onClick={() => handleOpenPopup('Practice Question')}
                  >
                    Practice Question
                  </CyberButton>
                </div>
              </div>
            </div>
            
            {/* Chatbot Area */}
            <div className="flex-shrink-0 mb-6">
              <Chatbot />
            </div>
          </div>
        ) : (
          /* Desktop Layout - Original */
          <>
            {/* Top Section - Title and Buttons */}
            <div className="flex-1 flex items-center justify-center py-3">
              <div className="text-center space-y-5 max-w-5xl mx-auto px-0">
                {/* Main Title */}
                <div className="relative w-fit mx-auto">
                  <div className="absolute inset-0 animate-pulse-glow bg-cyan-400/20 blur-xl rounded-lg pointer-events-none"></div>
                  <h1 className="text-3xl md:text-5xl font-black-ops-one font-bold text-primary mb-2.5">
                    DATASENSE PRACTICE ARENA
                  </h1>
                  <p className="text-sm md:text-base font-mono text-white tracking-wider">
                    EMPOWERING DATA ENTHUSIASTS TO EXPERTISE
                  </p>
                  <div className="w-28 h-px mx-auto mt-6" />
                </div>
                
                {/* Action Buttons */}
                <div className="mb-8">
                  <div className="flex flex-col sm:flex-row gap-1 items-center justify-center mb-5">
                    {/* Join Live Quizzes */}
                    <div className="group">
                      <CyberButton 
                        variant="primary" 
                        size="md"
                        className="w-52"
                        style={{ animationDelay: '0s' }}
                        onClick={() => handleOpenPopup('SQL')}
                      >
                        Join Live Tests
                      </CyberButton>
                      <div className="text-xs font-mono text-muted-foreground mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        Real-Time Challenges
                      </div>
                    </div>
                    {/* Dashboard */}
                    <div className="group">
                      <CyberButton
                        variant="secondary"
                        size="md"
                        className="
                          !rounded-full
                          !w-10 !h-10
                          p-0
                          shadow-cyan-400/40 hover:shadow-cyan-400/80 transition-shadow
                          animate-spin-slow
                          ring-2 ring-cyan-400/60 hover:ring-cyan-400/90
                          relative
                          group
                        "
                        style={{
                          minWidth: '4rem',
                          minHeight: '4rem',
                          width: '4rem',
                          height: '4rem',
                          animationDelay: '0s'
                        }}
                        icon={
                          <LayoutDashboard
                            className="w-14 h-14 font-bold flex-shrink-0 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6"
                            fill="currentColor"
                            color="currentColor"
                          />
                        }
                        onClick={() => handleOpenPopup('Dashboard')}
                      >
                      </CyberButton>
                      <div className="text-xs font-mono text-muted-foreground mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        Neural Dashboard
                      </div>
                    </div>
                    {/* Custom Test */}
                    <div className="group">
                      <CyberButton 
                        variant="primary" 
                        size="md"
                        className="w-52"
                        style={{ animationDelay: '0s' }}
                        onClick={() => handleOpenPopup('Custom Test')}
                      >
                        Custom Test
                      </CyberButton>
                      <div className="text-xs font-mono text-muted-foreground mt-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        Personalized Training Protocols
                      </div>
                    </div>
                  </div>
                  {/* New row for MOCK QUIZ and PRACTICE QUESTION */}
                  <div className="flex flex-col sm:flex-row gap-5 items-center justify-center">
                    <CyberButton 
                      variant="primary" 
                      size="md"
                      className="w-52"
                      style={{ animationDelay: '0s' }}
                      onClick={() => handleOpenPopup('Mock Quiz')}
                    >
                      Mock Tests
                    </CyberButton>
                    
                    <CyberButton 
                      variant="primary" 
                      size="md"
                      className="w-52"
                      style={{ animationDelay: '0s' }}
                      onClick={() => handleOpenPopup('Practice Question')}
                    >
                      Practice Questions
                    </CyberButton>
                  </div>
                  <div className="w-28 h-px mx-auto mt-6" />
                </div>
                
                {/* Chatbot - Fixed height, won't push content */}
                <div className="mb-6">
                  <Chatbot />
                </div>
              </div>
            </div>
            
            {/* Bottom Section - Training Matrix (Fixed at bottom) */}
            <div className="flex-shrink-0 pb-6">
              <div className="flex justify-center gap-2.5 max-w-3xl mx-auto px-3">
                {/* TRAINING MATRIX STATUS Card */}
                <div className="hud-overlay border border-primary/30 p-3 w-60">
                  <div className="text-left">
                    <div className="text-cyber-success font-mono text-xs mb-1.5 font-bold">● 3000+ Practice Questions</div>
                    <div className="text-[#ff00a6] font-mono text-xs mb-1.5 font-bold">● 30+ Mock Quizzes</div>
                    <div className="text-cyber-warning font-mono text-xs mb-1.5 font-bold">● 5+ Active Live Quiz</div>
                    {/* <div className="flex justify-center space-x-2.5 text-xs font-mono">
                      <div className="text-cyber-success">● PYTHON</div>
                      <div className="text-cyber-success">● SQL</div>
                      <div className="text-cyber-warning">● ADVANCED</div>
                    </div> */}
                    <div className="mt-2.5">
                      <AnimatedBar percent={88} color="bg-primary" />
                    </div>
                    {/* <div className="text-xs text-muted-foreground mt-1.5">NEURAL LINK STABILITY: 85%</div> */}
                  </div>
                </div>
                {/* SYSTEM STATUS Card */}
                <div className="hud-overlay border border-primary/30 p-3 w-60">
                  <div className="text-center">
                    <div className="text-primary font-mono text-xs mb-1.5 font-bold">SYSTEM STATUS</div>
                    <div className="flex flex-col items-center space-y-1 text-xs font-mono">
                      <div>
                        <span className="text-cyber-success">● {new Date().toLocaleTimeString()}</span>
                        <span className="ml-2 text-cyber-warning">● ACTIVE: {1247}</span>
                      </div>
                    </div>
                    <div className="mt-2.5">
                      <AnimatedBar percent={92} color="bg-cyan-400" />
                    </div>
                    <div className="text-xs text-muted-foreground mt-1.5">ALL SYSTEMS NOMINAL</div>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
      
      {/* Popup - Always render */}
      <FuturisticGlitchPopup 
        open={popupOpen} 
        onClose={() => setPopupOpen(false)} 
        badgeType={popupBadge} 
        description={popupDesc} 
        yesLink={popupLink} 
      />
    </div>
  );
};

export default Index;