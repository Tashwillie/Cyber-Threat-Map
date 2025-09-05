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
export const AttackTypeConfig = {
    ddos: {
        color: '#ff4444',
        name: 'DDoS Attack',
        description: 'Distributed Denial of Service',
    },
    malware: {
        color: '#ff8800',
        name: 'Malware',
        description: 'Malicious Software',
    },
    phishing: {
        color: '#ffaa00',
        name: 'Phishing',
        description: 'Social Engineering Attack',
    },
    ransomware: {
        color: '#cc0000',
        name: 'Ransomware',
        description: 'Data Encryption Attack',
    },
    'sql-injection': {
        color: '#8800ff',
        name: 'SQL Injection',
        description: 'Database Attack',
    },
};
//# sourceMappingURL=attack.js.map