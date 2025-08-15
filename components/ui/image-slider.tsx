
import { memo } from "react";
import { cn } from "@/lib/utils";
import { useImageSlider } from "./image-slider/useImageSlider";
import { useImageLoading } from "./image-slider/useImageLoading";
import { SliderControls } from "./image-slider/SliderControls";
import { SliderLabels } from "./image-slider/SliderLabels";

interface ImageSliderProps {
  beforeImage: string;
  afterImage: string;
  beforeAlt?: string;
  afterAlt?: string;
  className?: string;
}

export const ImageSlider = memo(function ImageSlider({
  beforeImage,
  afterImage,
  beforeAlt = "Antes da IA",
  afterAlt = "Depois da IA",
  className
}: ImageSliderProps) {
  const {
    sliderPosition,
    containerRef,
    isDragging,
    isHovering,
    setIsDragging,
    setIsHovering,
    handleMouseMove,
    handleTouchMove,
    handleClick,
    handleMouseDown,
    handleTouchStart
  } = useImageSlider();

  const { isReady } = useImageLoading(beforeImage, afterImage);

  if (!isReady) {
    return (
      <div className={cn("relative overflow-hidden rounded-lg bg-muted animate-pulse flex items-center justify-center", className)}>
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative overflow-hidden rounded-lg cursor-col-resize select-none bg-card",
        isDragging && "cursor-grabbing",
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseUp={() => setIsDragging(false)}
      onTouchMove={handleTouchMove}
      onTouchEnd={() => setIsDragging(false)}
      onClick={handleClick}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => {
        setIsDragging(false);
        setIsHovering(false);
      }}
    >
      {/* Before Image */}
      <img
        src={beforeImage}
        alt={beforeAlt}
        className="w-full h-full object-cover"
        loading="lazy"
        draggable={false}
        style={{
          filter: isDragging ? 'brightness(0.9)' : 'brightness(1)',
          transition: isDragging ? 'none' : 'filter 0.2s ease'
        }}
      />
      
      {/* After Image */}
      <div
        className="absolute top-0 left-0 w-full h-full overflow-hidden"
        style={{ 
          clipPath: `inset(0 0 0 ${sliderPosition}%)`,
          filter: isDragging ? 'brightness(1.1)' : 'brightness(1)',
          transition: isDragging ? 'none' : 'filter 0.2s ease'
        }}
      >
        <img
          src={afterImage}
          alt={afterAlt}
          className="w-full h-full object-cover"
          loading="lazy"
          draggable={false}
        />
      </div>
      
      <SliderControls
        sliderPosition={sliderPosition}
        isDragging={isDragging}
        isHovering={isHovering}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      />
      
      <SliderLabels
        sliderPosition={sliderPosition}
        beforeAlt={beforeAlt}
        afterAlt={afterAlt}
        isDragging={isDragging}
      />
    </div>
  );
});
