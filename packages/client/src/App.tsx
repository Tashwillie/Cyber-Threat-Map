import React, { useState } from 'react';
import Map2D from './components/Map2D';
import HUD from './components/HUD';
import { useSocket } from './hooks/useSocket';
import { useMockSocket } from './components/MockSocket';
import AttackList from './components/AttackList';
import RecentAttacksGraph from './components/RecentAttacksGraph';
import RightSidebarWidgets from './components/RightSidebarWidgets';
import TotalAttacksCounter from './components/TotalAttacksCounter';
import Legend from './components/Legend';
import CountryStatsCard from './components/CountryStatsSidebar';
import ScaleIndicator from './components/ScaleIndicator';

const App: React.FC = () => {
  // Use mock socket for static hosting, real socket for development
  const isDevelopment = process.env.NODE_ENV === 'development';
  const socketData = isDevelopment ? useSocket() : useMockSocket();
  const { isConnected, attacks, totalAttacks } = socketData;
  const [selectedCountry, setSelectedCountry] = useState<{ name: string; coords: { x: number; y: number } } | null>(null);

  return (
    <div style={{
      height: '100vh',
      width: '100vw',
      background: 'linear-gradient(180deg, #10131f 0%, #181c2b 100%)',
      fontFamily: 'Inter, Arial, sans-serif',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* Top Bar */}
      <div style={{
        width: '100%',
        height: 64,
        background: 'linear-gradient(90deg, #10131f 0%, #181c2b 100%)',
        borderBottom: '3px solid #00eaff',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        padding: '0 32px',
        zIndex: 100,
      }}>
        <img src="/logo.svg" alt="Logo" style={{ height: 36, marginRight: 16 }} />
      </div>
      {/* Main Content */}
      <div style={{ flex: 1, display: 'flex', minHeight: 0 }}>
        {/* Left Sidebar */}
        <div style={{
          width: 250,
          background: 'rgba(16, 19, 31, 0.98)',
          borderRight: '1.5px solid #00eaff44',
          padding: '32px 16px 16px 16px',
          display: 'flex',
          flexDirection: 'column',
          gap: 32,
          zIndex: 10,
        }}>
          {/* TODO: Add Recent Attacks Graph */}
          <div style={{ height: 180, background: '#181c2b', borderRadius: 12, marginBottom: 24, padding: 16, display: 'flex', alignItems: 'flex-end', justifyContent: 'center', color: '#fff', opacity: 0.95, boxShadow: '0 0 16px #00eaff22' }}>
            <RecentAttacksGraph totalAttacks={totalAttacks} />
          </div>
          {/* TODO: Add Attack List */}
          <div className="sidebar-content" style={{ flex: 1, background: '#181c2b', borderRadius: 12, padding: 16, color: '#fff', opacity: 0.95, overflowY: 'auto', boxShadow: '0 0 16px #00eaff22' }}>
            <AttackList attacks={attacks} />
          </div>
        </div>
        {/* Main Map Area */}
        <div className="map-container" style={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative', background: '#10131f', minWidth: 0, alignItems: 'center', minHeight: 0 }}>
          <div style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 32, marginBottom: 64 }}>
            <h1 style={{
              color: '#fff',
              fontWeight: 900,
              fontSize: 36,
              letterSpacing: 2,
              textTransform: 'uppercase',
              margin: 0,
              marginBottom: 12,
              textAlign: 'center',
              fontFamily: 'Inter, Arial, sans-serif',
            }}>
              LIVE CYBER THREAT MAP
            </h1>
            <TotalAttacksCounter value={totalAttacks} />
          </div>
          <div style={{ flex: 1, minHeight: 0, position: 'relative', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
            <Map2D
              attacks={attacks}
              onCountryClick={(country, coords) => setSelectedCountry({ name: country, coords })}
            />
            {selectedCountry && (
              <CountryStatsCard
                country={selectedCountry.name}
                coords={selectedCountry.coords}
                onClose={() => setSelectedCountry(null)}
              />
            )}
          </div>
          <Legend />
        </div>
        {/* Scale Indicator (Development Only) */}
        <ScaleIndicator />
        {/* Always show right sidebar */}
        <div style={{
          width: 250,
          background: 'rgba(16, 19, 31, 0.98)',
          borderLeft: '1.5px solid #00eaff44',
          padding: '32px 16px 16px 16px',
          display: 'flex',
          flexDirection: 'column',
          gap: 32,
          zIndex: 10,
        }}>
          {/* TODO: Add Leaderboards, Legends, Stats */}
          <div className="sidebar-content" style={{ flex: 1, background: '#181c2b', borderRadius: 12, padding: 16, color: '#fff', opacity: 0.95, overflowY: 'auto', boxShadow: '0 0 16px #00eaff22' }}>
            <RightSidebarWidgets />
          </div>
        </div>
      </div>
    </div>
  );
};

export default App; 