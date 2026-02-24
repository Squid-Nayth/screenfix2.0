import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hoverEffect?: boolean;
}

export const GlassCard: React.FC<GlassCardProps> = ({ children, className = '', hoverEffect = false }) => {
  return (
    <div 
      className={`
        relative overflow-hidden rounded-[2.5rem] border border-white/60 bg-white/60 backdrop-blur-2xl shadow-xl
        ${hoverEffect ? 'transition-all duration-300 hover:bg-white/80 hover:scale-[1.02] hover:shadow-2xl' : ''}
        ${className}
      `}
    >
      {/* Light sheen overlay */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-white/40 to-transparent opacity-60"></div>
      <div className="relative z-10 h-full">
        {children}
      </div>
    </div>
  );
};