import { useEffect } from 'react';

interface WebVitalMetric {
  name: string;
  value: number;
  delta: number;
  id: string;
  entries: PerformanceEntry[];
}

export function useWebVitals(onMetric?: (metric: WebVitalMetric) => void) {
  useEffect(() => {
    if (!onMetric) return;

    // FCP - First Contentful Paint
    const fcpObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (entry.name === 'first-contentful-paint') {
          onMetric({
            name: 'FCP',
            value: entry.startTime,
            delta: entry.startTime,
            id: 'fcp',
            entries: [entry]
          });
        }
      }
    });
    fcpObserver.observe({ type: 'paint', buffered: true });

    // LCP - Largest Contentful Paint
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      onMetric({
        name: 'LCP',
        value: lastEntry.startTime,
        delta: lastEntry.startTime,
        id: 'lcp',
        entries: [lastEntry]
      });
    });
    lcpObserver.observe({ type: 'largest-contentful-paint', buffered: true });

    // CLS - Cumulative Layout Shift
    let clsValue = 0;
    const clsObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        if (!(entry as any).hadRecentInput) {
          clsValue += (entry as any).value;
          onMetric({
            name: 'CLS',
            value: clsValue,
            delta: (entry as any).value,
            id: 'cls',
            entries: [entry]
          });
        }
      }
    });
    clsObserver.observe({ type: 'layout-shift', buffered: true });

    // FID - First Input Delay
    const fidObserver = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        onMetric({
          name: 'FID',
          value: (entry as any).processingStart - entry.startTime,
          delta: (entry as any).processingStart - entry.startTime,
          id: 'fid',
          entries: [entry]
        });
      }
    });
    fidObserver.observe({ type: 'first-input', buffered: true });

    return () => {
      fcpObserver.disconnect();
      lcpObserver.disconnect();
      clsObserver.disconnect();
      fidObserver.disconnect();
    };
  }, [onMetric]);
}