import React from 'react';
import { AttackEvent, AttackTypeConfig } from '../types/attack.js';

interface AttackListProps {
  attacks: AttackEvent[];
}

const AttackList: React.FC<AttackListProps> = ({ attacks }) => {
  return (
    <div style={{ width: '100%' }}>
      <div style={{ fontWeight: 700, fontSize: 18, color: '#fff', marginBottom: 12 }}>
        Recent Attacks
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
        {attacks.slice(-8).reverse().map((attack) => {
          const color = AttackTypeConfig[attack.type].color;
          return (
            <div
              key={attack.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                background: 'rgba(0, 34, 51, 0.13)',
                borderRadius: 8,
                padding: '8px 10px',
                borderLeft: `4px solid ${color}`,
                boxShadow: `0 0 2px ${color}99`,
                gap: 12,
              }}
            >
              {/* Type icon */}
              <div style={{
                width: 18,
                height: 18,
                borderRadius: '50%',
                background: color,
                boxShadow: `0 0 4px ${color}cc`,
                marginRight: 6,
              }} />
              {/* Attack info */}
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, color: '#fff', fontSize: 14 }}>
                  {attack.type.toUpperCase()} <span style={{ color: '#aaa', fontWeight: 400, fontSize: 12 }}>({attack.severity})</span>
                </div>
                <div style={{ fontSize: 12, color: '#e6007a', fontWeight: 500 }}>
                  {attack.source.country} <span style={{ color: '#fff' }}>→</span> {attack.target.country}
                </div>
              </div>
              {/* Time */}
              <div style={{ fontSize: 11, color: '#aaa', minWidth: 60, textAlign: 'right' }}>
                {new Date(attack.timestamp).toLocaleTimeString()}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AttackList; 