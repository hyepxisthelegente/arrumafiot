import { useState, useCallback, ImgHTMLAttributes, memo } from 'react';
import { cn } from '@/lib/utils';

interface OptimizedImageProps extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'loading'> {
  src: string;
  alt: string;
  className?: string;
  fallback?: string;
  lazy?: boolean;
  aspectRatio?: string;
  width?: number;
  height?: number;
  priority?: boolean;
}

export const OptimizedImage = memo(function OptimizedImage({ 
  src, 
  alt, 
  className, 
  fallback,
  lazy = true,
  aspectRatio,
  width,
  height,
  priority = false,
  ...props 
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  const handleLoad = useCallback(() => {
    setIsLoaded(true);
    setIsLoading(false);
  }, []);

  const handleError = useCallback(() => {
    setHasError(true);
    setIsLoaded(true);
    setIsLoading(false);
  }, []);

  // Fallback para quando a imagem não carrega
  if (hasError && !fallback) {
    return (
      <div 
        className={cn("bg-muted flex items-center justify-center", aspectRatio && `aspect-[${aspectRatio}]`, className)}
        style={width && height ? { width: `${width}px`, height: `${height}px` } : undefined}
      >
        <span className="text-muted-foreground text-sm">Imagem não disponível</span>
      </div>
    );
  }

  return (
    <div 
      className={cn("relative overflow-hidden", aspectRatio && `aspect-[${aspectRatio}]`, className)}
      style={width && height ? { width: `${width}px`, height: `${height}px` } : undefined}
    >
      {isLoading && !isLoaded && (
        <div className="absolute inset-0 bg-muted animate-pulse flex items-center justify-center">
          <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
      
      <img
        src={hasError && fallback ? fallback : src}
        alt={alt}
        width={width}
        height={height}
        loading={priority ? "eager" : lazy ? "lazy" : "eager"}
        decoding="async"
        fetchPriority={priority ? "high" : "auto"}
        onLoad={handleLoad}
        onError={handleError}
        className={cn(
          "transition-opacity duration-300",
          isLoaded || !lazy ? "opacity-100" : "opacity-0",
          hasError ? "opacity-50" : "",
          "w-full h-full object-cover"
        )}
        style={{ contentVisibility: "auto" }}
        {...props}
      />
    </div>
  );
});