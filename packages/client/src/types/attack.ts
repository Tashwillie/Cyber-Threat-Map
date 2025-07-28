import { z } from 'zod';

export const AttackEventSchema = z.object({
  id: z.string(),
  timestamp: z.number(),
  source: z.object({
    lat: z.number().min(-90).max(90),
    lng: z.number().min(-180).max(180),
    country: z.string(),
    city: z.string().optional(),
  }),
  target: z.object({
    lat: z.number().min(-90).max(90),
    lng: z.number().min(-180).max(180),
    country: z.string(),
    city: z.string().optional(),
  }),
  type: z.enum(['ddos', 'malware', 'phishing', 'ransomware', 'sql-injection']),
  severity: z.enum(['low', 'medium', 'high', 'critical']),
  description: z.string(),
});

export type AttackEvent = z.infer<typeof AttackEventSchema>;

export const AttackTypeConfig = {
  ddos: {
    color: '#00eaff', // Neon blue
    name: 'DDoS Attack',
    description: 'Distributed Denial of Service',
  },
  malware: {
    color: '#00ffd0', // Neon cyan
    name: 'Malware',
    description: 'Malicious Software',
  },
  phishing: {
    color: '#a259e6', // Neon purple
    name: 'Phishing',
    description: 'Social Engineering Attack',
  },
  ransomware: {
    color: '#e600ff', // Neon magenta
    name: 'Ransomware',
    description: 'Data Encryption Attack',
  },
  'sql-injection': {
    color: '#00bfff', // Lighter neon blue
    name: 'SQL Injection',
    description: 'Database Attack',
  },
} as const;

export type AttackType = keyof typeof AttackTypeConfig; 