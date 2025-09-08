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
import './styles/responsive.css';

const App: React.FC = () => {
  // Use mock socket for both production and development (for consistent 2.5M+ counter)
  const isDevelopment = process.env.NODE_ENV === 'development';
  const isVercel = process.env.VERCEL === '1';
  // Always use MockSocket to ensure 2.5M+ starting value
  const socketData = useMockSocket();
  const { isConnected, attacks, totalAttacks } = socketData;
  
  // Debug logging
  console.log('NODE_ENV:', process.env.NODE_ENV);
  console.log('isDevelopment:', isDevelopment);
  console.log('isVercel:', isVercel);
  console.log('Using socket:', (isDevelopment && !isVercel) ? 'Real Socket' : 'Mock Socket');
  console.log('totalAttacks:', totalAttacks);
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
      position: 'fixed',
      top: 0,
      left: 0,
      boxSizing: 'border-box',
      margin: 0,
      padding: 0,
      zIndex: 1,
    }}>
      {/* Top Bar */}
      <div className="top-bar" style={{
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
      <div className="main-content" style={{ 
        flex: 1, 
        display: 'flex', 
        minHeight: 0,
        height: 'calc(100vh - 64px)',
        width: '100%',
        overflow: 'hidden',
        position: 'relative',
        zIndex: 2,
      }}>
        {/* Left Sidebar */}
        <div className="sidebar-left" style={{
          width: 200,
          minWidth: 200,
          background: 'rgba(16, 19, 31, 0.98)',
          borderRight: '1.5px solid #00eaff44',
          padding: '20px 16px 16px 16px',
          display: 'flex',
          flexDirection: 'column',
          gap: 20,
          zIndex: 20,
          boxSizing: 'border-box',
          overflow: 'visible',
          position: 'relative',
          height: '100%',
        }}>
          {/* Recent Daily Attacks Section */}
          <div style={{ 
            background: '#181c2b', 
            borderRadius: 8, 
            padding: 16, 
            color: '#fff', 
            opacity: 0.95, 
            boxShadow: '0 0 16px #00eaff22',
            marginBottom: 16,
            minHeight: 180,
          }}>
            <RecentAttacksGraph totalAttacks={totalAttacks} />
          </div>
          {/* Recent Attacks List */}
          <div className="sidebar-content" style={{ 
            flex: 1, 
            background: '#181c2b', 
            borderRadius: 8, 
            padding: 16, 
            color: '#fff', 
            opacity: 0.95, 
            overflowY: 'auto', 
            boxShadow: '0 0 16px #00eaff22',
            minHeight: 300,
          }}>
            <AttackList attacks={attacks} />
          </div>
        </div>
        {/* Main Map Area */}
        <div className="map-container" style={{ 
          flex: 1, 
          display: 'flex', 
          flexDirection: 'column', 
          position: 'relative', 
          background: '#10131f', 
          alignItems: 'center', 
          minWidth: 0,
          overflow: 'hidden',
          boxSizing: 'border-box',
          height: '100%',
          width: '100%',
          paddingBottom: '80px', // Add padding for Legend
        }}>
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
          <div style={{ 
            flex: 1, 
            minHeight: 0, 
            position: 'relative', 
            width: '100%', 
            height: '100%',
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            overflow: 'hidden' 
          }}>
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
        <div className="sidebar-right" style={{
          width: 220,
          minWidth: 220,
          background: 'rgba(16, 19, 31, 0.98)',
          borderLeft: '1.5px solid #00eaff44',
          padding: '20px 16px 16px 16px',
          display: 'flex',
          flexDirection: 'column',
          gap: 16,
          zIndex: 20,
          boxSizing: 'border-box',
          overflow: 'visible',
          position: 'relative',
          height: '100%',
        }}>
          {/* Top Vulnerabilities Section */}
          <div style={{ 
            background: '#181c2b', 
            borderRadius: 8, 
            padding: 16, 
            color: '#fff', 
            opacity: 0.95, 
            boxShadow: '0 0 16px #00eaff22',
            marginBottom: 16,
            minHeight: 400,
            overflowY: 'auto',
          }}>
            <h3 style={{ color: '#00eaff', fontSize: 16, fontWeight: 'bold', marginBottom: 12, textTransform: 'uppercase' }}>
              TOP VULNERABILITIES
            </h3>
            <p style={{ color: '#aaa', fontSize: 12, marginBottom: 16, lineHeight: 1.4 }}>
              Most exploited vulnerabilities in the last 24 hours.
            </p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              <div style={{ 
                background: '#0f1115', 
                padding: 12, 
                borderRadius: 6, 
                borderLeft: '3px solid #ff6b6b',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#ff6b6b' }}></div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, fontWeight: 'bold', color: '#fff' }}>CVE-2023-23397</div>
                  <div style={{ fontSize: 11, color: '#ccc', marginTop: 2 }}>Microsoft Outlook Elevation of Privilege</div>
                  <div style={{ fontSize: 10, color: '#ff6b6b', marginTop: 4, fontWeight: 'bold' }}>HIGH</div>
                </div>
              </div>
              
              <div style={{ 
                background: '#0f1115', 
                padding: 12, 
                borderRadius: 6, 
                borderLeft: '3px solid #ff6b6b',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#ff6b6b' }}></div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, fontWeight: 'bold', color: '#fff' }}>CVE-2022-30190</div>
                  <div style={{ fontSize: 11, color: '#ccc', marginTop: 2 }}>Microsoft Support Diagnostic Tool</div>
                  <div style={{ fontSize: 10, color: '#ff6b6b', marginTop: 4, fontWeight: 'bold' }}>HIGH</div>
                </div>
              </div>
              
              <div style={{ 
                background: '#0f1115', 
                padding: 12, 
                borderRadius: 6, 
                borderLeft: '3px solid #ff6b6b',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#ff6b6b' }}></div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, fontWeight: 'bold', color: '#fff' }}>CVE-2021-44228</div>
                  <div style={{ fontSize: 11, color: '#ccc', marginTop: 2 }}>Log4j Remote Code Execution</div>
                  <div style={{ fontSize: 10, color: '#ff6b6b', marginTop: 4, fontWeight: 'bold' }}>CRITICAL</div>
                </div>
              </div>
              
              <div style={{ 
                background: '#0f1115', 
                padding: 12, 
                borderRadius: 6, 
                borderLeft: '3px solid #ff6b6b',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#ff6b6b' }}></div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, fontWeight: 'bold', color: '#fff' }}>CVE-2022-41040</div>
                  <div style={{ fontSize: 11, color: '#ccc', marginTop: 2 }}>Microsoft Exchange Server</div>
                  <div style={{ fontSize: 10, color: '#ff6b6b', marginTop: 4, fontWeight: 'bold' }}>HIGH</div>
                </div>
              </div>
              
              <div style={{ 
                background: '#0f1115', 
                padding: 12, 
                borderRadius: 6, 
                borderLeft: '3px solid #ff6b6b',
                display: 'flex',
                alignItems: 'center',
                gap: 8,
              }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#ff6b6b' }}></div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, fontWeight: 'bold', color: '#fff' }}>CVE-2020-0796</div>
                  <div style={{ fontSize: 11, color: '#ccc', marginTop: 2 }}>SMBv3 Remote Code Execution</div>
                  <div style={{ fontSize: 10, color: '#ff6b6b', marginTop: 4, fontWeight: 'bold' }}>CRITICAL</div>
                </div>
              </div>
            </div>
          </div>
          {/* Additional Stats Section */}
          <div className="sidebar-content" style={{ 
            flex: 1, 
            background: '#181c2b', 
            borderRadius: 8, 
            padding: 16, 
            color: '#fff', 
            opacity: 0.95, 
            overflowY: 'auto', 
            boxShadow: '0 0 16px #00eaff22',
            minHeight: 300,
          }}>
            <div style={{ marginBottom: 16 }}>
              <h3 style={{ color: '#00eaff', fontSize: 16, fontWeight: 'bold', marginBottom: 12 }}>
                TOP TARGETED COUNTRIES
              </h3>
              <div style={{ fontSize: 14, lineHeight: 1.6 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span>🇲🇳 Mongolia</span>
                  <span style={{ color: '#ff6b6b' }}>234</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span>🇮🇳 India</span>
                  <span style={{ color: '#ff6b6b' }}>205</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span>🇨🇳 China</span>
                  <span style={{ color: '#ff6b6b' }}>179</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span>🇳🇬 Nigeria</span>
                  <span style={{ color: '#ff6b6b' }}>176</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span>🇧🇷 Brazil</span>
                  <span style={{ color: '#ff6b6b' }}>141</span>
                </div>
              </div>
            </div>
            
            <div>
              <h3 style={{ color: '#00eaff', fontSize: 16, fontWeight: 'bold', marginBottom: 12 }}>
                TOP TARGETED INDUSTRIES
              </h3>
              <div style={{ fontSize: 14, lineHeight: 1.6 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span>🏥 Healthcare</span>
                  <span style={{ color: '#ff6b6b' }}>45%</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span>🏦 Finance</span>
                  <span style={{ color: '#ff6b6b' }}>38%</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span>🎓 Education</span>
                  <span style={{ color: '#ff6b6b' }}>32%</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span>🏭 Manufacturing</span>
                  <span style={{ color: '#ff6b6b' }}>28%</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                  <span>🏛️ Government</span>
                  <span style={{ color: '#ff6b6b' }}>25%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App; 