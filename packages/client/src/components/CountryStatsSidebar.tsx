import React, { useEffect, useRef } from 'react';

interface CountryStatsCardProps {
  country: string;
  coords: { x: number; y: number };
  onClose: () => void;
}

// In-file mapping for country names to ISO codes (expand as needed)
const countryNameToCode: Record<string, string> = {
  'South Africa': 'za',
  'United States': 'us',
  'United States of America': 'us',
  'China': 'cn',
  'Russia': 'ru',
  'Germany': 'de',
  'France': 'fr',
  'Brazil': 'br',
  'India': 'in',
  'United Kingdom': 'gb',
  'England': 'gb',
  'Japan': 'jp',
  'Canada': 'ca',
  'Australia': 'au',
  'Italy': 'it',
  'Spain': 'es',
  'Mexico': 'mx',
  'Turkey': 'tr',
  'Netherlands': 'nl',
  'Switzerland': 'ch',
  'Sweden': 'se',
  'South Korea': 'kr',
  'North Korea': 'kp',
  'Czechia': 'cz',
  'Vietnam': 'vn',
  'Taiwan': 'tw',
  'Palestine': 'ps',
  'Venezuela': 've',
  'Laos': 'la',
  'Moldova': 'md',
  'Syria': 'sy',
  'Bolivia': 'bo',
  'Tanzania': 'tz',
  'Egypt': 'eg',
  'Argentina': 'ar',
  'Poland': 'pl',
  'Norway': 'no',
  'Denmark': 'dk',
  'Finland': 'fi',
  'Belgium': 'be',
  'Austria': 'at',
  'Ireland': 'ie',
  'Portugal': 'pt',
  'Greece': 'gr',
  'Hungary': 'hu',
  'Romania': 'ro',
  'New Zealand': 'nz',
  'Ukraine': 'ua',
  'Saudi Arabia': 'sa',
  'Israel': 'il',
  'Singapore': 'sg',
  'Malaysia': 'my',
  'Indonesia': 'id',
  'Thailand': 'th',
  'Philippines': 'ph',
  'Pakistan': 'pk',
  'Bangladesh': 'bd',
  'Nigeria': 'ng',
  'Morocco': 'ma',
  'Kenya': 'ke',
  'Algeria': 'dz',
  'Chile': 'cl',
  'Colombia': 'co',
  'Peru': 'pe',
  'Slovakia': 'sk',
  'Slovenia': 'si',
  'Estonia': 'ee',
  'Lithuania': 'lt',
  'Latvia': 'lv',
  'Croatia': 'hr',
  'Serbia': 'rs',
  'Bulgaria': 'bg',
  'Luxembourg': 'lu',
  'Iceland': 'is',
  'Malta': 'mt',
  'Cyprus': 'cy',
  'Georgia': 'ge',
  'Kazakhstan': 'kz',
  'Uzbekistan': 'uz',
  'Belarus': 'by',
  'Armenia': 'am',
  'Azerbaijan': 'az',
  'Qatar': 'qa',
  'UAE': 'ae',
  'United Arab Emirates': 'ae',
  'Kuwait': 'kw',
  'Oman': 'om',
  'Bahrain': 'bh',
  'Jordan': 'jo',
  'Lebanon': 'lb',
  'Iraq': 'iq',
  'Iran': 'ir',
  'Afghanistan': 'af',
  'Sri Lanka': 'lk',
  'Nepal': 'np',
  'Myanmar': 'mm',
  'Cambodia': 'kh',
  'Mongolia': 'mn',
  'Yemen': 'ye',
  'Sudan': 'sd',
  'Ethiopia': 'et',
  'Ghana': 'gh',
  'Ivory Coast': 'ci',
  'Cameroon': 'cm',
  'Senegal': 'sn',
  'Angola': 'ao',
  'Zimbabwe': 'zw',
  'Uganda': 'ug',
  'Mozambique': 'mz',
  'Botswana': 'bw',
  'Namibia': 'na',
  'Zambia': 'zm',
  'Madagascar': 'mg',
  'Paraguay': 'py',
  'Uruguay': 'uy',
  'Ecuador': 'ec',
  'Costa Rica': 'cr',
  'Panama': 'pa',
  'Guatemala': 'gt',
  'Honduras': 'hn',
  'El Salvador': 'sv',
  'Nicaragua': 'ni',
  'Cuba': 'cu',
  'Dominican Republic': 'do',
  'Haiti': 'ht',
  'Jamaica': 'jm',
  'Trinidad and Tobago': 'tt',
  'Bahamas': 'bs',
  'Barbados': 'bb',
  'Fiji': 'fj',
  'Papua New Guinea': 'pg',
  'Samoa': 'ws',
  'Tonga': 'to',
  'Vanuatu': 'vu',
  'Solomon Islands': 'sb',
  'Malawi': 'mw',
  'Rwanda': 'rw',
  'Burundi': 'bi',
  'Somalia': 'so',
  'Libya': 'ly',
  'Tunisia': 'tn',
  'Sierra Leone': 'sl',
  'Liberia': 'lr',
  'Gabon': 'ga',
  'Republic of the Congo': 'cg',
  'Democratic Republic of the Congo': 'cd',
  'Central African Republic': 'cf',
  'Chad': 'td',
  'Niger': 'ne',
  'Benin': 'bj',
  'Togo': 'tg',
  'Burkina Faso': 'bf',
  'Mali': 'ml',
  'Guinea': 'gn',
  'Gambia': 'gm',
  'Mauritania': 'mr',
  'Lesotho': 'ls',
  'Swaziland': 'sz',
  'Eswatini': 'sz',
  'Djibouti': 'dj',
  'Eritrea': 'er',
  'Comoros': 'km',
  'Seychelles': 'sc',
  'Cape Verde': 'cv',
  'Sao Tome and Principe': 'st',
  'Maldives': 'mv',
  'Brunei': 'bn',
  'East Timor': 'tl',
  'Timor-Leste': 'tl',
  'Suriname': 'sr',
  'Guyana': 'gy',
  'Belize': 'bz',
  'Saint Lucia': 'lc',
  'Saint Vincent and the Grenadines': 'vc',
  'Grenada': 'gd',
  'Antigua and Barbuda': 'ag',
  'Saint Kitts and Nevis': 'kn',
  'Dominica': 'dm',
  'Saint Pierre and Miquelon': 'pm',
  'Greenland': 'gl',
  'Faroe Islands': 'fo',
  'Monaco': 'mc',
  'San Marino': 'sm',
  'Liechtenstein': 'li',
  'Andorra': 'ad',
  'Vatican City': 'va',
  'Gibraltar': 'gi',
  'Bermuda': 'bm',
  'Cayman Islands': 'ky',
  'Isle of Man': 'im',
  'Jersey': 'je',
  'Guernsey': 'gg',
  'Anguilla': 'ai',
  'British Virgin Islands': 'vg',
  'Caribbean Netherlands': 'bq',
  'Sint Maarten': 'sx',
  'Saint Martin': 'mf',
  'Aruba': 'aw',
  'Curacao': 'cw',
  'Bonaire': 'bq',
  'Saint Barthelemy': 'bl',
  'Saint Helena': 'sh',
  'Ascension Island': 'ac',
  'Tristan da Cunha': 'ta',
  'Falkland Islands': 'fk',
  'South Georgia and the South Sandwich Islands': 'gs',
  'Antarctica': 'aq',
};

const getFlagUrl = (country: string) => {
  const code = countryNameToCode[country];
  if (code) return `https://flagcdn.com/48x36/${code}.png`;
  return undefined;
};

const mockAttackTrend = [12, 9, 14, 8, 13, 15, 11, 16, 14, 13, 17, 15, 14, 13, 16, 18, 17, 16, 15, 14, 13, 12, 13, 14, 15, 16, 17, 18, 17, 16];
const mockMalwareTrends = [
  { type: 'Botnet', percent: 5.2, data: [2,3,3,4,4,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5,5] },
  { type: 'Infostealer', percent: 1.1, data: [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1] },
  { type: 'Banking', percent: 0.5, data: [0,0,0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1] },
  { type: 'Ransomware', percent: 0.7, data: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1,1,1] },
  { type: 'Mobile', percent: 0.4, data: [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,1] },
];

const CountryStatsCard: React.FC<CountryStatsCardProps> = ({ country, coords, onClose }) => {
  const trendRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = React.useState<{ left: number; top: number }>({ left: coords.x, top: coords.y });

  // Sidebar widths (match App.tsx)
  const SIDEBAR_WIDTH = 250;

  // Chart rendering
  useEffect(() => {
    if ((window as any).Chartist && trendRef.current) {
      new (window as any).Chartist.Line(
        trendRef.current,
        {
          labels: Array.from({ length: mockAttackTrend.length }, (_, i) => i + 1),
          series: [mockAttackTrend],
        },
        {
          showArea: true,
          showPoint: false,
          axisX: { showGrid: false, showLabel: false },
          axisY: { showGrid: false, showLabel: false },
          lineSmooth: false,
          height: 70,
          width: 220,
          chartPadding: 0,
          low: 0,
          fullWidth: true,
        }
      );
    }
  }, [country]);

  // Position adjustment to keep card in viewport
  useEffect(() => {
    if (!cardRef.current) return;
    const card = cardRef.current;
    const { innerWidth, innerHeight } = window;
    const rect = card.getBoundingClientRect();
    let left = coords.x;
    let top = coords.y;
    // Card size
    const cardW = rect.width || 320;
    const cardH = rect.height || 260;
    // Clamp left/right to never overlap sidebars
    left = Math.max(SIDEBAR_WIDTH + cardW / 2 + 8, Math.min(left, innerWidth - SIDEBAR_WIDTH - cardW / 2 - 8));
    // Default: above click, centered
    top = top - cardH - 24;
    // If above would go off top, show below
    if (top < 8) top = coords.y + 24;
    // If below would go off bottom, clamp
    if (top + cardH > innerHeight - 8) top = innerHeight - cardH - 8;
    setPos({ left, top });
  }, [coords.x, coords.y, country]);

  return (
    <div
      ref={cardRef}
      style={{
        position: 'fixed',
        left: pos.left,
        top: pos.top,
        transform: 'translate(-50%, 0)',
        width: 320,
        background: 'rgba(16, 19, 31, 0.98)',
        border: '2px solid #00eaff',
        boxShadow: '0 0 32px #00eaff44',
        borderRadius: 16,
        zIndex: 100,
        color: '#fff',
        padding: 0,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', padding: '18px 18px 8px 18px', borderBottom: '1px solid #23203b' }}>
        {getFlagUrl(country) ? (
          <img
            src={getFlagUrl(country)}
            alt={country}
            style={{ width: 36, height: 27, borderRadius: 3, marginRight: 16, objectFit: 'cover', boxShadow: '0 0 6px #00eaff88' }}
          />
        ) : (
          <span style={{ fontSize: 28, marginRight: 16 }}>🌐</span>
        )}
        <span style={{ fontSize: 22, fontWeight: 600, color: '#fff', flex: 1 }}>{country}</span>
        <button
          onClick={onClose}
          style={{ background: 'none', border: 'none', color: '#fff', fontSize: 22, cursor: 'pointer', marginLeft: 8 }}
          aria-label="Close"
        >
          ×
        </button>
      </div>
      {/* Attack Trend */}
      <div style={{ padding: '14px 18px 0 18px' }}>
        <div style={{ fontWeight: 700, fontSize: 16, letterSpacing: 1, color: '#fff', marginBottom: 2 }}>ATTACK TREND</div>
        <div style={{ color: '#aaa', fontSize: 12, marginBottom: 8 }}>Last 30 days</div>
        <div ref={trendRef} className="ct-chart ct-blue" style={{ height: 70, width: 220, margin: '0 auto 18px auto' }} />
      </div>
      {/* Malware Type Trends */}
      <div style={{ padding: '0 18px 12px 18px' }}>
        <div style={{ fontWeight: 700, fontSize: 16, letterSpacing: 1, color: '#fff', margin: '12px 0 2px 0' }}>MALWARE TYPE TRENDS</div>
        <div style={{ color: '#aaa', fontSize: 12, marginBottom: 8 }}>% of affected organizations</div>
        {mockMalwareTrends.map((m, idx) => (
          <div key={m.type} style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
            <MiniTrendChart data={m.data} />
            <span style={{ flex: 1, color: '#fff', fontSize: 14, marginLeft: 8 }}>{m.type}</span>
            <span style={{ color: '#fff', fontWeight: 600, fontSize: 14, marginLeft: 8 }}>{m.percent}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Mini trend chart using Chartist
const MiniTrendChart: React.FC<{ data: number[] }> = ({ data }) => {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if ((window as any).Chartist && ref.current) {
      new (window as any).Chartist.Line(
        ref.current,
        {
          labels: data.map((_, i) => i + 1),
          series: [data],
        },
        {
          showArea: false,
          showPoint: false,
          axisX: { showGrid: false, showLabel: false },
          axisY: { showGrid: false, showLabel: false },
          lineSmooth: false,
          height: 18,
          width: 60,
          chartPadding: 0,
          low: 0,
          fullWidth: true,
        }
      );
    }
  }, [data]);
  return <div ref={ref} className="ct-chart ct-blue" style={{ height: 18, width: 60 }} />;
};

export default CountryStatsCard; 