import { z } from 'zod';
export declare const AttackEventSchema: z.ZodObject<{
    id: z.ZodString;
    timestamp: z.ZodNumber;
    source: z.ZodObject<{
        lat: z.ZodNumber;
        lng: z.ZodNumber;
        country: z.ZodString;
        city: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        lat: number;
        lng: number;
        country: string;
        city?: string | undefined;
    }, {
        lat: number;
        lng: number;
        country: string;
        city?: string | undefined;
    }>;
    target: z.ZodObject<{
        lat: z.ZodNumber;
        lng: z.ZodNumber;
        country: z.ZodString;
        city: z.ZodOptional<z.ZodString>;
    }, "strip", z.ZodTypeAny, {
        lat: number;
        lng: number;
        country: string;
        city?: string | undefined;
    }, {
        lat: number;
        lng: number;
        country: string;
        city?: string | undefined;
    }>;
    type: z.ZodEnum<["ddos", "malware", "phishing", "ransomware", "sql-injection"]>;
    severity: z.ZodEnum<["low", "medium", "high", "critical"]>;
    description: z.ZodString;
}, "strip", z.ZodTypeAny, {
    id: string;
    timestamp: number;
    type: "ddos" | "malware" | "phishing" | "ransomware" | "sql-injection";
    source: {
        lat: number;
        lng: number;
        country: string;
        city?: string | undefined;
    };
    target: {
        lat: number;
        lng: number;
        country: string;
        city?: string | undefined;
    };
    severity: "low" | "medium" | "high" | "critical";
    description: string;
}, {
    id: string;
    timestamp: number;
    type: "ddos" | "malware" | "phishing" | "ransomware" | "sql-injection";
    source: {
        lat: number;
        lng: number;
        country: string;
        city?: string | undefined;
    };
    target: {
        lat: number;
        lng: number;
        country: string;
        city?: string | undefined;
    };
    severity: "low" | "medium" | "high" | "critical";
    description: string;
}>;
export type AttackEvent = z.infer<typeof AttackEventSchema>;
export declare const AttackTypeConfig: {
    readonly ddos: {
        readonly color: "#ff4444";
        readonly name: "DDoS Attack";
        readonly description: "Distributed Denial of Service";
    };
    readonly malware: {
        readonly color: "#ff8800";
        readonly name: "Malware";
        readonly description: "Malicious Software";
    };
    readonly phishing: {
        readonly color: "#ffaa00";
        readonly name: "Phishing";
        readonly description: "Social Engineering Attack";
    };
    readonly ransomware: {
        readonly color: "#cc0000";
        readonly name: "Ransomware";
        readonly description: "Data Encryption Attack";
    };
    readonly 'sql-injection': {
        readonly color: "#8800ff";
        readonly name: "SQL Injection";
        readonly description: "Database Attack";
    };
};
export type AttackType = keyof typeof AttackTypeConfig;
//# sourceMappingURL=attack.d.ts.map