import { AttackEvent, AttackType } from '../types/attack.js';

// Major cities with their coordinates (realistic country pairs)
const cities = [
  // Africa
  { name: 'Lagos', lat: 6.5244, lng: 3.3792, country: 'Nigeria', region: 'Africa' },
  { name: 'Cairo', lat: 30.0444, lng: 31.2357, country: 'Egypt', region: 'Africa' },
  { name: 'Johannesburg', lat: -26.2041, lng: 28.0473, country: 'South Africa', region: 'Africa' },
  { name: 'Nairobi', lat: -1.2921, lng: 36.8219, country: 'Kenya', region: 'Africa' },
  { name: 'Addis Ababa', lat: 9.03, lng: 38.74, country: 'Ethiopia', region: 'Africa' },
  { name: 'Kinshasa', lat: -4.4419, lng: 15.2663, country: 'DR Congo', region: 'Africa' },
  { name: 'Casablanca', lat: 33.5731, lng: -7.5898, country: 'Morocco', region: 'Africa' },
  { name: 'Algiers', lat: 36.7538, lng: 3.0588, country: 'Algeria', region: 'Africa' },
  { name: 'Dakar', lat: 14.7167, lng: -17.4677, country: 'Senegal', region: 'Africa' },
  { name: 'Abidjan', lat: 5.3599, lng: -4.0083, country: 'Ivory Coast', region: 'Africa' },
  { name: 'Accra', lat: 5.6037, lng: -0.1870, country: 'Ghana', region: 'Africa' },
  { name: 'Kampala', lat: 0.3476, lng: 32.5825, country: 'Uganda', region: 'Africa' },
  { name: 'Luanda', lat: -8.8390, lng: 13.2894, country: 'Angola', region: 'Africa' },
  { name: 'Harare', lat: -17.8252, lng: 31.0335, country: 'Zimbabwe', region: 'Africa' },
  { name: 'Maputo', lat: -25.9692, lng: 32.5732, country: 'Mozambique', region: 'Africa' },
  // Americas
  { name: 'New York', lat: 40.7128, lng: -74.0060, country: 'United States', region: 'Americas' },
  { name: 'Toronto', lat: 43.6532, lng: -79.3832, country: 'Canada', region: 'Americas' },
  { name: 'São Paulo', lat: -23.5505, lng: -46.6333, country: 'Brazil', region: 'Americas' },
  { name: 'Mexico City', lat: 19.4326, lng: -99.1332, country: 'Mexico', region: 'Americas' },
  // Europe
  { name: 'London', lat: 51.5074, lng: -0.1278, country: 'United Kingdom', region: 'Europe' },
  { name: 'Berlin', lat: 52.5200, lng: 13.4050, country: 'Germany', region: 'Europe' },
  { name: 'Paris', lat: 48.8566, lng: 2.3522, country: 'France', region: 'Europe' },
  { name: 'Moscow', lat: 55.7558, lng: 37.6176, country: 'Russia', region: 'Europe' },
  // Asia
  { name: 'Tokyo', lat: 35.6762, lng: 139.6503, country: 'Japan', region: 'Asia' },
  { name: 'Beijing', lat: 39.9042, lng: 116.4074, country: 'China', region: 'Asia' },
  { name: 'Mumbai', lat: 19.0760, lng: 72.8777, country: 'India', region: 'Asia' },
  { name: 'Seoul', lat: 37.5665, lng: 126.9780, country: 'South Korea', region: 'Asia' },
  { name: 'Singapore', lat: 1.3521, lng: 103.8198, country: 'Singapore', region: 'Asia' },
  // Middle East
  { name: 'Dubai', lat: 25.2048, lng: 55.2708, country: 'United Arab Emirates', region: 'Middle East' },
  // Oceania
  { name: 'Sydney', lat: -33.8688, lng: 151.2093, country: 'Australia', region: 'Oceania' },
];

const attackTypes: AttackType[] = ['ddos', 'malware', 'phishing', 'ransomware', 'sql-injection'];
const severities = ['low', 'medium', 'high', 'critical'] as const;

const descriptions = {
  ddos: [
    'Large-scale DDoS attack targeting web infrastructure',
    'Botnet-driven traffic flood attack',
    'Distributed denial of service on critical services',
    'High-volume traffic attack on network resources',
  ],
  malware: [
    'Advanced persistent threat malware detected',
    'Trojan horse attempting system compromise',
    'Spyware collecting sensitive information',
    'Rootkit attempting privilege escalation',
  ],
  phishing: [
    'Spear phishing campaign targeting executives',
    'Credential harvesting attack',
    'Business email compromise attempt',
    'Social engineering attack on employees',
  ],
  ransomware: [
    'File encryption ransomware attack',
    'Double extortion ransomware campaign',
    'Ransomware targeting backup systems',
    'Crypto-ransomware spreading through network',
  ],
  'sql-injection': [
    'SQL injection attack on web application',
    'Database query manipulation attempt',
    'SQL injection targeting user authentication',
    'Blind SQL injection attack detected',
  ],
};

function getRandomElement<T>(array: T[]): T {
  return array[Math.floor(Math.random() * array.length)];
}

function getRandomCity() {
  return getRandomElement(cities);
}

export function generateMockAttack(): AttackEvent {
  let sourceCity = getRandomCity();
  let targetCity = getRandomCity();
  // Ensure source and target are not the same city
  while (targetCity.name === sourceCity.name) {
    targetCity = getRandomCity();
  }
  // 70% chance of international (cross-region) attack, 30% intra-region
  if (Math.random() < 0.7) {
    // Cross-region: pick a target from a different region
    const possibleTargets = cities.filter(c => c.region !== sourceCity.region && c.name !== sourceCity.name);
    if (possibleTargets.length > 0) {
      targetCity = getRandomElement(possibleTargets);
    }
  } else {
    // Intra-region: pick a target from the same region (but not the same city)
    const possibleTargets = cities.filter(c => c.region === sourceCity.region && c.name !== sourceCity.name);
    if (possibleTargets.length > 0) {
      targetCity = getRandomElement(possibleTargets);
    }
  }
  const attackType = getRandomElement(attackTypes);
  const severity = getRandomElement([...severities]) as (typeof severities)[number];
  const typeDescriptions = descriptions[attackType];
  const description = getRandomElement(typeDescriptions);

  return {
    id: `attack_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    timestamp: Date.now(),
    source: {
      lat: sourceCity.lat,
      lng: sourceCity.lng,
      country: sourceCity.country,
      city: sourceCity.name,
    },
    target: {
      lat: targetCity.lat,
      lng: targetCity.lng,
      country: targetCity.country,
      city: targetCity.name,
    },
    type: attackType,
    severity,
    description,
  };
}

export function generateMockAttacks(count: number): AttackEvent[] {
  return Array.from({ length: count }, () => generateMockAttack());
} 