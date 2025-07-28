import React, { useEffect, useRef } from 'react';
import { geoMercator } from 'd3-geo';
import { AttackEvent, AttackTypeConfig } from '../types/attack.js';

interface AttackArcs2DProps {
  attacks: AttackEvent[];
  width: number;
  height: number;
}

const AttackArcs2D: React.FC<AttackArcs2DProps> = ({ attacks, width, height }) => {
  const projection = geoMercator()
    .scale(width / 6.3)
    .translate([width / 2, height / 2]);

  // Animate arcs by updating a key on each render
  const [tick, setTick] = React.useState(0);
  useEffect(() => {
    const interval = setInterval(() => setTick(t => t + 1), 30);
    return () => clearInterval(interval);
  }, []);

  // Helper to get [x, y] from lat/lng
  const project = (lat: number, lng: number) => projection([lng, lat]) as [number, number];

  // Animate arc drawing (head moves along the arc)
  const getArcPath = (source: [number, number], target: [number, number], progress: number) => {
    const mx = (source[0] + target[0]) / 2;
    const my = (source[1] + target[1]) / 2 - 80;
    const [x0, y0] = source;
    const [x1, y1] = target;
    const t = progress;
    const cx = (1 - t) * (1 - t) * x0 + 2 * (1 - t) * t * mx + t * t * x1;
    const cy = (1 - t) * (1 - t) * y0 + 2 * (1 - t) * t * my + t * t * y1;
    return `M${x0},${y0} Q${mx},${my} ${cx},${cy}`;
  };

  // Full arc path for glow/trail
  const getFullArcPath = (source: [number, number], target: [number, number]) => {
    const mx = (source[0] + target[0]) / 2;
    const my = (source[1] + target[1]) / 2 - 80;
    const [x0, y0] = source;
    const [x1, y1] = target;
    return `M${x0},${y0} Q${mx},${my} ${x1},${y1}`;
  };

  // Animate the arc head (0..1)
  const getProgress = (attack: AttackEvent, idx: number) => {
    const duration = 50;
    const offset = idx * 10;
    const localTick = (tick - offset) % (duration + 20);
    if (localTick < 0) return 0;
    if (localTick > duration) return 1;
    return localTick / duration;
  };

  // SVG defs for gradients and filters
  const defs = (
    <defs>
      {/* Neon glow filter */}
      <filter id="neon-glow" x="-20%" y="-20%" width="140%" height="140%">
        <feGaussianBlur stdDeviation="1.2" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
      {/* Arc gradient (will be set per arc) */}
      {attacks.slice(-10).map((attack, idx) => {
        const color = AttackTypeConfig[attack.type].color;
        return (
          <linearGradient id={`arc-gradient-${attack.id}`} key={attack.id} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor={color} stopOpacity="0.2" />
            <stop offset="60%" stopColor={color} stopOpacity="0.8" />
            <stop offset="100%" stopColor={color} stopOpacity="0.2" />
          </linearGradient>
        );
      })}
    </defs>
  );

  return (
    <svg width={width} height={height} style={{ position: 'absolute', top: 0, left: 0, pointerEvents: 'none', zIndex: 2 }}>
      {defs}
      {attacks.slice(-10).map((attack, idx) => {
        const source = project(attack.source.lat, attack.source.lng);
        const target = project(attack.target.lat, attack.target.lng);
        const progress = getProgress(attack, idx);
        const color = AttackTypeConfig[attack.type].color;
        // Arc
        return (
          <g key={attack.id}>
            {/* Arc trail (faint, full arc) */}
            <path
              d={getFullArcPath(source, target)}
              stroke={color}
              strokeWidth={2}
              fill="none"
              opacity={1}
              style={{ filter: 'url(#neon-glow)' }}
            />
            {/* Arc main (gradient, animated) */}
            <path
              d={getArcPath(source, target, progress)}
              stroke={`url(#arc-gradient-${attack.id})`}
              strokeWidth={1}
              fill="none"
              opacity={1}
              style={{ filter: 'url(#neon-glow)' }}
            />
            {/* Arc head glow */}
            {progress < 1 && (
              <circle
                cx={(1 - progress) * (1 - progress) * source[0] + 2 * (1 - progress) * progress * ((source[0] + target[0]) / 2) + progress * progress * target[0]}
                cy={(1 - progress) * (1 - progress) * source[1] + 2 * (1 - progress) * progress * ((source[1] + target[1]) / 2 - 80) + progress * progress * target[1]}
                r={13 - 8 * progress}
                fill={color}
                opacity={0.25}
                style={{ filter: 'url(#neon-glow)' }}
              />
            )}
            {progress < 1 && (
              <circle
                cx={(1 - progress) * (1 - progress) * source[0] + 2 * (1 - progress) * progress * ((source[0] + target[0]) / 2) + progress * progress * target[0]}
                cy={(1 - progress) * (1 - progress) * source[1] + 2 * (1 - progress) * progress * ((source[1] + target[1]) / 2 - 80) + progress * progress * target[1]}
                r={7 - 4 * progress}
                fill={color}
                opacity={0.7}
                style={{ filter: 'url(#neon-glow)' }}
              />
            )}
            {/* No pulsing or glow marker at source (origin) */}
            {/* Multi-layered pulsing target marker */}
            {[0, 1, 2].map(layer => (
              <circle
                key={layer}
                cx={target[0]}
                cy={target[1]}
                r={12 + 7 * layer + 5 * Math.abs(Math.sin((tick + idx * 10 + 30 + layer * 20) / (10 + layer * 2)))}
                fill={color}
                opacity={0.10 - layer * 0.025}
                style={{ filter: 'url(#neon-glow)', transition: 'r 0.2s' }}
              />
            ))}
            <circle
              cx={target[0]}
              cy={target[1]}
              r={7}
              fill={color}
              opacity={0.8}
              style={{ filter: 'url(#neon-glow)' }}
            />
          </g>
        );
      })}
    </svg>
  );
};

export default AttackArcs2D; 