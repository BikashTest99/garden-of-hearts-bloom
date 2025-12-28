import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

interface Star {
  id: string;
  x: number;
  y: number;
  label: string;
  description: string;
  isVenue: boolean;
}

interface Connection {
  from: string;
  to: string;
}

const ConstellationSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [showConnections, setShowConnections] = useState(false);
  const [showLabels, setShowLabels] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const stars: Star[] = [
    { id: 'church', x: 30, y: 30, label: 'Wedding Ceremony', description: 'Pokhara Community Church • Feb 5', isVenue: true },
    { id: 'reception', x: 70, y: 35, label: 'Reception', description: 'R.C. Complex, Lamachaur • Feb 7', isVenue: true },
    { id: 'groom', x: 20, y: 55, label: "Groom's Journey", description: 'Where his story began', isVenue: false },
    { id: 'bride', x: 80, y: 60, label: "Bride's Journey", description: 'Where her story began', isVenue: false },
    { id: 'union', x: 50, y: 75, label: 'Union', description: 'Where two paths become one', isVenue: false },
  ];

  const connections: Connection[] = [
    { from: 'groom', to: 'church' },
    { from: 'bride', to: 'reception' },
    { from: 'church', to: 'reception' },
    { from: 'church', to: 'union' },
    { from: 'reception', to: 'union' },
    { from: 'groom', to: 'union' },
    { from: 'bride', to: 'union' },
  ];

  const getStarPosition = (id: string) => {
    const star = stars.find(s => s.id === id);
    return star ? { x: star.x, y: star.y } : { x: 0, y: 0 };
  };

  // Start connection animation after 3 seconds
  useEffect(() => {
    if (!isInView) return;
    
    const connectionTimer = setTimeout(() => {
      setShowConnections(true);
    }, 3000);

    const labelTimer = setTimeout(() => {
      setShowLabels(true);
    }, 4500);

    return () => {
      clearTimeout(connectionTimer);
      clearTimeout(labelTimer);
    };
  }, [isInView]);

  // Cycle through stars for highlighting
  useEffect(() => {
    if (!showLabels) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % stars.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [showLabels, stars.length]);

  return (
    <section ref={ref} className="py-24 md:py-32 px-4 relative overflow-hidden bg-sage-dark min-h-[700px]">
      {/* Starry Background */}
      <div className="absolute inset-0">
        {[...Array(80)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-cream/40"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              width: Math.random() > 0.8 ? '2px' : '1px',
              height: Math.random() > 0.8 ? '2px' : '1px',
            }}
            animate={{
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: 2 + Math.random() * 3,
              repeat: Infinity,
              delay: Math.random() * 2,
            }}
          />
        ))}
      </div>

      {/* Nebula Glow Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute w-[400px] h-[400px] rounded-full opacity-10"
          style={{
            left: '20%',
            top: '30%',
            background: 'radial-gradient(circle, hsl(var(--gold) / 0.3) 0%, transparent 70%)',
            filter: 'blur(40px)',
          }}
        />
        <div 
          className="absolute w-[300px] h-[300px] rounded-full opacity-10"
          style={{
            right: '15%',
            bottom: '20%',
            background: 'radial-gradient(circle, hsl(var(--sage) / 0.4) 0%, transparent 70%)',
            filter: 'blur(30px)',
          }}
        />
      </div>

      <div className="max-w-5xl mx-auto relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-8"
        >
          <h2 className="font-display text-3xl md:text-5xl text-cream mb-4">
            Our Constellation
          </h2>
          <p className="font-body text-cream/60 max-w-lg mx-auto">
            The stars align as our journeys unite
          </p>
        </motion.div>

        {/* Constellation Map */}
        <div className="relative h-[450px] md:h-[500px]">
          {/* SVG Constellation Lines */}
          <svg className="absolute inset-0 w-full h-full" style={{ overflow: 'visible' }}>
            <defs>
              <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="hsl(var(--gold))" stopOpacity="0.6" />
                <stop offset="50%" stopColor="hsl(var(--cream))" stopOpacity="0.8" />
                <stop offset="100%" stopColor="hsl(var(--gold))" stopOpacity="0.6" />
              </linearGradient>
              <filter id="glow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            
            {/* Connection lines */}
            {connections.map((conn, index) => {
              const from = getStarPosition(conn.from);
              const to = getStarPosition(conn.to);
              
              return (
                <motion.line
                  key={`${conn.from}-${conn.to}`}
                  x1={`${from.x}%`}
                  y1={`${from.y}%`}
                  x2={`${to.x}%`}
                  y2={`${to.y}%`}
                  stroke="url(#lineGradient)"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  filter="url(#glow)"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={showConnections ? { 
                    pathLength: 1, 
                    opacity: 0.7,
                  } : {}}
                  transition={{ 
                    delay: index * 0.15,
                    duration: 0.8,
                    ease: "easeOut"
                  }}
                />
              );
            })}

            {/* Animated dots along connections */}
            {showConnections && connections.map((conn, index) => {
              const from = getStarPosition(conn.from);
              const to = getStarPosition(conn.to);
              
              return (
                <motion.circle
                  key={`dot-${conn.from}-${conn.to}`}
                  r="2"
                  fill="hsl(var(--gold))"
                  filter="url(#glow)"
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: [0, 1, 0],
                    cx: [`${from.x}%`, `${to.x}%`],
                    cy: [`${from.y}%`, `${to.y}%`],
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    delay: index * 0.3 + 1,
                    ease: "linear",
                  }}
                />
              );
            })}
          </svg>

          {/* Stars */}
          {stars.map((star, index) => (
            <motion.div
              key={star.id}
              initial={{ opacity: 0, scale: 0 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ 
                delay: 0.5 + index * 0.2, 
                duration: 0.6, 
                type: "spring",
                stiffness: 200,
              }}
              className="absolute transform -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${star.x}%`, top: `${star.y}%` }}
            >
              {/* Star Glow Ring */}
              <motion.div
                className={`absolute rounded-full ${star.isVenue ? 'bg-gold/20' : 'bg-cream/15'}`}
                style={{
                  width: star.isVenue ? 60 : 40,
                  height: star.isVenue ? 60 : 40,
                  left: star.isVenue ? -30 : -20,
                  top: star.isVenue ? -30 : -20,
                }}
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.2, 0.4, 0.2],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  delay: index * 0.2,
                }}
              />

              {/* Outer Ring */}
              <motion.div
                className={`absolute rounded-full border ${star.isVenue ? 'border-gold/50' : 'border-cream/30'}`}
                style={{
                  width: star.isVenue ? 36 : 24,
                  height: star.isVenue ? 36 : 24,
                  left: star.isVenue ? -18 : -12,
                  top: star.isVenue ? -18 : -12,
                }}
                animate={{
                  rotate: 360,
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                }}
              />

              {/* Star Core */}
              <motion.div 
                className={`relative rounded-full ${star.isVenue ? 'w-5 h-5 bg-gold shadow-[0_0_20px_hsl(var(--gold))]' : 'w-3 h-3 bg-cream shadow-[0_0_10px_hsl(var(--cream))]'}`}
                animate={activeIndex === index && showLabels ? {
                  scale: [1, 1.3, 1],
                  boxShadow: star.isVenue 
                    ? ['0 0 20px hsl(var(--gold))', '0 0 40px hsl(var(--gold))', '0 0 20px hsl(var(--gold))']
                    : ['0 0 10px hsl(var(--cream))', '0 0 25px hsl(var(--cream))', '0 0 10px hsl(var(--cream))'],
                } : {}}
                transition={{ duration: 1.5, repeat: activeIndex === index ? Infinity : 0 }}
              />

              {/* Star Cross Flare */}
              {star.isVenue && (
                <>
                  <motion.div
                    className="absolute w-px h-8 bg-gradient-to-b from-transparent via-gold/60 to-transparent"
                    style={{ left: '50%', top: '-12px', transform: 'translateX(-50%)' }}
                    animate={{ opacity: [0.3, 0.8, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <motion.div
                    className="absolute w-8 h-px bg-gradient-to-r from-transparent via-gold/60 to-transparent"
                    style={{ left: '-12px', top: '50%', transform: 'translateY(-50%)' }}
                    animate={{ opacity: [0.3, 0.8, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                  />
                </>
              )}

              {/* Label */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={showLabels ? { 
                  opacity: activeIndex === index ? 1 : 0.6,
                  y: 0,
                  scale: activeIndex === index ? 1.05 : 1,
                } : { opacity: 0, y: 10 }}
                transition={{ duration: 0.5 }}
                className="absolute top-full mt-4 left-1/2 -translate-x-1/2 whitespace-nowrap z-10"
              >
                <div className={`px-4 py-2 rounded-xl backdrop-blur-sm transition-all ${
                  activeIndex === index 
                    ? 'bg-cream/95 shadow-lg shadow-gold/20' 
                    : 'bg-cream/80'
                }`}>
                  <p className={`font-display text-sm ${star.isVenue ? 'text-gold' : 'text-sage-dark'}`}>
                    {star.label}
                  </p>
                  <p className="font-body text-xs text-sage/70 mt-0.5">
                    {star.description}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={showLabels ? { opacity: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="flex items-center justify-center gap-8 mt-12"
        >
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 rounded-full bg-gold shadow-[0_0_10px_hsl(var(--gold))]" />
            <span className="font-body text-sm text-cream/70">Venues</span>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-cream shadow-[0_0_8px_hsl(var(--cream))]" />
            <span className="font-body text-sm text-cream/70">Journey Points</span>
          </div>
        </motion.div>

        {/* Loading Hint */}
        <motion.p
          initial={{ opacity: 1 }}
          animate={showConnections ? { opacity: 0 } : { opacity: 1 }}
          className="text-center mt-6 font-body text-cream/40 text-sm"
        >
          ✨ Watch the stars connect...
        </motion.p>
      </div>
    </section>
  );
};

export default ConstellationSection;
