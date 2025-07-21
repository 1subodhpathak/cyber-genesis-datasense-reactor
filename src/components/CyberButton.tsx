import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface CyberButtonProps {
  children?: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  onClick?: () => void;
  icon?: ReactNode;
  style?: React.CSSProperties;
}

const CyberButton = ({ 
  children, 
  variant = 'primary', 
  size = 'md', 
  className,
  onClick,
  icon,
  style
}: CyberButtonProps) => {
  const baseClasses = "relative overflow-hidden font-mono font-bold tracking-wider transition-all duration-300 group";
  
  const variantClasses = {
    primary: "bg-transparent border-2 border-primary text-primary hover:bg-primary hover:text-background cyber-glow",
    secondary: "bg-transparent border-2 border-accent text-accent hover:bg-accent hover:text-background",
    outline: "bg-transparent border border-muted-foreground text-muted-foreground hover:border-primary hover:text-primary"
  };

  const sizeClasses = {
    sm: "px-4 py-2 text-sm",
    md: "px-8 py-4 text-base",
    lg: "px-12 py-6 text-lg"
  };

  return (
    <Button
      onClick={onClick}
      style={style}
      className={cn(
        baseClasses,
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
    >
      {/* Scan line effect */}
      <div className="absolute inset-0 scan-line opacity-0 group-hover:opacity-100" />
      
      {/* Corner decorations */}
      <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-current opacity-50 group-hover:opacity-100 transition-opacity" />
      <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-current opacity-50 group-hover:opacity-100 transition-opacity" />
      <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-current opacity-50 group-hover:opacity-100 transition-opacity" />
      <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-current opacity-50 group-hover:opacity-100 transition-opacity" />
      
      {/* Content */}
      <div className="relative z-10 flex items-center justify-center gap-2">
        {icon && <div className="w-5 h-5">{icon}</div>}
        {children}
      </div>
      
      {/* Glow effect on hover */}
      <div className="absolute inset-0 bg-current opacity-0 group-hover:opacity-10 transition-opacity blur-sm" />
    </Button>
  );
};

export default CyberButton;