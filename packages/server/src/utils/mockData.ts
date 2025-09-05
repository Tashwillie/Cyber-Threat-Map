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
  { name: 'Tehran', lat: 35.6892, lng: 51.3890, country: 'Iran', region: 'Middle East' },
  { name: 'Riyadh', lat: 24.7136, lng: 46.6753, country: 'Saudi Arabia', region: 'Middle East' },
  { name: 'Tel Aviv', lat: 32.0853, lng: 34.7818, country: 'Israel', region: 'Middle East' },
  // Oceania
  { name: 'Sydney', lat: -33.8688, lng: 151.2093, country: 'Australia', region: 'Oceania' },
  { name: 'Melbourne', lat: -37.8136, lng: 144.9631, country: 'Australia', region: 'Oceania' },
  { name: 'Auckland', lat: -36.8485, lng: 174.7633, country: 'New Zealand', region: 'Oceania' },
  // Additional major cities for better coverage
  { name: 'Bangkok', lat: 13.7563, lng: 100.5018, country: 'Thailand', region: 'Asia' },
  { name: 'Jakarta', lat: -6.2088, lng: 106.8456, country: 'Indonesia', region: 'Asia' },
  { name: 'Manila', lat: 14.5995, lng: 120.9842, country: 'Philippines', region: 'Asia' },
  { name: 'Kuala Lumpur', lat: 3.1390, lng: 101.6869, country: 'Malaysia', region: 'Asia' },
  { name: 'Hanoi', lat: 21.0285, lng: 105.8542, country: 'Vietnam', region: 'Asia' },
  { name: 'Buenos Aires', lat: -34.6118, lng: -58.3960, country: 'Argentina', region: 'Americas' },
  { name: 'Lima', lat: -12.0464, lng: -77.0428, country: 'Peru', region: 'Americas' },
  { name: 'Bogotá', lat: 4.7110, lng: -74.0721, country: 'Colombia', region: 'Americas' },
  { name: 'Santiago', lat: -33.4489, lng: -70.6693, country: 'Chile', region: 'Americas' },
  { name: 'Madrid', lat: 40.4168, lng: -3.7038, country: 'Spain', region: 'Europe' },
  { name: 'Rome', lat: 41.9028, lng: 12.4964, country: 'Italy', region: 'Europe' },
  { name: 'Amsterdam', lat: 52.3676, lng: 4.9041, country: 'Netherlands', region: 'Europe' },
  { name: 'Stockholm', lat: 59.3293, lng: 18.0686, country: 'Sweden', region: 'Europe' },
  { name: 'Warsaw', lat: 52.2297, lng: 21.0122, country: 'Poland', region: 'Europe' },
  { name: 'Istanbul', lat: 41.0082, lng: 28.9784, country: 'Turkey', region: 'Europe' },
  // Additional cities for better continent coverage
  { name: 'Los Angeles', lat: 34.0522, lng: -118.2437, country: 'United States', region: 'Americas' },
  { name: 'Chicago', lat: 41.8781, lng: -87.6298, country: 'United States', region: 'Americas' },
  { name: 'Miami', lat: 25.7617, lng: -80.1918, country: 'United States', region: 'Americas' },
  { name: 'Vancouver', lat: 49.2827, lng: -123.1207, country: 'Canada', region: 'Americas' },
  { name: 'Montreal', lat: 45.5017, lng: -73.5673, country: 'Canada', region: 'Americas' },
  { name: 'Rio de Janeiro', lat: -22.9068, lng: -43.1729, country: 'Brazil', region: 'Americas' },
  { name: 'Brasília', lat: -15.7801, lng: -47.9292, country: 'Brazil', region: 'Americas' },
  { name: 'Caracas', lat: 10.4806, lng: -66.9036, country: 'Venezuela', region: 'Americas' },
  { name: 'Lima', lat: -12.0464, lng: -77.0428, country: 'Peru', region: 'Americas' },
  { name: 'Bogotá', lat: 4.7110, lng: -74.0721, country: 'Colombia', region: 'Americas' },
  { name: 'Santiago', lat: -33.4489, lng: -70.6693, country: 'Chile', region: 'Americas' },
  { name: 'Montevideo', lat: -34.9011, lng: -56.1645, country: 'Uruguay', region: 'Americas' },
  // More European cities
  { name: 'Vienna', lat: 48.2082, lng: 16.3738, country: 'Austria', region: 'Europe' },
  { name: 'Prague', lat: 50.0755, lng: 14.4378, country: 'Czech Republic', region: 'Europe' },
  { name: 'Budapest', lat: 47.4979, lng: 19.0402, country: 'Hungary', region: 'Europe' },
  { name: 'Warsaw', lat: 52.2297, lng: 21.0122, country: 'Poland', region: 'Europe' },
  { name: 'Copenhagen', lat: 55.6761, lng: 12.5683, country: 'Denmark', region: 'Europe' },
  { name: 'Oslo', lat: 59.9139, lng: 10.7522, country: 'Norway', region: 'Europe' },
  { name: 'Helsinki', lat: 60.1699, lng: 24.9384, country: 'Finland', region: 'Europe' },
  { name: 'Dublin', lat: 53.3498, lng: -6.2603, country: 'Ireland', region: 'Europe' },
  { name: 'Lisbon', lat: 38.7223, lng: -9.1393, country: 'Portugal', region: 'Europe' },
  { name: 'Athens', lat: 37.9838, lng: 23.7275, country: 'Greece', region: 'Europe' },
  // More Asian cities
  { name: 'Shanghai', lat: 31.2304, lng: 121.4737, country: 'China', region: 'Asia' },
  { name: 'Guangzhou', lat: 23.1291, lng: 113.2644, country: 'China', region: 'Asia' },
  { name: 'Shenzhen', lat: 22.5431, lng: 114.0579, country: 'China', region: 'Asia' },
  { name: 'Delhi', lat: 28.7041, lng: 77.1025, country: 'India', region: 'Asia' },
  { name: 'Bangalore', lat: 12.9716, lng: 77.5946, country: 'India', region: 'Asia' },
  { name: 'Kolkata', lat: 22.5726, lng: 88.3639, country: 'India', region: 'Asia' },
  { name: 'Chennai', lat: 13.0827, lng: 80.2707, country: 'India', region: 'Asia' },
  { name: 'Osaka', lat: 34.6937, lng: 135.5023, country: 'Japan', region: 'Asia' },
  { name: 'Kyoto', lat: 35.0116, lng: 135.7681, country: 'Japan', region: 'Asia' },
  { name: 'Yokohama', lat: 35.4437, lng: 139.6380, country: 'Japan', region: 'Asia' },
  { name: 'Busan', lat: 35.1796, lng: 129.0756, country: 'South Korea', region: 'Asia' },
  { name: 'Incheon', lat: 37.4563, lng: 126.7052, country: 'South Korea', region: 'Asia' },
  { name: 'Taipei', lat: 25.0330, lng: 121.5654, country: 'Taiwan', region: 'Asia' },
  { name: 'Hong Kong', lat: 22.3193, lng: 114.1694, country: 'Hong Kong', region: 'Asia' },
  { name: 'Macau', lat: 22.1987, lng: 113.5439, country: 'Macau', region: 'Asia' },
  // More African cities
  { name: 'Cape Town', lat: -33.9249, lng: 18.4241, country: 'South Africa', region: 'Africa' },
  { name: 'Durban', lat: -29.8587, lng: 31.0218, country: 'South Africa', region: 'Africa' },
  { name: 'Tunis', lat: 36.8065, lng: 10.1815, country: 'Tunisia', region: 'Africa' },
  { name: 'Tripoli', lat: 32.8872, lng: 13.1913, country: 'Libya', region: 'Africa' },
  { name: 'Khartoum', lat: 15.5007, lng: 32.5599, country: 'Sudan', region: 'Africa' },
  { name: 'Kigali', lat: -1.9441, lng: 30.0619, country: 'Rwanda', region: 'Africa' },
  { name: 'Dar es Salaam', lat: -6.7924, lng: 39.2083, country: 'Tanzania', region: 'Africa' },
  { name: 'Lusaka', lat: -15.3875, lng: 28.3228, country: 'Zambia', region: 'Africa' },
  { name: 'Gaborone', lat: -24.6282, lng: 25.9231, country: 'Botswana', region: 'Africa' },
  { name: 'Windhoek', lat: -22.5609, lng: 17.0658, country: 'Namibia', region: 'Africa' },
  // More Middle Eastern cities
  { name: 'Baghdad', lat: 33.3152, lng: 44.3661, country: 'Iraq', region: 'Middle East' },
  { name: 'Damascus', lat: 33.5138, lng: 36.2765, country: 'Syria', region: 'Middle East' },
  { name: 'Beirut', lat: 33.8938, lng: 35.5018, country: 'Lebanon', region: 'Middle East' },
  { name: 'Amman', lat: 31.9454, lng: 35.9284, country: 'Jordan', region: 'Middle East' },
  { name: 'Kuwait City', lat: 29.3759, lng: 47.9774, country: 'Kuwait', region: 'Middle East' },
  { name: 'Doha', lat: 25.2854, lng: 51.5310, country: 'Qatar', region: 'Middle East' },
  { name: 'Manama', lat: 26.0667, lng: 50.5577, country: 'Bahrain', region: 'Middle East' },
  { name: 'Muscat', lat: 23.5880, lng: 58.3829, country: 'Oman', region: 'Middle East' },
  { name: 'Sanaa', lat: 15.3694, lng: 44.1910, country: 'Yemen', region: 'Middle East' },
  // More Oceania cities
  { name: 'Brisbane', lat: -27.4698, lng: 153.0251, country: 'Australia', region: 'Oceania' },
  { name: 'Perth', lat: -31.9505, lng: 115.8605, country: 'Australia', region: 'Oceania' },
  { name: 'Adelaide', lat: -34.9285, lng: 138.6007, country: 'Australia', region: 'Oceania' },
  { name: 'Wellington', lat: -41.2924, lng: 174.7787, country: 'New Zealand', region: 'Oceania' },
  { name: 'Christchurch', lat: -43.5321, lng: 172.6362, country: 'New Zealand', region: 'Oceania' },
  { name: 'Suva', lat: -18.1248, lng: 178.4501, country: 'Fiji', region: 'Oceania' },
  { name: 'Port Moresby', lat: -9.4780, lng: 147.1500, country: 'Papua New Guinea', region: 'Oceania' },
  // Additional major continental cities for better coverage
  { name: 'Cape Town', lat: -33.9249, lng: 18.4241, country: 'South Africa', region: 'Africa' },
  { name: 'Durban', lat: -29.8587, lng: 31.0218, country: 'South Africa', region: 'Africa' },
  { name: 'Tunis', lat: 36.8065, lng: 10.1815, country: 'Tunisia', region: 'Africa' },
  { name: 'Tripoli', lat: 32.8872, lng: 13.1913, country: 'Libya', region: 'Africa' },
  { name: 'Khartoum', lat: 15.5007, lng: 32.5599, country: 'Sudan', region: 'Africa' },
  { name: 'Kigali', lat: -1.9441, lng: 30.0619, country: 'Rwanda', region: 'Africa' },
  { name: 'Dar es Salaam', lat: -6.7924, lng: 39.2083, country: 'Tanzania', region: 'Africa' },
  { name: 'Lusaka', lat: -15.3875, lng: 28.3228, country: 'Zambia', region: 'Africa' },
  { name: 'Gaborone', lat: -24.6282, lng: 25.9231, country: 'Botswana', region: 'Africa' },
  { name: 'Windhoek', lat: -22.5609, lng: 17.0658, country: 'Namibia', region: 'Africa' },
  // Major European cities
  { name: 'Madrid', lat: 40.4168, lng: -3.7038, country: 'Spain', region: 'Europe' },
  { name: 'Rome', lat: 41.9028, lng: 12.4964, country: 'Italy', region: 'Europe' },
  { name: 'Amsterdam', lat: 52.3676, lng: 4.9041, country: 'Netherlands', region: 'Europe' },
  { name: 'Stockholm', lat: 59.3293, lng: 18.0686, country: 'Sweden', region: 'Europe' },
  { name: 'Warsaw', lat: 52.2297, lng: 21.0122, country: 'Poland', region: 'Europe' },
  { name: 'Istanbul', lat: 41.0082, lng: 28.9784, country: 'Turkey', region: 'Europe' },
  { name: 'Vienna', lat: 48.2082, lng: 16.3738, country: 'Austria', region: 'Europe' },
  { name: 'Prague', lat: 50.0755, lng: 14.4378, country: 'Czech Republic', region: 'Europe' },
  { name: 'Budapest', lat: 47.4979, lng: 19.0402, country: 'Hungary', region: 'Europe' },
  { name: 'Copenhagen', lat: 55.6761, lng: 12.5683, country: 'Denmark', region: 'Europe' },
  { name: 'Oslo', lat: 59.9139, lng: 10.7522, country: 'Norway', region: 'Europe' },
  { name: 'Helsinki', lat: 60.1699, lng: 24.9384, country: 'Finland', region: 'Europe' },
  { name: 'Dublin', lat: 53.3498, lng: -6.2603, country: 'Ireland', region: 'Europe' },
  { name: 'Lisbon', lat: 38.7223, lng: -9.1393, country: 'Portugal', region: 'Europe' },
  { name: 'Athens', lat: 37.9838, lng: 23.7275, country: 'Greece', region: 'Europe' },
  // Major Asian cities
  { name: 'Shanghai', lat: 31.2304, lng: 121.4737, country: 'China', region: 'Asia' },
  { name: 'Guangzhou', lat: 23.1291, lng: 113.2644, country: 'China', region: 'Asia' },
  { name: 'Shenzhen', lat: 22.5431, lng: 114.0579, country: 'China', region: 'Asia' },
  { name: 'Delhi', lat: 28.7041, lng: 77.1025, country: 'India', region: 'Asia' },
  { name: 'Bangalore', lat: 12.9716, lng: 77.5946, country: 'India', region: 'Asia' },
  { name: 'Kolkata', lat: 22.5726, lng: 88.3639, country: 'India', region: 'Asia' },
  { name: 'Chennai', lat: 13.0827, lng: 80.2707, country: 'India', region: 'Asia' },
  { name: 'Osaka', lat: 34.6937, lng: 135.5023, country: 'Japan', region: 'Asia' },
  { name: 'Kyoto', lat: 35.0116, lng: 135.7681, country: 'Japan', region: 'Asia' },
  { name: 'Yokohama', lat: 35.4437, lng: 139.6380, country: 'Japan', region: 'Asia' },
  { name: 'Busan', lat: 35.1796, lng: 129.0756, country: 'South Korea', region: 'Asia' },
  { name: 'Incheon', lat: 37.4563, lng: 126.7052, country: 'South Korea', region: 'Asia' },
  { name: 'Taipei', lat: 25.0330, lng: 121.5654, country: 'Taiwan', region: 'Asia' },
  { name: 'Hong Kong', lat: 22.3193, lng: 114.1694, country: 'Hong Kong', region: 'Asia' },
  { name: 'Macau', lat: 22.1987, lng: 113.5439, country: 'Macau', region: 'Asia' },
  // Major Middle Eastern cities
  { name: 'Baghdad', lat: 33.3152, lng: 44.3661, country: 'Iraq', region: 'Middle East' },
  { name: 'Damascus', lat: 33.5138, lng: 36.2765, country: 'Syria', region: 'Middle East' },
  { name: 'Beirut', lat: 33.8938, lng: 35.5018, country: 'Lebanon', region: 'Middle East' },
  { name: 'Amman', lat: 31.9454, lng: 35.9284, country: 'Jordan', region: 'Middle East' },
  { name: 'Kuwait City', lat: 29.3759, lng: 47.9774, country: 'Kuwait', region: 'Middle East' },
  { name: 'Doha', lat: 25.2854, lng: 51.5310, country: 'Qatar', region: 'Middle East' },
  { name: 'Manama', lat: 26.0667, lng: 50.5577, country: 'Bahrain', region: 'Middle East' },
  { name: 'Muscat', lat: 23.5880, lng: 58.3829, country: 'Oman', region: 'Middle East' },
  { name: 'Sanaa', lat: 15.3694, lng: 44.1910, country: 'Yemen', region: 'Middle East' },
  // Major American cities
  { name: 'Los Angeles', lat: 34.0522, lng: -118.2437, country: 'United States', region: 'Americas' },
  { name: 'Chicago', lat: 41.8781, lng: -87.6298, country: 'United States', region: 'Americas' },
  { name: 'Miami', lat: 25.7617, lng: -80.1918, country: 'United States', region: 'Americas' },
  { name: 'Vancouver', lat: 49.2827, lng: -123.1207, country: 'Canada', region: 'Americas' },
  { name: 'Montreal', lat: 45.5017, lng: -73.5673, country: 'Canada', region: 'Americas' },
  { name: 'Rio de Janeiro', lat: -22.9068, lng: -43.1729, country: 'Brazil', region: 'Americas' },
  { name: 'Brasília', lat: -15.7801, lng: -47.9292, country: 'Brazil', region: 'Americas' },
  { name: 'Caracas', lat: 10.4806, lng: -66.9036, country: 'Venezuela', region: 'Americas' },
  { name: 'Montevideo', lat: -34.9011, lng: -56.1645, country: 'Uruguay', region: 'Americas' },
  // Major Oceanian cities
  { name: 'Brisbane', lat: -27.4698, lng: 153.0251, country: 'Australia', region: 'Oceania' },
  { name: 'Perth', lat: -31.9505, lng: 115.8605, country: 'Australia', region: 'Oceania' },
  { name: 'Adelaide', lat: -34.9285, lng: 138.6007, country: 'Australia', region: 'Oceania' },
  { name: 'Wellington', lat: -41.2924, lng: 174.7787, country: 'New Zealand', region: 'Oceania' },
  { name: 'Christchurch', lat: -43.5321, lng: 172.6362, country: 'New Zealand', region: 'Oceania' },
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
  // Ensure we only use cities from major continents (exclude small islands/regions)
  const continentalRegions = ['Africa', 'Americas', 'Europe', 'Asia', 'Middle East', 'Oceania'];
  const continentalCities = cities.filter(city => continentalRegions.includes(city.region));
  
  if (continentalCities.length === 0) {
    throw new Error('No continental cities available');
  }
  
  const sourceCity = getRandomElement(continentalCities);
  let targetCity: typeof sourceCity;
  
  // 80% chance of international (cross-region) attack, 20% intra-region
  if (Math.random() < 0.8) {
    // Cross-region: pick a target from a different continental region
    const possibleTargets = continentalCities.filter(c => 
      c.region !== sourceCity.region && 
      c.country !== sourceCity.country
    );
    
    if (possibleTargets.length > 0) {
      targetCity = getRandomElement(possibleTargets);
    } else {
      // Fallback: pick any continental city that's not the source
      const fallbackTargets = continentalCities.filter(c => 
        c.name !== sourceCity.name && 
        c.country !== sourceCity.country
      );
      targetCity = fallbackTargets.length > 0 ? getRandomElement(fallbackTargets) : continentalCities[0];
    }
  } else {
    // Intra-region: pick a target from the same region but different country
    const possibleTargets = continentalCities.filter(c => 
      c.region === sourceCity.region && 
      c.country !== sourceCity.country
    );
    
    if (possibleTargets.length > 0) {
      targetCity = getRandomElement(possibleTargets);
    } else {
      // Fallback: pick any continental city that's not the source
      const fallbackTargets = continentalCities.filter(c => 
        c.name !== sourceCity.name && 
        c.country !== sourceCity.country
      );
      targetCity = fallbackTargets.length > 0 ? getRandomElement(fallbackTargets) : continentalCities[0];
    }
  }
  
  // Final safety check: ensure source and target are different countries
  if (targetCity.country === sourceCity.country) {
    const differentCountryTargets = continentalCities.filter(c => 
      c.country !== sourceCity.country
    );
    targetCity = differentCountryTargets.length > 0 ? getRandomElement(differentCountryTargets) : continentalCities[0];
  }
  
  // Validate coordinates are within valid ranges
  const validateCoords = (lat: number, lng: number) => {
    return lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180;
  };
  
  // Ensure both cities have valid coordinates
  if (!validateCoords(sourceCity.lat, sourceCity.lng) || !validateCoords(targetCity.lat, targetCity.lng)) {
    console.warn('Invalid coordinates detected, using fallback continental cities');
    const fallbackSource = continentalCities[0];
    const fallbackTarget = continentalCities[1];
    return {
      id: `attack_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: Date.now(),
      source: {
        lat: fallbackSource.lat,
        lng: fallbackSource.lng,
        country: fallbackSource.country,
        city: fallbackSource.name,
      },
      target: {
        lat: fallbackTarget.lat,
        lng: fallbackTarget.lng,
        country: fallbackTarget.country,
        city: fallbackTarget.name,
      },
      type: getRandomElement(attackTypes),
      severity: getRandomElement([...severities]) as (typeof severities)[number],
      description: getRandomElement(descriptions[getRandomElement(attackTypes)]),
    };
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