import { ReactNode, useEffect, useRef, useState, memo } from 'react';

interface LazySectionProps {
  children: ReactNode;
  threshold?: number;
  rootMargin?: string;
  fallback?: ReactNode;
  className?: string;
}

export const LazySection = memo(function LazySection({ 
  children, 
  threshold = 0.1, 
  rootMargin = '50px',
  fallback,
  className 
}: LazySectionProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          setIsIntersecting(true);
          if (!hasLoaded) {
            setHasLoaded(true);
            observer.disconnect();
          }
        }
      },
      { threshold, rootMargin }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [threshold, rootMargin, hasLoaded]);

  return (
    <div ref={ref} className={className}>
      {hasLoaded ? children : (fallback || <div className="w-full h-48 bg-muted animate-pulse rounded-lg" />)}
    </div>
  );
});