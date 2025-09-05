import React from 'react';
import { AttackEvent, AttackTypeConfig } from '../types/attack.js';

interface HUDProps {
  totalAttacks: number;
  isConnected: boolean;
  attacks: AttackEvent[];
}

const HUD: React.FC<HUDProps> = ({ totalAttacks, isConnected, attacks }) => {
  const recentAttacks = attacks.slice(-10).reverse();
  const attackRate = attacks.length > 0 ? Math.round(attacks.length / 60) : 0; // attacks per minute

  return (
    <div style={{
      position: 'absolute',
      top: 20,
      left: 20,
      zIndex: 10,
      color: '#fff',
      fontFamily: 'Arial, sans-serif',
      fontSize: '14px',
      pointerEvents: 'none',
    }}>
      {/* Connection Status */}
      <div style={{
        marginBottom: '20px',
        padding: '12px',
        backgroundColor: isConnected ? 'rgba(0, 255, 0, 0.15)' : 'rgba(255, 0, 0, 0.15)',
        borderRadius: '8px',
        border: `2px solid ${isConnected ? '#00ff00' : '#ff0000'}`,
        backdropFilter: 'blur(10px)',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.3)',
      }}>
        <div style={{ fontWeight: 'bold', marginBottom: '5px', fontSize: '16px' }}>
          Server Status
        </div>
        <div style={{ 
          color: isConnected ? '#00ff00' : '#ff0000',
          display: 'flex',
          alignItems: 'center',
          gap: '8px'
        }}>
          <div style={{
            width: '8px',
            height: '8px',
            borderRadius: '50%',
            backgroundColor: isConnected ? '#00ff00' : '#ff0000',
            animation: isConnected ? 'pulse 2s infinite' : 'none'
          }} />
          {isConnected ? 'Connected' : 'Disconnected'}
        </div>
      </div>

      {/* Total Attacks Counter */}
      <div style={{
        marginBottom: '20px',
        padding: '20px',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        borderRadius: '12px',
        border: '2px solid #333',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
        minWidth: '200px',
      }}>
        <div style={{ fontWeight: 'bold', marginBottom: '8px', fontSize: '16px' }}>
          Total Attacks
        </div>
        <div style={{ 
          fontSize: '32px', 
          fontWeight: 'bold', 
          color: '#ff4444',
          textShadow: '0 0 10px rgba(255, 68, 68, 0.5)',
          marginBottom: '8px'
        }}>
          {totalAttacks.toLocaleString()}
        </div>
        <div style={{ fontSize: '12px', color: '#aaa' }}>
          {attackRate} attacks/min
        </div>
      </div>

      {/* Attack Type Legend */}
      <div style={{
        marginBottom: '20px',
        padding: '20px',
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        borderRadius: '12px',
        border: '2px solid #333',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
        minWidth: '250px',
      }}>
        <div style={{ fontWeight: 'bold', marginBottom: '15px', fontSize: '16px' }}>
          Attack Types
        </div>
        {Object.entries(AttackTypeConfig).map(([type, config]) => (
          <div key={type} style={{
            display: 'flex',
            alignItems: 'center',
            marginBottom: '10px',
            padding: '8px',
            borderRadius: '6px',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
          }}>
            <div style={{
              width: '12px',
              height: '12px',
              backgroundColor: config.color,
              borderRadius: '50%',
              marginRight: '12px',
              boxShadow: `0 0 8px ${config.color}`,
            }} />
            <div>
              <div style={{ fontWeight: 'bold' }}>{config.name}</div>
              <div style={{ fontSize: '11px', color: '#aaa' }}>{config.description}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Attacks */}
      {recentAttacks.length > 0 && (
        <div style={{
          padding: '20px',
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
          borderRadius: '12px',
          border: '2px solid #333',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.5)',
          minWidth: '300px',
        }}>
          <div style={{ fontWeight: 'bold', marginBottom: '15px', fontSize: '16px' }}>
            Recent Attacks
          </div>
          {recentAttacks.map((attack, index) => (
            <div key={attack.id} style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '8px',
              padding: '8px',
              borderRadius: '6px',
              backgroundColor: 'rgba(255, 255, 255, 0.05)',
              borderLeft: `3px solid ${AttackTypeConfig[attack.type].color}`,
            }}>
              <div style={{
                width: '8px',
                height: '8px',
                backgroundColor: AttackTypeConfig[attack.type].color,
                borderRadius: '50%',
                marginRight: '10px',
                boxShadow: `0 0 6px ${AttackTypeConfig[attack.type].color}`,
              }} />
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '12px', fontWeight: 'bold' }}>
                  {attack.type.toUpperCase()} - {attack.severity}
                </div>
                <div style={{ fontSize: '10px', color: '#aaa' }}>
                  {attack.source.country} → {attack.target.country}
                </div>
              </div>
              <div style={{ fontSize: '10px', color: '#666' }}>
                {new Date(attack.timestamp).toLocaleTimeString()}
              </div>
            </div>
          ))}
        </div>
      )}

      <style>{`
        @keyframes pulse {
          0% { opacity: 1; }
          50% { opacity: 0.5; }
          100% { opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default HUD; 