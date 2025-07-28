import React from 'react';
import { AttackTypeConfig } from '../types/attack.js';

const Legend: React.FC = () => (
  <div
    style={{
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 32,
      background: 'rgba(16, 19, 31, 0.98)',
      padding: '18px 0 10px 0',
      borderTop: '2px solid #23203b',
      marginTop: 0,
      position: 'relative',
      zIndex: 20,
    }}
  >
    <div style={{ fontWeight: 700, fontSize: 20, color: '#fff', marginRight: 32, letterSpacing: 1 }}>
      LEGEND
    </div>
    {Object.entries(AttackTypeConfig).map(([type, config]) => (
      <div key={type} style={{ display: 'flex', alignItems: 'center', gap: 8, minWidth: 90 }}>
        <span
          style={{
            width: 18,
            height: 18,
            borderRadius: '50%',
            background: config.color,
            display: 'inline-block',
            marginRight: 6,
            boxShadow: `0 0 4px ${config.color}`,
          }}
        />
        <span style={{ color: '#fff', fontWeight: 700, fontSize: 16, lineHeight: 1 }}>{config.name}</span>
      </div>
    ))}
  </div>
);

export default Legend; 