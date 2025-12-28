import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState, useEffect } from 'react';
import { Calendar } from 'lucide-react';

interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

const CountdownSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const weddingDate = new Date('2025-02-07T16:00:00');
  
  const calculateTimeLeft = (): TimeLeft => {
    const difference = +weddingDate - +new Date();
    
    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  };

  const [timeLeft, setTimeLeft] = useState<TimeLeft>(calculateTimeLeft());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const addToCalendar = () => {
    const title = "Salmon & Dr. Silpina's Wedding Reception";
    const details = "Join us for the wedding reception of Salmon and Dr. Silpina at R.C. Complex, Lamachaur, Pokhara.";
    const location = "R.C. Complex, Lamachaur, Pokhara, Nepal";
    const startDate = "20250207T160000";
    const endDate = "20250207T220000";
    
    const googleCalendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&details=${encodeURIComponent(details)}&location=${encodeURIComponent(location)}&dates=${startDate}/${endDate}`;
    
    window.open(googleCalendarUrl, '_blank');
  };

  const timeUnits = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ];

  return (
    <section ref={ref} className="py-24 md:py-32 px-4 relative overflow-hidden bg-cream">
      {/* Golden Glow Background */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div 
          className="w-[600px] h-[600px] rounded-full opacity-20"
          style={{
            background: 'radial-gradient(circle, hsl(var(--gold) / 0.4) 0%, transparent 60%)',
          }}
        />
      </div>

      {/* Floating Flowers */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute pointer-events-none"
          style={{
            left: `${10 + (i * 12)}%`,
            top: `${10 + (i % 4) * 25}%`,
          }}
          animate={{
            y: [0, -15, 0],
            opacity: [0.2, 0.4, 0.2],
          }}
          transition={{
            duration: 5 + i,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <svg width="20" height="20" viewBox="0 0 20 20" className="text-sage/30">
            <circle cx="10" cy="10" r="6" fill="currentColor" />
          </svg>
        </motion.div>
      ))}

      <div className="max-w-4xl mx-auto relative text-center">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <h2 className="font-display text-3xl md:text-5xl text-sage-dark mb-4">
            Days Until Forever
          </h2>
          <p className="font-body text-sage/70">
            The moment two hearts become one
          </p>
        </motion.div>

        {/* Countdown Timer */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 mb-12"
        >
          {timeUnits.map((unit, index) => (
            <motion.div
              key={unit.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
              className="relative"
            >
              <div className="watercolor-border bg-cream-warm/80 p-6 md:p-8 backdrop-blur-sm">
                <motion.span
                  key={unit.value}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="countdown-number block"
                >
                  {unit.value.toString().padStart(2, '0')}
                </motion.span>
                <span className="font-body text-sage/70 text-sm md:text-base uppercase tracking-widest">
                  {unit.label}
                </span>
              </div>

              {/* Separator Dots (not on last item) */}
              {index < 3 && (
                <div className="hidden md:flex absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 flex-col gap-2">
                  <span className="w-2 h-2 rounded-full bg-gold/50" />
                  <span className="w-2 h-2 rounded-full bg-gold/50" />
                </div>
              )}
            </motion.div>
          ))}
        </motion.div>

        {/* Save the Date Button */}
        <motion.button
          onClick={addToCalendar}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="btn-gold inline-flex items-center gap-3 text-lg"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Calendar className="w-5 h-5" />
          Save the Date
        </motion.button>

        {/* Decorative Quote */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-12 font-display text-lg md:text-xl text-sage/60 italic max-w-lg mx-auto"
        >
          "Two hearts, two families, one beautiful journey"
        </motion.p>
      </div>
    </section>
  );
};

export default CountdownSection;
