// Performance utilities

// Image format detection and optimization
export const getOptimalImageFormat = () => {
  // Check for WebP support
  const canvas = document.createElement('canvas');
  canvas.width = 1;
  canvas.height = 1;
  const webpSupported = canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
  
  // Check for AVIF support
  const avifSupported = new Promise((resolve) => {
    const avif = new Image();
    avif.onload = avif.onerror = () => resolve(avif.height === 1);
    avif.src = 'data:image/avif;base64,AAAAIGZ0eXBhdmlmAAAAAGF2aWZtaWYxbWlhZk1BMUIAAADybWV0YQAAAAAAAAAoaGRscgAAAAAAAAAAcGljdAAAAAAAAAAAAAAAAGxpYmF2aWYAAAAADnBpdG0AAAAAAAEAAAAeaWxvYwAAAABEAAABAAEAAAABAAABGgAAAB0AAAAoaWluZgAAAAAAAQAAABppbmZlAgAAAAABAABhdjAxQ29sb3IAAAAAamlwcnAAAABLaXBjbwAAABRpc3BlAAAAAAAAAAIAAAACAAAAEHBpeGkAAAAAAwgICAAAAAxhdjFDgQ0MAAAAABNjb2xybmNseAACAAIAAYAAAAAXaXBtYQAAAAAAAAABAAEEAQKDBAAAACVtZGF0EgAKCBgABogQEAwgMg8f8D///8WfhwB8+ErK42A=';
  });
  
  return { webpSupported, avifSupported };
};

// Preload critical resources
export const preloadImage = (src: string, priority: 'high' | 'low' = 'low', sizes?: string) => {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'image';
  link.href = src;
  link.fetchPriority = priority;
  if (sizes) link.setAttribute('imagesizes', sizes);
  document.head.appendChild(link);
};

// Preload multiple images with different formats
export const preloadImageWithFormats = (baseSrc: string, priority: 'high' | 'low' = 'low') => {
  const { webpSupported } = getOptimalImageFormat();
  
  if (webpSupported && baseSrc.includes('.webp')) {
    preloadImage(baseSrc, priority);
  } else {
    // Fallback to original format
    const fallbackSrc = baseSrc.replace('.webp', '.jpg');
    preloadImage(fallbackSrc, priority);
  }
};

// Preload script
export const preloadScript = (src: string) => {
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'script';
  link.href = src;
  document.head.appendChild(link);
};

// Critical CSS injection
export const injectCriticalCSS = (css: string) => {
  const style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);
};

// Modern script loading
export const loadModernScript = async (modernSrc: string, legacySrc: string) => {
  const script = document.createElement('script');
  
  // Feature detection for modern JS support
  const supportsModules = 'noModule' in HTMLScriptElement.prototype;
  
  if (supportsModules) {
    script.type = 'module';
    script.src = modernSrc;
  } else {
    script.src = legacySrc;
    (script as any).noModule = true;
  }
  
  script.async = true;
  document.head.appendChild(script);
};

// Resource hints
export const addResourceHints = () => {
  const hints = [
    { rel: 'dns-prefetch', href: 'https://fonts.googleapis.com' },
    { rel: 'dns-prefetch', href: 'https://fonts.gstatic.com' },
    { rel: 'dns-prefetch', href: 'https://connect.facebook.net' },
    { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
    { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: 'anonymous' }
  ];

  hints.forEach(hint => {
    const link = document.createElement('link');
    link.rel = hint.rel;
    link.href = hint.href;
    if (hint.crossorigin) link.crossOrigin = hint.crossorigin;
    document.head.appendChild(link);
  });
};

// Lazy load images with Intersection Observer
export const lazyLoadImages = () => {
  const images = document.querySelectorAll('img[data-src]');
  
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement;
        img.src = img.dataset.src!;
        img.classList.remove('lazy');
        observer.unobserve(img);
      }
    });
  });

  images.forEach(img => imageObserver.observe(img));
};

// Optimize images with Intersection Observer
export const optimizeImageLoading = () => {
  const images = document.querySelectorAll('img[data-src]');
  
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement;
        
        // Add loading animation
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease-in-out';
        
        img.onload = () => {
          img.style.opacity = '1';
        };
        
        img.src = img.dataset.src!;
        img.removeAttribute('data-src');
        observer.unobserve(img);
      }
    });
  }, { rootMargin: '50px' });

  images.forEach(img => imageObserver.observe(img));
};

// Web Vitals tracking
export const trackWebVitals = () => {
  // FCP - First Contentful Paint
  new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (entry.name === 'first-contentful-paint') {
        console.log('FCP:', entry.startTime);
      }
    }
  }).observe({ type: 'paint', buffered: true });

  // LCP - Largest Contentful Paint
  new PerformanceObserver((list) => {
    const entries = list.getEntries();
    const lastEntry = entries[entries.length - 1];
    console.log('LCP:', lastEntry.startTime);
  }).observe({ type: 'largest-contentful-paint', buffered: true });

  // CLS - Cumulative Layout Shift
  let clsValue = 0;
  new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
      if (!(entry as any).hadRecentInput) {
        clsValue += (entry as any).value;
      }
    }
    console.log('CLS:', clsValue);
  }).observe({ type: 'layout-shift', buffered: true });
};

// Critical resource loading optimization
export const optimizeCriticalResources = () => {
  // Preload hero images with high priority
  preloadImageWithFormats('/src/assets/before-photo.webp', 'high');
  preloadImageWithFormats('/src/assets/after-photo.webp', 'high');
  
  // Preload other important images with lower priority
  const importantImages = [
    '/src/assets/before-after-1.webp',
    '/src/assets/before-after-2.webp',
    '/src/assets/matteo-enzo.webp'
  ];
  
  importantImages.forEach(src => {
    setTimeout(() => preloadImageWithFormats(src, 'low'), 1000);
  });
};

// Enhanced performance initialization
export const initPerformance = () => {
  // Use requestIdleCallback for non-critical optimizations
  const scheduleOptimizations = () => {
    // Optimize critical resources immediately
    optimizeCriticalResources();
    
    // Schedule other optimizations during idle time
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        optimizeImageLoading();
        addResourceHints();
        
        // Track vitals in development only
        if (import.meta.env.DEV) {
          trackWebVitals();
        }
      }, { timeout: 2000 });
    } else {
      // Fallback for browsers without requestIdleCallback
      setTimeout(() => {
        optimizeImageLoading();
        addResourceHints();
        
        if (import.meta.env.DEV) {
          trackWebVitals();
        }
      }, 100);
    }
  };

  // Initialize based on document ready state
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', scheduleOptimizations);
  } else {
    scheduleOptimizations();
  }

  // Initialize legacy lazy loading as fallback
  window.addEventListener('load', () => {
    requestIdleCallback(lazyLoadImages, { timeout: 1000 });
  });
};