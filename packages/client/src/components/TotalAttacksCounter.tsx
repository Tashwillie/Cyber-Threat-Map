import React, { useEffect, useRef, useState } from 'react';

interface TotalAttacksCounterProps {
  value: number;
}

const formatNumber = (n: number) => n.toLocaleString();

const TotalAttacksCounter: React.FC<TotalAttacksCounterProps> = ({ value }) => {
  const [displayValue, setDisplayValue] = useState(value);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (displayValue === value) return;
    let start = displayValue;
    let end = value;
    let startTime: number | null = null;
    const duration = 800;
    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      setDisplayValue(Math.floor(start + (end - start) * progress));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        setDisplayValue(end);
      }
    };
    rafRef.current = requestAnimationFrame(animate);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
    // eslint-disable-next-line
  }, [value]);

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'center',
        gap: 16,
        width: '100%',
      }}
    >
      <span
        style={{
          fontSize: 56,
          fontWeight: 900,
          color: '#00eaff',
          letterSpacing: 2,
          fontFamily: 'Montserrat, sans-serif',
          lineHeight: 1,
        }}
      >
        {value.toLocaleString()}
      </span>
      <span
        style={{
          fontSize: 24,
          fontWeight: 700,
          color: '#fff',
          letterSpacing: 2,
          fontFamily: 'Montserrat, sans-serif',
          textTransform: 'uppercase',
          lineHeight: 1.1,
        }}
      >
        Attacks Today
      </span>
    </div>
  );
};

export default TotalAttacksCounter; 