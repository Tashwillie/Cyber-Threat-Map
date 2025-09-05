import React, { useState, useEffect } from 'react';
import { AttackTypeConfig } from '../types/attack.js';

// Mock data generators
const generateRandomCountries = () => {
  const countries = [
    { name: 'Ethiopia', flag: '🇪🇹' },
    { name: 'Nepal', flag: '🇳🇵' },
    { name: 'Nigeria', flag: '🇳🇬' },
    { name: 'Vietnam', flag: '🇻🇳' },
    { name: 'Mongolia', flag: '🇲🇳' },
    { name: 'Brazil', flag: '🇧🇷' },
    { name: 'India', flag: '🇮🇳' },
    { name: 'China', flag: '🇨🇳' },
    { name: 'Russia', flag: '🇷🇺' },
    { name: 'Ukraine', flag: '🇺🇦' },
    { name: 'Iran', flag: '🇮🇷' },
    { name: 'North Korea', flag: '🇰🇵' },
  ];
  
  return countries
    .sort(() => Math.random() - 0.5)
    .slice(0, 5)
    .map(country => ({
      ...country,
      count: Math.floor(Math.random() * 200) + 50
    }))
    .sort((a, b) => b.count - a.count);
};

const generateRandomIndustries = () => {
  const industries = [
    { name: 'Education', icon: '🎓' },
    { name: 'Telecommunications', icon: '📡' },
    { name: 'Government', icon: '🏛️' },
    { name: 'Healthcare', icon: '🏥' },
    { name: 'Finance', icon: '🏦' },
    { name: 'Energy', icon: '⚡' },
    { name: 'Manufacturing', icon: '🏭' },
    { name: 'Retail', icon: '🛒' },
  ];
  
  return industries
    .sort(() => Math.random() - 0.5)
    .slice(0, 3);
};

const generateRandomMalwareTypes = () => {
  const malwareTypes = [
    { name: 'Mobile', icon: '📱' },
    { name: 'Phishing', icon: '🎣' },
    { name: 'Adware', icon: '🦠' },
    { name: 'Ransomware', icon: '🔒' },
    { name: 'Trojan', icon: '🐴' },
    { name: 'Botnet', icon: '🤖' },
    { name: 'Spyware', icon: '👁️' },
    { name: 'Worm', icon: '🐛' },
  ];
  
  return malwareTypes
    .sort(() => Math.random() - 0.5)
    .slice(0, 3);
};

const generateRandomVulnerabilities = () => {
  const vulnerabilities = [
    { name: 'CVE-2020-0796', description: 'SMBv3 Remote Code Execution', severity: 'Critical', icon: '🔴' },
    { name: 'CVE-2021-44228', description: 'Log4j Remote Code Execution', severity: 'Critical', icon: '🔴' },
    { name: 'CVE-2022-30190', description: 'Microsoft Support Diagnostic Tool', severity: 'High', icon: '🟠' },
    { name: 'CVE-2023-23397', description: 'Microsoft Outlook Elevation of Privilege', severity: 'High', icon: '🟠' },
    { name: 'CVE-2023-21716', description: 'Microsoft Word Remote Code Execution', severity: 'Critical', icon: '🔴' },
    { name: 'CVE-2022-41040', description: 'Microsoft Exchange Server RCE', severity: 'Critical', icon: '🔴' },
    { name: 'CVE-2023-23397', description: 'Microsoft Outlook Elevation of Privilege', severity: 'High', icon: '🟠' },
    { name: 'CVE-2022-30190', description: 'Microsoft Support Diagnostic Tool', severity: 'High', icon: '🟠' },
  ];
  
  return vulnerabilities
    .sort(() => Math.random() - 0.5)
    .slice(0, 4);
};

const RightSidebarWidgets: React.FC = () => {
  const [topCountries, setTopCountries] = useState(generateRandomCountries);
  const [industries, setIndustries] = useState(generateRandomIndustries);
  const [malwareTypes, setMalwareTypes] = useState(generateRandomMalwareTypes);
  const [vulnerabilities, setVulnerabilities] = useState(generateRandomVulnerabilities);

  useEffect(() => {
    const interval = setInterval(() => {
      setTopCountries(generateRandomCountries());
      setIndustries(generateRandomIndustries());
      setMalwareTypes(generateRandomMalwareTypes());
      setVulnerabilities(generateRandomVulnerabilities());
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ width: '100%', color: '#fff', fontSize: 15 }}>
      {/* Top Vulnerabilities */}
      <div style={{ marginBottom: 32 }}>
        <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 10 }}>TOP VULNERABILITIES</div>
        <div style={{ fontSize: 13, color: '#aaa', marginBottom: 8 }}>Most exploited vulnerabilities in the last 24 hours.</div>
        {vulnerabilities.map((vuln) => (
          <div key={vuln.name} style={{ 
            display: 'flex', 
            alignItems: 'flex-start', 
            marginBottom: 12, 
            gap: 10,
            padding: '8px',
            borderRadius: '6px',
            backgroundColor: 'rgba(255, 255, 255, 0.05)',
            borderLeft: `3px solid ${vuln.severity === 'Critical' ? '#ff4444' : '#ff8800'}`
          }}>
            <span style={{ fontSize: 16, marginTop: '2px' }}>{vuln.icon}</span>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 600, fontSize: 13, marginBottom: 2 }}>{vuln.name}</div>
              <div style={{ fontSize: 11, color: '#ccc', marginBottom: 2 }}>{vuln.description}</div>
              <div style={{ 
                fontSize: 10, 
                color: vuln.severity === 'Critical' ? '#ff4444' : '#ff8800',
                fontWeight: 700,
                textTransform: 'uppercase'
              }}>
                {vuln.severity}
              </div>
            </div>
          </div>
        ))}
      </div>
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