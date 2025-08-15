
import { memo } from 'react';
import { cn } from '@/lib/utils';

interface SliderControlsProps {
  sliderPosition: number;
  isDragging: boolean;
  isHovering: boolean;
  onMouseDown: (e: React.MouseEvent) => void;
  onTouchStart: (e: React.TouchEvent) => void;
}

export const SliderControls = memo(function SliderControls({
  sliderPosition,
  isDragging,
  isHovering,
  onMouseDown,
  onTouchStart
}: SliderControlsProps) {
  return (
    <>
      {/* Slider Line */}
      <div
        className={cn(
          "absolute top-0 bottom-0 bg-white shadow-lg z-20",
          isDragging ? "w-1" : "w-0.5",
          isHovering && !isDragging && "w-1"
        )}
        style={{ 
          left: `${sliderPosition}%`, 
          transform: 'translateX(-50%)',
          boxShadow: isDragging ? '0 0 20px rgba(255,255,255,0.8)' : '0 0 10px rgba(0,0,0,0.3)',
          transition: isDragging ? 'none' : 'width 0.2s ease, box-shadow 0.2s ease'
        }}
      />
      
      {/* Slider Handle */}
      <div
        className={cn(
          "absolute top-1/2 z-30 cursor-grab",
          isDragging ? "cursor-grabbing scale-110" : "cursor-grab",
          isHovering && !isDragging && "scale-105"
        )}
        style={{ 
          left: `${sliderPosition}%`, 
          transform: 'translate(-50%, -50%)',
          transition: isDragging ? 'none' : 'transform 0.2s ease'
        }}
        onMouseDown={onMouseDown}
        onTouchStart={onTouchStart}
      >
        <div className={cn(
          "w-10 h-10 bg-white rounded-full shadow-lg flex items-center justify-center",
          isDragging ? "shadow-xl bg-primary text-white" : "bg-white text-primary",
          isHovering && "shadow-xl"
        )}
        style={{
          transition: isDragging ? 'none' : 'all 0.2s ease'
        }}>
          <div className="flex space-x-0.5">
            <div className="w-0.5 h-4 bg-current rounded-full opacity-80"></div>
            <div className="w-0.5 h-4 bg-current rounded-full opacity-60"></div>
            <div className="w-0.5 h-4 bg-current rounded-full opacity-80"></div>
          </div>
        </div>
      </div>
    </>
  );
});
