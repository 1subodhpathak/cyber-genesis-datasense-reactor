// import { useState } from 'react';
// import CyberButton from './CyberButton';
// import { Bell, Users } from 'lucide-react';
// import { SignInButton, UserButton, useUser } from "@clerk/clerk-react";
// import SoundManager from './SoundManager';


// const socialLinks = [
//   { icon: <img src="assets/python.png" alt="YouTube" />, url: "https://youtube.com" },
//   { icon: <img src="assets/python.png" alt="LinkedIn" />, url: "https://linkedin.com" },
//   { icon: <img src="assets/python.png" alt="Facebook" />, url: "https://facebook.com" },
//   { icon: <img src="assets/python.png" alt="Instagram" />, url: "https://instagram.com" },
//   { icon: <img src="assets/python.png" alt="WhatsApp" />, url: "https://whatsapp.com" },
// ];

// const CyberNav = () => {
//   const { isSignedIn } = useUser();
//   const [showSocial, setShowSocial] = useState(false);

//   return (
//     <nav className="absolute top-0 left-0 right-0 z-40 pt-6">
//       <div className="flex justify-between items-center">
//         {/* Logo */}
//         <div className="group">
//           <img src="assets/logo.png" alt="DATASENSE" className="h-8 md:h-10 rounded-lg shadow-lg" />
//           {/* <h1 className="text-2xl font-cyber font-bold text-primary glitch-text cyber-glow" data-text="DATASENSE">
//             DATASENSE
//           </h1> */}
//           <div className="h-0.5 bg-primary/50 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
//         </div>

//         {/* Right side: Auth button + SoundManager */}
//         <div className="flex items-center gap-4">
//           <div
//             className="relative group"
//             onMouseEnter={() => setShowSocial(true)}
//             onMouseLeave={() => setShowSocial(false)}
//           >
//             <button className="relative w-12 h-12 bg-gray-800/50 backdrop-blur-lg rounded-full border border-cyan-400/30 flex items-center justify-center hover:bg-cyan-400/10 transition-all duration-300 group">
//               <Bell className="w-6 h-6 text-cyan-400 group-hover:animate-pulse" />
//               {/* Notification dot */}
//               <div className="absolute top-2 right-2 w-3 h-3 bg-red-500 rounded-full" />
//             </button>
//             {/* Social buttons */}
//             {showSocial && (
//             <div className="absolute left-1/5 top-1/3 transform -translate-x-1/2 -translate-y-1/2 pointer-events-none">
//               {socialLinks.map((link, i) => {
//                 // Semi-circle: angles from 180deg (π) to 360deg (2π)
//                 const startAngle = Math.PI; // 180deg
//                 const endAngle = 2 * Math.PI; // 360deg
//                 const angle = startAngle + (i / (socialLinks.length - 1)) * (endAngle - startAngle);
//                 const radius = 60; // px, adjust as needed
//                 const x = Math.cos(angle) * radius;
//                 const y = Math.sin(angle) * radius;
//                 return (
//                   <a
//                     key={i}
//                     href={link.url}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="absolute transition-all duration-300 pointer-events-auto"
//                     style={{
//                       left: `calc(50% + ${x}px)`,
//                       top: `calc(50% + ${y}px)`,
//                     }}
//                   >
//                     <div className="w-10 h-10 rounded-full bg-black/80 flex items-center justify-center border border-cyan-400 hover:scale-110">
//                       {link.icon}
//                     </div>
//                   </a>
//                 );
//               })}
//             </div>
//           )}
//           </div>
//           {isSignedIn ? (
//             <UserButton />
//           ) : (
//             <SignInButton>
//               <CyberButton 
//                 variant="outline" 
//                 size="sm"
//                 icon={<Users className="w-4 h-4" />}
//               >
//                 Sign In
//               </CyberButton>
//             </SignInButton>
//           )}
//           <SoundManager />
//         </div>
//       </div>
//     </nav>
//   );
// };

// export default CyberNav;

import { useState } from 'react';
import CyberButton from './CyberButton';
import { Bell, Users } from 'lucide-react';
import { SignInButton, UserButton, useUser } from "@clerk/clerk-react";
import SoundManager from './SoundManager';

const socialLinks = [
  { icon: <img src="assets/python.png" alt="YouTube" />, url: "https://youtube.com" },
  { icon: <img src="assets/python.png" alt="LinkedIn" />, url: "https://linkedin.com" },
  { icon: <img src="assets/python.png" alt="Facebook" />, url: "https://facebook.com" },
  { icon: <img src="assets/python.png" alt="Instagram" />, url: "https://instagram.com" },
  { icon: <img src="assets/python.png" alt="WhatsApp" />, url: "https://whatsapp.com" },
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
              <div className={`absolute top-2 right-2 w-3 h-3 bg-red-500 rounded-full transition-all duration-300 ${
                showSocial ? 'animate-ping' : ''
              }`} />
              
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
                          {link.icon}
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