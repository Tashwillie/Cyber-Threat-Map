import React, { useEffect, useState } from 'react';

const mockData = [
  8, 10, 12, 9, 13, 11, 14, 12, 15, 13, 14, 12, 13, 15, 14, 13, 12, 14, 13, 12
];

const RecentAttacksGraph: React.FC = () => {
  const [animatedData, setAnimatedData] = useState<number[]>(Array(mockData.length).fill(0));

  useEffect(() => {
    let frame = 0;
    const animate = () => {
      setAnimatedData((prev) =>
        prev.map((_, i) =>
          i <= frame ? mockData[i] : prev[i]
        )
      );
      frame++;
      if (frame < mockData.length) {
        setTimeout(animate, 60);
      }
    };
    animate();
    // eslint-disable-next-line
  }, []);

  const max = Math.max(...mockData);
  const barWidth = 100 / mockData.length;

  return (
    <div style={{ width: '100%', height: 180, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', background: 'none' }}>
      <div style={{ fontWeight: 700, fontSize: 16, color: '#fff', marginBottom: 8, letterSpacing: 1 }}>
        RECENT DAILY ATTACKS
      </div>
      <svg width="100%" height="120" viewBox="0 0 100 100" style={{ background: 'none', width: '100%', height: 120 }}>
        {animatedData.map((val, i) => (
          <rect
            key={i}
            x={i * barWidth + 2}
            y={100 - (val / max) * 90}
            width={barWidth - 2}
            height={(val / max) * 90}
            rx={2}
            fill="url(#blue-gradient)"
            style={{ filter: 'drop-shadow(0 0 3px #00eaffcc)' }}
          />
        ))}
        <defs>
          <linearGradient id="blue-gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#00eaff" />
            <stop offset="100%" stopColor="#a259e6" />
          </linearGradient>
        </defs>
      </svg>
      <div style={{ color: '#fff', fontSize: 12, marginTop: 8, opacity: 0.7, display: 'flex', justifyContent: 'space-between' }}>
        <span>Jun 8th</span>
        <span>Jun 22nd</span>
      </div>
    </div>
  );
};

export default RecentAttacksGraph; 