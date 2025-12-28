import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';

interface Star {
  id: string;
  x: number;
  y: number;
  label: string;
  isVenue: boolean;
}

const ConstellationSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [hoveredStar, setHoveredStar] = useState<string | null>(null);
  const [shootingStar, setShootingStar] = useState(false);

  const stars: Star[] = [
    { id: 'pokhara', x: 50, y: 35, label: 'Pokhara Community Church', isVenue: true },
    { id: 'lamachaur', x: 65, y: 55, label: 'R.C. Complex, Lamachaur', isVenue: true },
    { id: 'kathmandu', x: 25, y: 45, label: 'Kathmandu', isVenue: false },
    { id: 'hometown1', x: 35, y: 25, label: "Groom's Hometown", isVenue: false },
    { id: 'hometown2', x: 75, y: 30, label: "Bride's Hometown", isVenue: false },
    { id: 'blessing', x: 50, y: 70, label: 'Where Blessings Unite', isVenue: false },
  ];

  // Trigger shooting star occasionally
  useEffect(() => {
    if (!isInView) return;
    
    const interval = setInterval(() => {
      setShootingStar(true);
      setTimeout(() => setShootingStar(false), 3000);
    }, 8000);

    return () => clearInterval(interval);
  }, [isInView]);

  return (
    <section ref={ref} className="py-24 md:py-32 px-4 relative overflow-hidden bg-sage-dark min-h-[600px]">
      {/* Starry Background */}
      <div className="absolute inset-0">
        {[...Array(50)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-cream/60 rounded-full twinkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      {/* Shooting Star */}
      {shootingStar && (
        <motion.div
          initial={{ x: '-10%', y: '-10%', opacity: 1 }}
          animate={{ x: '110%', y: '110%', opacity: 0 }}
          transition={{ duration: 2, ease: "easeOut" }}
          className="absolute w-1 h-1"
        >
          <div className="w-1 h-1 bg-gold rounded-full" />
          <div 
            className="absolute top-0 right-0 w-20 h-px"
            style={{
              background: 'linear-gradient(to left, hsl(var(--gold)), transparent)',
              transform: 'rotate(45deg)',
              transformOrigin: 'right center',
            }}
          />
        </motion.div>
      )}

      <div className="max-w-5xl mx-auto relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-5xl text-cream mb-4">
            Our Constellation
          </h2>
          <p className="font-body text-cream/60 max-w-lg mx-auto">
            Stars that guide our journey together
          </p>
        </motion.div>

        {/* Constellation Map */}
        <div className="relative h-[400px] md:h-[500px]">
          {/* SVG Constellation Lines */}
          <svg className="absolute inset-0 w-full h-full">
            {/* Connection lines between stars */}
            <motion.line
              x1="50%" y1="35%"
              x2="65%" y2="55%"
              className="constellation-line"
              initial={{ pathLength: 0 }}
              animate={isInView ? { pathLength: 1 } : {}}
              transition={{ delay: 1, duration: 1 }}
            />
            <motion.line
              x1="25%" y1="45%"
              x2="50%" y2="35%"
              className="constellation-line"
              initial={{ pathLength: 0 }}
              animate={isInView ? { pathLength: 1 } : {}}
              transition={{ delay: 1.2, duration: 1 }}
            />
            <motion.line
              x1="35%" y1="25%"
              x2="50%" y2="35%"
              className="constellation-line"
              initial={{ pathLength: 0 }}
              animate={isInView ? { pathLength: 1 } : {}}
              transition={{ delay: 1.4, duration: 1 }}
            />
            <motion.line
              x1="75%" y1="30%"
              x2="65%" y2="55%"
              className="constellation-line"
              initial={{ pathLength: 0 }}
              animate={isInView ? { pathLength: 1 } : {}}
              transition={{ delay: 1.6, duration: 1 }}
            />
            <motion.line
              x1="65%" y1="55%"
              x2="50%" y2="70%"
              className="constellation-line"
              initial={{ pathLength: 0 }}
              animate={isInView ? { pathLength: 1 } : {}}
              transition={{ delay: 1.8, duration: 1 }}
            />
            <motion.line
              x1="50%" y1="35%"
              x2="50%" y2="70%"
              className="constellation-line"
              initial={{ pathLength: 0 }}
              animate={isInView ? { pathLength: 1 } : {}}
              transition={{ delay: 2, duration: 1 }}
            />
          </svg>

          {/* Stars */}
          {stars.map((star, index) => (
            <motion.div
              key={star.id}
              initial={{ opacity: 0, scale: 0 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.5 + index * 0.1, duration: 0.5, type: "spring" }}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
              style={{ left: `${star.x}%`, top: `${star.y}%` }}
              onMouseEnter={() => setHoveredStar(star.id)}
              onMouseLeave={() => setHoveredStar(null)}
              onClick={() => setHoveredStar(hoveredStar === star.id ? null : star.id)}
            >
              {/* Star Glow */}
              <motion.div
                className={`absolute inset-0 rounded-full ${star.isVenue ? 'bg-gold/30' : 'bg-cream/20'}`}
                animate={star.isVenue ? {
                  scale: [1, 1.5, 1],
                  opacity: [0.3, 0.6, 0.3],
                } : {}}
                transition={{ duration: 2, repeat: Infinity }}
                style={{
                  width: star.isVenue ? 40 : 20,
                  height: star.isVenue ? 40 : 20,
                  marginLeft: star.isVenue ? -20 : -10,
                  marginTop: star.isVenue ? -20 : -10,
                }}
              />
              
              {/* Star */}
              <div 
                className={`relative rounded-full ${star.isVenue ? 'w-4 h-4 bg-gold pulse-glow' : 'w-2 h-2 bg-cream'}`}
              />

              {/* Label */}
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ 
                  opacity: hoveredStar === star.id ? 1 : 0,
                  y: hoveredStar === star.id ? 0 : 10,
                }}
                className="absolute top-full mt-2 left-1/2 -translate-x-1/2 whitespace-nowrap z-10"
              >
                <div className="bg-cream/95 px-3 py-2 rounded-lg shadow-elevated">
                  <p className="font-body text-xs text-sage-dark">{star.label}</p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Legend */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 2.5, duration: 0.8 }}
          className="flex items-center justify-center gap-8 mt-8"
        >
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-gold pulse-glow" />
            <span className="font-body text-xs text-cream/60">Wedding Venues</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-cream/80" />
            <span className="font-body text-xs text-cream/60">Special Places</span>
          </div>
        </motion.div>

        {/* Hint Text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 3, duration: 0.8 }}
          className="text-center mt-4 font-body text-cream/40 text-xs italic"
        >
          Tap on stars to reveal their meaning
        </motion.p>
      </div>
    </section>
  );
};

export default ConstellationSection;
