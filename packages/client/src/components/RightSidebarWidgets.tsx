import React from 'react';
import { AttackTypeConfig } from '../types/attack.js';

const topCountries = [
  { name: 'Ethiopia', flag: '🇪🇹', count: 120 },
  { name: 'Nepal', flag: '🇳🇵', count: 110 },
  { name: 'Nigeria', flag: '🇳🇬', count: 105 },
  { name: 'Vietnam', flag: '🇻🇳', count: 98 },
  { name: 'Mongolia', flag: '🇲🇳', count: 90 },
];

const industries = [
  { name: 'Education', icon: '🎓' },
  { name: 'Telecommunications', icon: '📡' },
  { name: 'Government', icon: '🏛️' },
];

const malwareTypes = [
  { name: 'Mobile', icon: '📱' },
  { name: 'Phishing', icon: '🎣' },
  { name: 'Adware', icon: '🦠' },
];

const RightSidebarWidgets: React.FC = () => {
  return (
    <div style={{ width: '100%', color: '#fff', fontSize: 15 }}>
      {/* Top Targeted Countries */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 10 }}>TOP TARGETED COUNTRIES</div>
        <div style={{ fontSize: 13, color: '#aaa', marginBottom: 8 }}>Highest rate of attacks per organization in the last day.</div>
        {topCountries.map((c, i) => (
          <div key={c.name} style={{ display: 'flex', alignItems: 'center', marginBottom: 7, gap: 10 }}>
            <span style={{ fontSize: 20 }}>{c.flag}</span>
            <span style={{ fontWeight: 600 }}>{c.name}</span>
            <span style={{ marginLeft: 'auto', color: '#00eaff', fontWeight: 700, textShadow: '0 0 2px #00eaff' }}>{c.count.toLocaleString()}</span>
          </div>
        ))}
      </div>
      {/* Top Targeted Industries */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 10 }}>TOP TARGETED INDUSTRIES</div>
        <div style={{ fontSize: 13, color: '#aaa', marginBottom: 8 }}>Highest rate of attacks per organization in the last day.</div>
        {industries.map((ind) => (
          <div key={ind.name} style={{ display: 'flex', alignItems: 'center', marginBottom: 7, gap: 10 }}>
            <span style={{ fontSize: 20 }}>{ind.icon}</span>
            <span style={{ fontWeight: 600 }}>{ind.name}</span>
          </div>
        ))}
      </div>
      {/* Top Malware Types */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 10 }}>TOP MALWARE TYPES</div>
        <div style={{ fontSize: 13, color: '#aaa', marginBottom: 8 }}>Malware types with the highest global impact in the last day.</div>
        {malwareTypes.map((m) => (
          <div key={m.name} style={{ display: 'flex', alignItems: 'center', marginBottom: 7, gap: 10 }}>
            <span style={{ fontSize: 20 }}>{m.icon}</span>
            <span style={{ fontWeight: 600 }}>{m.name}</span>
          </div>
        ))}
      </div>
      {/* Legend moved below the map */}
    </div>
  );
};

export default RightSidebarWidgets; 