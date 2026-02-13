import React, { useEffect, useRef } from 'react';

/**
 * Componente SplineBackground
 * Renderiza la escena de Star Wars como fondo de la aplicación.
 */
const SplineBackground = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    // Evitamos duplicar el script si el componente se re-renderiza
    const existingScript = document.querySelector('script[src*="spline-viewer.js"]');
    
    if (!existingScript) {
      const script = document.createElement('script');
      script.type = 'module';
      script.src = 'https://unpkg.com/@splinetool/viewer@1.0.93/build/spline-viewer.js';
      document.head.appendChild(script);
    }
  }, []);

  return (
    <div 
      ref={containerRef} 
      style={{ 
        width: '100%', 
        height: '100vh', 
        backgroundColor: '#000', 
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Web Component de Spline */}
      <spline-viewer 
        url="https://prod.spline.design/sG6REsZkQIbhLGsF/scene.splinecode" 
      />
    </div>
  );
};

export default SplineBackground;