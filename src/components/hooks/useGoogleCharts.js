import { useEffect, useState } from 'react';

export default function useGoogleCharts() {
  const [google, setGoogle] = useState(null);

  useEffect(() => {
    if (!window.google) {
      const script = document.createElement('script');
      script.src = 'https://www.gstatic.com/charts/loader.js';
      script.async = true;
      script.onload = () => {
        window.google.charts.load('current', {
          packages: ['corechart', 'line'],
          callback: () => setGoogle(window.google)
        });
      };
      document.head.appendChild(script);
    } else if (window.google && !google) {
      setGoogle(window.google);
    }

    return () => {
      // Cleanup if needed
    };
  }, []);

  return google;
}