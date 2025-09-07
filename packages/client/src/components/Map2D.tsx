import React, { useRef, useEffect, useState } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import AttackArcs2D from './AttackArcs2D';
import { AttackEvent } from '../types/attack.js';

// Use a public TopoJSON world map
const geoUrl = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';

interface Map2DProps {
  attacks: AttackEvent[];
  onCountryClick?: (country: string, coords: { x: number; y: number }) => void;
}

const DISPLAY_WINDOW_MS = 8000; // Show attacks for 8 seconds instead of 3
const Map2D: React.FC<Map2DProps> = ({ attacks, onCountryClick }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 400 });
  const [tooltip, setTooltip] = useState<{ name: string; x: number; y: number } | null>(null);

  useEffect(() => {
    const handleResize = () => {
      if (containerRef.current) {
        const { width, height } = containerRef.current.getBoundingClientRect();
        // Ensure minimum dimensions and responsive scaling
        const minWidth = 300;
        const minHeight = 200;
        const maxWidth = Math.min(width, 1200);
        const maxHeight = Math.min(height, 800);
        
        setDimensions({ 
          width: Math.max(minWidth, maxWidth), 
          height: Math.max(minHeight, maxHeight) 
        });
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Helper to get country name from geo properties
  const getCountryName = (geo: any) =>
    geo.properties.NAME || geo.properties.name || geo.properties.ADMIN || 'Unknown';

  // Mouse move handler for tooltip position
  const handleMouseMove = (e: React.MouseEvent) => {
    setTooltip((prev) => prev ? { ...prev, x: e.clientX, y: e.clientY } : null);
  };

  // Only show attacks from the last 3 seconds
  const now = Date.now();
  const recentAttacks = attacks.filter(a => now - a.timestamp < DISPLAY_WINDOW_MS);

  return (
    <div
      ref={containerRef}
      style={{ width: '100%', height: '100%', background: '#10131f', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
      onMouseMove={handleMouseMove}
    >
      <ComposableMap
        projection="geoMercator"
        center={[0, 0]}
        width={dimensions.width}
        height={dimensions.height}
        style={{ width: '100%', height: '100%', display: 'block', margin: '0 auto' }}
        viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
      >
        <Geographies geography={geoUrl}>
          {({ geographies }: { geographies: any[] }) =>
            geographies
              .filter((geo: any) => {
                const name = geo.properties.NAME || geo.properties.name || geo.properties.ADMIN || '';
                return name !== 'Antarctica';
              })
              .map((geo: any) => (
              <Geography
                key={geo.rsmKey}
                geography={geo}
                fill="#181c2b"
                stroke="#23203b"
                strokeWidth={0.5}
                style={{
                  default: { outline: 'none' },
                  hover: { fill: '#23203b', outline: 'none' },
                  pressed: { outline: 'none' },
                }}
                onMouseEnter={(e: React.MouseEvent<SVGPathElement>) => {
                  setTooltip({
                    name: getCountryName(geo),
                    x: e.clientX,
                    y: e.clientY,
                  });
                }}
                onMouseLeave={() => setTooltip(null)}
                onClick={(e: React.MouseEvent<SVGPathElement>) => {
                  if (onCountryClick) onCountryClick(getCountryName(geo), { x: e.clientX, y: e.clientY });
                }}
              />
            ))
          }
        </Geographies>
      </ComposableMap>
      {/* Animated attack arcs overlay */}
      <AttackArcs2D attacks={recentAttacks} width={dimensions.width} height={dimensions.height} />
      {/* Tooltip */}
      {tooltip && (
        <div
          style={{
            position: 'fixed',
            left: tooltip.x + 12,
            top: tooltip.y + 8,
            background: 'rgba(16, 19, 31, 0.98)',
            color: '#00eaff',
            fontWeight: 700,
            fontSize: 15,
            padding: '6px 14px',
            borderRadius: 8,
            pointerEvents: 'none',
            boxShadow: '0 2px 8px #00eaff44',
            zIndex: 9999,
            whiteSpace: 'nowrap',
            border: '1.5px solid #00eaff',
            textShadow: '0 0 2px #00eaff',
          }}
        >
          {tooltip.name}
        </div>
      )}
    </div>
  );
};

export default Map2D; 