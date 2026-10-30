import React, { useState, useRef, useEffect } from 'react';
import { Info, Sparkles, X, HelpCircle, ArrowRight } from 'lucide-react';

interface HoverTooltipProps {
  title: string;
  description: string;
  actionDetails?: string;
  category?: string;
  children: React.ReactNode;
  position?: 'top' | 'bottom' | 'left' | 'right';
  className?: string;
}

export const HoverTooltip: React.FC<HoverTooltipProps> = ({
  title,
  description,
  actionDetails,
  category = 'Action',
  children,
  position = 'top',
  className = ''
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [hoverProgress, setHoverProgress] = useState(0); // 0 to 100%
  const [isHovering, setIsHovering] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const progressIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);

  const HOVER_THRESHOLD_MS = 7000; // Exactly 7 seconds as requested

  const handleMouseEnter = () => {
    setIsHovering(true);
    startTimeRef.current = Date.now();
    setHoverProgress(0);

    // Update progress indicator every 100ms
    progressIntervalRef.current = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      const progress = Math.min(100, (elapsed / HOVER_THRESHOLD_MS) * 100);
      setHoverProgress(progress);
    }, 100);

    // Trigger bubble after 7 seconds
    timerRef.current = setTimeout(() => {
      setIsVisible(true);
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    }, HOVER_THRESHOLD_MS);
  };

  const handleMouseLeave = () => {
    setIsHovering(false);
    setIsVisible(false);
    setHoverProgress(0);

    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    if (progressIntervalRef.current) {
      clearInterval(progressIntervalRef.current);
      progressIntervalRef.current = null;
    }
  };

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (progressIntervalRef.current) clearInterval(progressIntervalRef.current);
    };
  }, []);

  // Determine popup positioning styles
  const getPositionClasses = () => {
    switch (position) {
      case 'bottom':
        return 'top-full left-1/2 -translate-x-1/2 mt-2';
      case 'left':
        return 'right-full top-1/2 -translate-y-1/2 mr-2';
      case 'right':
        return 'left-full top-1/2 -translate-y-1/2 ml-2';
      case 'top':
      default:
        return 'bottom-full left-1/2 -translate-x-1/2 mb-2';
    }
  };

  return (
    <div 
      className={`relative inline-flex items-center ${className}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}

      {/* Subtle 7-second countdown progress bar on hover before bubble pops up */}
      {isHovering && !isVisible && hoverProgress > 5 && (
        <div className="absolute -top-1 left-0 right-0 h-0.5 bg-blue-900/50 rounded-full overflow-hidden pointer-events-none z-40">
          <div 
            className="h-full bg-blue-400 transition-all duration-100 ease-linear shadow-sm shadow-blue-400"
            style={{ width: `${hoverProgress}%` }}
          />
        </div>
      )}

      {/* 7-Second Information Bubble */}
      {isVisible && (
        <div 
          className={`absolute ${getPositionClasses()} z-50 w-72 md:w-80 p-3.5 bg-slate-900/95 backdrop-blur-md text-slate-100 border border-blue-500/40 rounded-xl shadow-2xl shadow-black/80 text-left pointer-events-auto animate-in fade-in zoom-in-95 duration-200`}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-start justify-between gap-2 mb-2 pb-2 border-b border-slate-800">
            <div className="flex items-center gap-1.5">
              <span className="p-1 rounded bg-blue-500/20 text-blue-400">
                <Info className="w-3.5 h-3.5" />
              </span>
              <div>
                <span className="text-[10px] uppercase font-bold tracking-wider text-blue-400 block">
                  {category} Guide • 7s Info Bubble
                </span>
                <h4 className="text-xs font-bold text-white leading-tight">
                  {title}
                </h4>
              </div>
            </div>
            <button
              onClick={() => setIsVisible(false)}
              className="text-slate-400 hover:text-white p-0.5 rounded transition"
              title="Dismiss"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Body Description */}
          <p className="text-xs text-slate-300 leading-relaxed mb-2.5">
            {description}
          </p>

          {/* Action Details / Click outcome */}
          {actionDetails && (
            <div className="bg-slate-950/80 rounded-lg p-2 border border-slate-800/80 text-[11px] text-slate-300 flex items-start gap-1.5">
              <ArrowRight className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-emerald-400 font-semibold block text-[10px] uppercase tracking-wide">
                  What happens when clicked:
                </strong>
                <span>{actionDetails}</span>
              </div>
            </div>
          )}

          {/* Arrow Pointer */}
          <div 
            className={`absolute w-2 h-2 bg-slate-900 border border-blue-500/40 rotate-45 pointer-events-none ${
              position === 'bottom'
                ? '-top-1 left-1/2 -translate-x-1/2 border-b-0 border-r-0'
                : position === 'left'
                ? '-right-1 top-1/2 -translate-y-1/2 border-b-0 border-l-0'
                : position === 'right'
                ? '-left-1 top-1/2 -translate-y-1/2 border-t-0 border-r-0'
                : '-bottom-1 left-1/2 -translate-x-1/2 border-t-0 border-l-0'
            }`} 
          />
        </div>
      )}
    </div>
  );
};
