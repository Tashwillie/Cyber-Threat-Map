import { useEffect, useState } from 'react';
import { io, Socket } from 'socket.io-client';
import { AttackEvent, AttackEventSchema } from '../types/attack.js';

export const useSocket = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [attacks, setAttacks] = useState<AttackEvent[]>([]);
  const [totalAttacks, setTotalAttacks] = useState(0);

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
        setTotalAttacks(prev => prev + 1);
      } catch (error) {
        console.error('Invalid attack data received:', error);
      }
    });

    setSocket(newSocket);

    return () => {
      newSocket.close();
    };
  }, []);

  return {
    socket,
    isConnected,
    attacks,
    totalAttacks,
  };
}; 