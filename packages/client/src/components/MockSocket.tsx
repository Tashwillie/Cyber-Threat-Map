import React, { useState, useEffect } from 'react';
import { AttackEvent } from '../types/attack.js';

// Mock socket for static hosting
export const useMockSocket = () => {
  const [isConnected, setIsConnected] = useState(true);
  const [attacks, setAttacks] = useState<AttackEvent[]>([]);
  const [totalAttacks, setTotalAttacks] = useState(0);

  useEffect(() => {
    // Simulate connection
    setIsConnected(true);

    // Generate mock attacks
    const generateMockAttack = (): AttackEvent => {
      const attackTypes = ['ddos', 'malware', 'phishing', 'ransomware', 'sql-injection'] as const;
      const severities = ['low', 'medium', 'high', 'critical'] as const;
      
      const countries = [
        { name: 'United States', lat: 39.8283, lng: -98.5795 },
        { name: 'China', lat: 35.8617, lng: 104.1954 },
        { name: 'Russia', lat: 61.5240, lng: 105.3188 },
        { name: 'Germany', lat: 51.1657, lng: 10.4515 },
        { name: 'United Kingdom', lat: 55.3781, lng: -3.4360 },
        { name: 'France', lat: 46.2276, lng: 2.2137 },
        { name: 'Japan', lat: 36.2048, lng: 138.2529 },
        { name: 'Brazil', lat: -14.2350, lng: -51.9253 },
        { name: 'India', lat: 20.5937, lng: 78.9629 },
        { name: 'Canada', lat: 56.1304, lng: -106.3468 },
        { name: 'Australia', lat: -25.2744, lng: 133.7751 },
        { name: 'South Korea', lat: 35.9078, lng: 127.7669 },
        { name: 'Italy', lat: 41.8719, lng: 12.5674 },
        { name: 'Spain', lat: 40.4637, lng: -3.7492 },
        { name: 'Mexico', lat: 23.6345, lng: -102.5528 },
        { name: 'Netherlands', lat: 52.1326, lng: 5.2913 },
        { name: 'Sweden', lat: 60.1282, lng: 18.6435 },
        { name: 'Norway', lat: 60.4720, lng: 8.4689 },
        { name: 'Switzerland', lat: 46.8182, lng: 8.2275 },
        { name: 'South Africa', lat: -30.5595, lng: 22.9375 }
      ];

      const source = countries[Math.floor(Math.random() * countries.length)];
      const target = countries[Math.floor(Math.random() * countries.length)];
      
      const attackType = attackTypes[Math.floor(Math.random() * attackTypes.length)];
      const severity = severities[Math.floor(Math.random() * severities.length)];
      
      return {
        id: Math.random().toString(36).substr(2, 9),
        type: attackType,
        severity: severity,
        source: {
          country: source.name,
          lat: source.lat + (Math.random() - 0.5) * 2,
          lng: source.lng + (Math.random() - 0.5) * 2
        },
        target: {
          country: target.name,
          lat: target.lat + (Math.random() - 0.5) * 2,
          lng: target.lng + (Math.random() - 0.5) * 2
        },
        timestamp: Date.now() - Math.random() * 10000,
        description: `${attackType.toUpperCase()} attack from ${source.name} to ${target.name}`
      };
    };

    // Generate initial attacks
    const initialAttacks: AttackEvent[] = [];
    for (let i = 0; i < 20; i++) {
      initialAttacks.push(generateMockAttack());
    }
    setAttacks(initialAttacks);
    setTotalAttacks(initialAttacks.length);

    // Generate new attacks every 2-5 seconds
    const interval = setInterval(() => {
      const newAttack = generateMockAttack();
      setAttacks(prev => {
        const updated = [...prev.slice(-19), newAttack];
        setTotalAttacks(prev => prev + 1);
        return updated;
      });
    }, Math.random() * 3000 + 2000);

    return () => clearInterval(interval);
  }, []);

  return { isConnected, attacks, totalAttacks };
};
