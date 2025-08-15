import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Get container and create root
const container = document.getElementById("root");
if (!container) throw new Error('Root element not found');

const root = createRoot(container);

// Render app with error boundary
root.render(
  <App />
);

// Performance optimizations - non-blocking
const initPerformanceOptimizations = () => {
  // Remove loading indicators after content loads
  const removeLoadingElements = () => {
    const loadingElements = document.querySelectorAll('.loading-spinner');
    loadingElements.forEach(el => el.remove());
  };
  
  // Use RAF for smooth removal
  requestAnimationFrame(removeLoadingElements);
};

// Initialize performance optimizations after render
if (typeof requestIdleCallback !== 'undefined') {
  requestIdleCallback(initPerformanceOptimizations, { timeout: 1000 });
} else {
  setTimeout(initPerformanceOptimizations, 100);
}

// Register service worker efficiently
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js', { scope: '/' })
      .then(registration => {
        if (import.meta.env.DEV) console.log('SW registered:', registration);
      })
      .catch(error => {
        if (import.meta.env.DEV) console.log('SW registration failed:', error);
      });
  });
}