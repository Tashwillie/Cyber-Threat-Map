import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { AttackEvent, AttackEventSchema } from '../types/attack.js';

export const useSocket = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [attacks, setAttacks] = useState<AttackEvent[]>([]);
  
  // Always start from 2.5M+ base, then check localStorage
  const getInitialTotalAttacks = () => {
    const baseValue = 2500000 + Math.floor(Math.random() * 500000); // 2.5M to 3M range
    
    try {
      const stored = localStorage.getItem('cyber-threat-total-attacks');
      if (stored) {
        const parsed = parseInt(stored, 10);
        if (!isNaN(parsed) && parsed > 2500000) {
          return parsed;
        }
      }
    } catch (error) {
      console.log('localStorage not available, using base value');
    }
    
    return baseValue;
  };
  
  const [totalAttacks, setTotalAttacks] = useState(getInitialTotalAttacks);

  // Save to localStorage whenever totalAttacks changes
  useEffect(() => {
    localStorage.setItem('cyber-threat-total-attacks', totalAttacks.toString());
  }, [totalAttacks]);

  useEffect(() => {
    const newSocket = io('http://localhost:4000');

    newSocket.on('connect', () => {
      console.log('Connected to server');
      setIsConnected(true);
    });

    newSocket.on('disconnect', () => {
      console.log('Disconnected from server');
      setIsConnected(false);
    });

    newSocket.on('welcome', (data) => {
      console.log('Welcome message:', data);
    });

    newSocket.on('attack', (data) => {
      try {
        const parsed = AttackEventSchema.parse(data);
        setAttacks(prev => {
          const newAttacks = [...prev, parsed];
          // Keep only last 100 attacks to prevent memory issues
          return newAttacks.slice(-100);
        });
        setTotalAttacks(prev => prev + Math.floor(Math.random() * 50) + 25);
      } catch (error) {
        console.error('Invalid attack data received:', error);
      }
    });

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, []);

  // Background growth effect - simulate continuous attack growth
  useEffect(() => {
    const growthInterval = setInterval(() => {
      setTotalAttacks(prev => prev + Math.floor(Math.random() * 20) + 10);
    }, 1000);

    return () => clearInterval(growthInterval);
  }, []);

  return {
    socket,
    isConnected,
    attacks,
    totalAttacks,
  };
}; 