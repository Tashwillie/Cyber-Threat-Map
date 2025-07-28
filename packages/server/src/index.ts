import express from 'express';
import http from 'http';
import { Server as SocketIOServer, Socket } from 'socket.io';
import cors from 'cors';
import { generateMockAttack } from './utils/mockData.js';
import { AttackEventSchema } from './types/attack.js';

const PORT = process.env.PORT ? Number(process.env.PORT) : 4000;

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new SocketIOServer(server, {
  cors: {
    origin: '*',
  },
});

// HTTP endpoint for health check
app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

// Socket.IO connection
io.on('connection', (socket: Socket) => {
  console.log('Client connected:', socket.id);

  // Send a welcome event
  socket.emit('welcome', { message: 'Connected to Cyber Threat Map server' });

  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
  });
});

// Periodically emit mock attack events to all clients
setInterval(() => {
  const attack = generateMockAttack();
  // Validate event before emitting
  const parsed = AttackEventSchema.safeParse(attack);
  if (parsed.success) {
    io.emit('attack', parsed.data);
  }
}, 1000); // 1 event per second

server.listen(PORT, () => {
  console.log(`Cyber Threat Map server running on http://localhost:${PORT}`);
}); 