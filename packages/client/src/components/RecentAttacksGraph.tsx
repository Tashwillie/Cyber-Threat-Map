import React, { useEffect, useState } from 'react';

interface RecentAttacksGraphProps {
  totalAttacks: number;
}

const RecentAttacksGraph: React.FC<RecentAttacksGraphProps> = ({ totalAttacks }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [animatedData, setAnimatedData] = useState<number[]>([]);
  const [isAnimating, setIsAnimating] = useState(false);

  // Generate realistic daily attack data for the last 20 days based on total attacks
  const generateDailyData = () => {
    const data = [];
    const today = new Date();
    
    // Use totalAttacks as today's value, ensure it's in millions
    const todayAttacks = Math.max(totalAttacks, 2500000); // Minimum 2.5M
    
    for (let i = 19; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(date.getDate() - i);
      
      if (i === 0) {
        // Today's attacks (use totalAttacks)
        data.push(todayAttacks);
      } else {
        // Generate historical data based on today's value
        const baseAttacks = todayAttacks * (0.8 + Math.random() * 0.4); // 80-120% of today
        const dayVariation = Math.sin(i * 0.3) * (todayAttacks * 0.1); // Weekly pattern
        const randomSpike = Math.random() < 0.2 ? Math.random() * (todayAttacks * 0.2) : 0; // Occasional spikes
        
        data.push(Math.max(todayAttacks * 0.6, Math.floor(baseAttacks + dayVariation + randomSpike)));
      }
    }
    
    return data;
  };

  const [dailyData, setDailyData] = useState(generateDailyData());

  // Update daily data when totalAttacks changes
  useEffect(() => {
    setDailyData(generateDailyData());
  }, [totalAttacks]);

  // Update current date every second
  useEffect(() => {
    const dateInterval = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => clearInterval(dateInterval);
  }, []);

  // Animate data on mount and every 30 seconds
  useEffect(() => {
    const animateData = () => {
      setIsAnimating(true);
      setAnimatedData(Array(dailyData.length).fill(0));
      
      let frame = 0;
      const animate = () => {
        setAnimatedData((prev) =>
          prev.map((_, i) =>
            i <= frame ? dailyData[i] : prev[i]
          )
        );
        frame++;
        if (frame < dailyData.length) {
          setTimeout(animate, 50);
        } else {
          setIsAnimating(false);
        }
      };
      animate();
    };

    animateData();
    const interval = setInterval(animateData, 30000); // Re-animate every 30 seconds

    return () => clearInterval(interval);
  }, [dailyData]);

  const max = Math.max(...dailyData);
  const barWidth = 100 / dailyData.length;

  // Generate date labels for the last 20 days
  const getDateLabels = () => {
    const today = new Date();
    const startDate = new Date(today);
    startDate.setDate(today.getDate() - 19);
    
    return {
      start: startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      end: today.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    };
  };

  const dateLabels = getDateLabels();
  const currentTime = currentDate.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit', 
    second: '2-digit' 
  });

  return (
    <div style={{ width: '100%', height: 180, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', background: 'none' }}>
      <div style={{ fontWeight: 700, fontSize: 16, color: '#fff', marginBottom: 8, letterSpacing: 1 }}>
        RECENT DAILY ATTACKS
      </div>
      
      {/* Current time display */}
      <div style={{ 
        color: '#00eaff', 
        fontSize: 12, 
        marginBottom: 4, 
        fontWeight: 'bold',
        textAlign: 'center',
        textShadow: '0 0 5px #00eaff'
      }}>
        {currentTime}
      </div>

      <svg width="100%" height="120" viewBox="0 0 100 100" style={{ background: 'none', width: '100%', height: 120 }}>
        {animatedData.map((val, i) => {
          const height = (val / max) * 90;
          const isToday = i === animatedData.length - 1;
          const isSpike = val > max * 0.8;
          
          return (
            <rect
              key={i}
              x={i * barWidth + 2}
              y={100 - height}
              width={barWidth - 2}
              height={height}
              rx={2}
              fill={isToday ? "url(#today-gradient)" : isSpike ? "url(#spike-gradient)" : "url(#blue-gradient)"}
              style={{ 
                filter: isToday ? 'drop-shadow(0 0 6px #00eaff)' : 'drop-shadow(0 0 3px #00eaffcc)',
                transition: 'all 0.3s ease'
              }}
            />
          );
        })}
        <defs>
          <linearGradient id="blue-gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#00eaff" />
            <stop offset="100%" stopColor="#a259e6" />
          </linearGradient>
          <linearGradient id="today-gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#00ffd0" />
            <stop offset="100%" stopColor="#e600ff" />
          </linearGradient>
          <linearGradient id="spike-gradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#ff6b35" />
            <stop offset="100%" stopColor="#ff4757" />
          </linearGradient>
        </defs>
      </svg>
      
      <div style={{ color: '#fff', fontSize: 12, marginTop: 8, opacity: 0.7, display: 'flex', justifyContent: 'space-between' }}>
        <span>{dateLabels.start}</span>
        <span style={{ color: '#00eaff', fontWeight: 'bold' }}>Today</span>
        <span>{dateLabels.end}</span>
      </div>
      
      {/* Attack count display */}
      <div style={{ 
        color: '#a259e6', 
        fontSize: 11, 
        marginTop: 4, 
        textAlign: 'center',
        fontWeight: 'bold'
      }}>
        {animatedData.length > 0 && (
          <>
            {animatedData[animatedData.length - 1]?.toLocaleString()} attacks today
          </>
        )}
      </div>
    </div>
  );
};

export default RecentAttacksGraph; 