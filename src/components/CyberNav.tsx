import React ,{ useState } from 'react';
import CyberButton from './CyberButton';
import { Bell, Users } from 'lucide-react';
import { SignInButton, UserButton, useUser } from "@clerk/clerk-react";
import SoundManager from './SoundManager';
import {
  FaYoutube,
  FaLinkedin,
  FaInstagram,
  FaWhatsapp,
  FaFacebook
} from "react-icons/fa";
// import { title } from 'process';

const socialLinks = [
  { icon: FaYoutube, title: "Youtube", url: "https://youtube.com" },
  { icon: FaLinkedin, title: "LinkedIn", url: "https://linkedin.com" },
  { icon: FaFacebook, title: "Facebook", url: "https://facebook.com" },
  { icon: FaInstagram, title: "Instagram", url: "https://instagram.com" },
  { icon: FaWhatsapp, title: "WhatsApp", url: "https://whatsapp.com" },
];

const CyberNav = () => {
  const { isSignedIn } = useUser();
  const [showSocial, setShowSocial] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleMouseEnter = () => {
    setShowSocial(true);
    setIsAnimating(true);
  };

  const handleMouseLeave = () => {
    setIsAnimating(false);
    // Delay hiding to allow exit animation
    setTimeout(() => setShowSocial(false), 300);
  };

  return (
    <nav className="absolute top-0 left-0 right-0 z-40 pt-3">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <div className="group">
          <img src="assets/logo.png" alt="DATASENSE" className="h-7 md:h-9 rounded-lg shadow-lg" />
          <div className="h-0.5 bg-primary/50 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
        </div>

        {/* Right side: Auth button + SoundManager */}
        <div className="flex items-center gap-4">
          <div
            className="relative group"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {/* Main Bell Button */}
            <button className={`relative w-12 h-12 bg-gray-800/50 backdrop-blur-lg rounded-full border border-cyan-400/30 flex items-center justify-center transition-all duration-300 ${
              showSocial ? 'bg-cyan-400/20 border-cyan-400/60 shadow-lg shadow-cyan-400/25' : 'hover:bg-cyan-400/10'
            }`}>
              <Bell className={`w-6 h-6 text-cyan-400 transition-all duration-300 ${
                showSocial ? 'animate-pulse scale-110' : ''
              }`} />
              {/* Notification dot with pulse */}
              <div className={`absolute top-2 right-2 w-3 h-3 bg-red-500 rounded-full transition-all duration-300`} />
              
              {/* Scanning ring effect */}
              {showSocial && (
                <div className="absolute inset-0 rounded-full border-2 border-cyan-400/50 animate-ping" />
              )}
            </button>

            {/* Clean Social Panel - Centered on Bell */}
            {showSocial && (
              <div className="absolute left-1/2 transform -translate-x-1/2 top-16 w-56 bg-gray-900/95 backdrop-blur-xl border border-cyan-400/30 rounded-lg overflow-hidden shadow-2xl shadow-cyan-400/10">
                {/* Social Links Grid */}
                <div className="p-4">
                  <div className="grid grid-cols-3 gap-3">
                    {socialLinks.map((link, i) => (
                      <a
                        key={i}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group/social relative w-14 h-14 bg-gray-800/60 rounded-lg border border-cyan-400/20 flex items-center justify-center transition-all duration-300 hover:bg-cyan-400/10 hover:border-cyan-400/60"
                        style={{
                          transform: isAnimating ? 'translateY(0) scale(1)' : 'translateY(10px) scale(0.9)',
                          opacity: isAnimating ? 1 : 0,
                          transition: `all 0.3s ease-out ${i * 80}ms`
                        }}
                      >
                        {/* Icon */}
                        <div className="w-6 h-6 transition-transform duration-200 group-hover/social:scale-105">
                          {React.createElement(link.icon, { color: "#00fff7", size: 24 })}
                        </div>
                        
                        {/* Subtle hover glow */}
                        <div className="absolute inset-0 bg-cyan-400/5 rounded-lg opacity-0 group-hover/social:opacity-100 transition-opacity duration-200" />
                        
                        {/* Minimal corner indicators on hover */}
                        <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-cyan-400/60 opacity-0 group-hover/social:opacity-100 transition-opacity duration-200" />
                        <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-cyan-400/60 opacity-0 group-hover/social:opacity-100 transition-opacity duration-200" />
                        <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-cyan-400/60 opacity-0 group-hover/social:opacity-100 transition-opacity duration-200" />
                        <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-cyan-400/60 opacity-0 group-hover/social:opacity-100 transition-opacity duration-200" />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Auth Button */}
          {isSignedIn ? (
            <UserButton />
          ) : (
            <SignInButton>
              <CyberButton 
                variant="outline" 
                size="sm"
                icon={<Users className="w-4 h-4" />}
              >
                Sign In
              </CyberButton>
            </SignInButton>
          )}
          
          <SoundManager />
        </div>
      </div>
    </nav>
  );
};

export default CyberNav;