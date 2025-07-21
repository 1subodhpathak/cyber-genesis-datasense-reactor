import CyberButton from './CyberButton';
import { Users } from 'lucide-react';

const CyberNav = () => {
  return (
    <nav className="absolute top-0 left-0 right-0 z-40 p-6">
      <div className="flex justify-between items-center">
        {/* Logo */}
        <div className="group">
          <h1 className="text-2xl font-cyber font-bold text-primary glitch-text cyber-glow" data-text="DATASENSE">
            DATASENSE
          </h1>
          <div className="h-0.5 bg-primary/50 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300" />
        </div>

        {/* Community Button */}
        <CyberButton 
          variant="outline" 
          size="sm"
          icon={<Users className="w-4 h-4" />}
        >
          COMMUNITY
        </CyberButton>
      </div>
      
      {/* Nav border effect */}
      <div className="absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent" />
    </nav>
  );
};

export default CyberNav;