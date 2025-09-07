import React, { useState, useEffect } from 'react';
import { AttackEvent } from '../types/attack.js';

// Mock socket for static hosting
export const useMockSocket = () => {
  const [isConnected, setIsConnected] = useState(true);
  const [attacks, setAttacks] = useState<AttackEvent[]>([]);
  
  // Get initial value from localStorage or use 2.5M base
  const getInitialTotalAttacks = () => {
    const stored = localStorage.getItem('cyber-threat-total-attacks');
    if (stored) {
      const parsed = parseInt(stored, 10);
      if (!isNaN(parsed) && parsed > 2500000) {
        return parsed;
      }
    }
    return 2500000 + Math.floor(Math.random() * 500000); // 2.5M to 3M range
  };
  
  const [totalAttacks, setTotalAttacks] = useState(getInitialTotalAttacks);
  
  // Debug logging
  console.log('MockSocket initialized with totalAttacks:', totalAttacks);

  // Save to localStorage whenever totalAttacks changes
  useEffect(() => {
    localStorage.setItem('cyber-threat-total-attacks', totalAttacks.toString());
  }, [totalAttacks]);

  // Generate mock attacks function (moved outside useEffect for reuse)
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

  useEffect(() => {
    // Simulate connection
    setIsConnected(true);

    // Generate initial attacks (simulate 2.5M with visual effect)
    const initialAttacks: AttackEvent[] = [];
    for (let i = 0; i < 200; i++) { // 200 attacks for visual impact
      initialAttacks.push(generateMockAttack());
    }
    setAttacks(initialAttacks);
    
    // Rapidly add more attacks to simulate 2.5M effect
    let rapidCount = 0;
    const rapidInterval = setInterval(() => {
      if (rapidCount < 1000) { // Add 1000 more attacks rapidly
        const newAttack = generateMockAttack();
        setAttacks(prev => [...prev.slice(-199), newAttack]);
        rapidCount++;
      } else {
        clearInterval(rapidInterval);
      }
    }, 10); // Every 10ms for rapid effect
    // Don't reset totalAttacks - keep the 2.5M+ starting value

    // Generate new attacks every 0.5-2 seconds (much faster!)
    const interval = setInterval(() => {
      const newAttack = generateMockAttack();
      setAttacks(prev => {
        const updated = [...prev.slice(-19), newAttack];
        setTotalAttacks(prev => prev + 1);
        return updated;
      });
    }, Math.random() * 1500 + 500); // 0.5-2 seconds instead of 2-5 seconds

    return () => clearInterval(interval);
  }, []);

  // Burst attack patterns - occasional rapid-fire attacks
  useEffect(() => {
    const burstInterval = setInterval(() => {
      if (Math.random() < 0.3) { // 30% chance every 3 seconds
        const burstCount = Math.floor(Math.random() * 5) + 3; // 3-7 attacks in burst
        for (let i = 0; i < burstCount; i++) {
          setTimeout(() => {
            const newAttack = generateMockAttack();
            setAttacks(prev => {
              const updated = [...prev.slice(-19), newAttack];
              setTotalAttacks(prev => prev + 1);
              return updated;
            });
          }, i * 100); // Stagger burst attacks by 100ms
        }
      }
    }, 3000);

    return () => clearInterval(burstInterval);
  }, []);

  // Background growth effect - simulate continuous attack growth (faster!)
  useEffect(() => {
    const growthInterval = setInterval(() => {
      setTotalAttacks(prev => prev + Math.floor(Math.random() * 50) + 25); // 25-75 per second instead of 10-30
    }, 500); // Every 0.5 seconds instead of 1 second

    return () => clearInterval(growthInterval);
  }, []);

  return { isConnected, attacks, totalAttacks };
};
