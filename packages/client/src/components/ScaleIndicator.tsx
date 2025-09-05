import React, { useState, useEffect } from 'react';

const ScaleIndicator: React.FC = () => {
  const [scale, setScale] = useState(1);
  const [screenSize, setScreenSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    const updateScale = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      setScreenSize({ width, height });
      
      if (width >= 3840) {
        setScale(1.6);
      } else if (width >= 2560) {
        setScale(1.4);
      } else if (width >= 1920) {
        setScale(1.2);
      } else {
        setScale(1);
      }
    };

    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  // Only show in development mode
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div style={{
      position: 'fixed',
      top: 10,
      right: 10,
      background: 'rgba(0, 0, 0, 0.8)',
      color: '#00eaff',
      padding: '8px 12px',
      borderRadius: '6px',
      fontSize: '12px',
      fontFamily: 'monospace',
      zIndex: 9999,
      border: '1px solid #00eaff',
    }}>
      <div>Screen: {screenSize.width}x{screenSize.height}</div>
      <div>Scale: {scale}x</div>
      <div>Effective: {Math.round(screenSize.width * scale)}x{Math.round(screenSize.height * scale)}</div>
    </div>
  );
};

export default ScaleIndicator;
