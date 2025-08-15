
import { memo } from 'react';
import { cn } from '@/lib/utils';

interface SliderLabelsProps {
  sliderPosition: number;
  beforeAlt: string;
  afterAlt: string;
  isDragging: boolean;
}

export const SliderLabels = memo(function SliderLabels({
  sliderPosition,
  beforeAlt,
  afterAlt,
  isDragging
}: SliderLabelsProps) {
  return (
    <>
      {/* Before Label */}
      <div 
        className={cn(
          "absolute top-2 sm:top-4 left-2 sm:left-4 px-2 sm:px-3 py-1 sm:py-1.5 bg-black/80 backdrop-blur-sm rounded-full text-white text-xs sm:text-sm font-medium z-20",
          sliderPosition > 75 && "bg-white/90 text-black"
        )}
        style={{
          transition: isDragging ? 'none' : 'all 0.3s ease'
        }}
      >
        <span className="hidden sm:inline">{beforeAlt}</span>
        <span className="sm:hidden">Original</span>
      </div>
      
      {/* After Label */}
      <div 
        className={cn(
          "absolute top-2 sm:top-4 right-2 sm:right-4 px-2 sm:px-3 py-1 sm:py-1.5 bg-black/80 backdrop-blur-sm rounded-full text-white text-xs sm:text-sm font-medium z-20",
          sliderPosition < 25 && "bg-white/90 text-black"
        )}
        style={{
          transition: isDragging ? 'none' : 'all 0.3s ease'
        }}
      >
        <span className="hidden sm:inline">{afterAlt}</span>
        <span className="sm:hidden">Profissional</span>
      </div>
      
      {/* Progress indicator */}
      <div className="absolute bottom-2 sm:bottom-4 left-1/2 transform -translate-x-1/2 bg-black/80 backdrop-blur-sm rounded-full px-2 sm:px-3 py-1 z-20">
        <div className="text-white text-xs font-medium">
          {Math.round(sliderPosition)}%
        </div>
      </div>
    </>
  );
});
