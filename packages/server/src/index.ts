import express from 'express';
import http from 'http';
import { Server as SocketIOServer, Socket } from 'socket.io';
import cors from 'cors';
import path from 'path';
import { fileURLToPath } from 'url';
import { generateMockAttack } from './utils/mockData.js';
import { AttackEventSchema } from './types/attack.js';

const PORT = process.env.PORT ? Number(process.env.PORT) : 4000;

const app = express();
app.use(cors());

// Serve static files from the client build
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const clientDistPath = path.join(__dirname, '../../client/dist');

// Serve static files
app.use(express.static(clientDistPath));

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

// Catch-all handler: send back React's index.html file for client-side routing
app.get('*', (_req, res) => {
  res.sendFile(path.join(clientDistPath, 'index.html'));
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

// Attack type cycling for staggered animations
const attackTypes = ['ddos', 'malware', 'phishing', 'ransomware', 'sql-injection'];
let currentTypeIndex = 0;

// Function to generate attack with specific type
function generateAttackWithType(type: string) {
  const attack = generateMockAttack();
  attack.type = type as any; // Override the random type
  return attack;
}

// Staggered attack generation - each type gets its own timing
attackTypes.forEach((type, index) => {
  // Each attack type has different timing patterns
  const baseDelay = 800 + (index * 200); // 800ms, 1000ms, 1200ms, 1400ms, 1600ms
  const randomVariation = 300; // ±300ms variation
  
  setInterval(() => {
    const delay = baseDelay + (Math.random() * randomVariation * 2) - randomVariation;
    setTimeout(() => {
      const attack = generateAttackWithType(type);
      const parsed = AttackEventSchema.safeParse(attack);
      if (parsed.success) {
        io.emit('attack', parsed.data);
      }
    }, delay);
  }, baseDelay + 1000); // Base interval for each type
});

// Occasional burst patterns with mixed types
setInterval(() => {
  if (Math.random() < 0.3) { // 30% chance every 4 seconds
    const burstCount = Math.floor(Math.random() * 4) + 2; // 2-5 attacks
    const typesToUse = [...attackTypes].sort(() => Math.random() - 0.5).slice(0, burstCount);
    
    typesToUse.forEach((type, i) => {
      setTimeout(() => {
        const attack = generateAttackWithType(type);
        const parsed = AttackEventSchema.safeParse(attack);
        if (parsed.success) {
          io.emit('attack', parsed.data);
        }
      }, i * 200); // Stagger burst attacks by 200ms
    });
  }
}, 4000);

// Random high-frequency attacks (mixed types)
setInterval(() => {
  if (Math.random() < 0.4) { // 40% chance
    const attack = generateMockAttack(); // Keep some randomness
    const parsed = AttackEventSchema.safeParse(attack);
    if (parsed.success) {
      io.emit('attack', parsed.data);
    }
  }
}, 600); // Every 600ms

server.listen(PORT, () => {
  console.log(`Cyber Threat Map server running on http://localhost:${PORT}`);
}); 