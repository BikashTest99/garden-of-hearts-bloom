import { motion } from 'framer-motion';
import { ChevronDown, Heart } from 'lucide-react';
import heroWatercolor from '@/assets/hero-watercolor.jpg';

// Floating heart component
const FloatingHeart = ({ delay, duration, left, size }: { delay: number; duration: number; left: string; size: number }) => (
  <motion.div
    className="absolute bottom-0 pointer-events-none"
    style={{ left }}
    initial={{ y: 0, opacity: 0 }}
    animate={{ 
      y: '-100vh',
      opacity: [0, 0.6, 0.6, 0]
    }}
    transition={{
      duration,
      delay,
      repeat: Infinity,
      ease: "linear",
    }}
  >
    <Heart 
      className="text-gold/40 fill-gold/20" 
      style={{ width: size, height: size }}
    />
  </motion.div>
);

// Falling rose petal component
const FallingPetal = ({ delay, duration, left, size, rotation }: { delay: number; duration: number; left: string; size: number; rotation: number }) => (
  <motion.div
    className="absolute top-0 pointer-events-none"
    style={{ left }}
    initial={{ y: -50, opacity: 0, rotate: 0 }}
    animate={{ 
      y: '100vh',
      opacity: [0, 0.7, 0.7, 0],
      rotate: rotation,
      x: [0, 30, -20, 40, 0],
    }}
    transition={{
      duration,
      delay,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  >
    <svg 
      viewBox="0 0 24 24" 
      style={{ width: size, height: size }}
      className="text-rose-300/60"
    >
      <path 
        d="M12 2C12 2 8 6 8 10C8 12 9.5 14 12 14C14.5 14 16 12 16 10C16 6 12 2 12 2Z" 
        fill="currentColor"
      />
      <path 
        d="M12 14C12 14 6 16 6 20C6 22 8 24 12 24C16 24 18 22 18 20C18 16 12 14 12 14Z" 
        fill="currentColor"
        opacity="0.7"
      />
    </svg>
  </motion.div>
);

const HeroSection = () => {
  // Generate random hearts
  const hearts = Array.from({ length: 15 }, (_, i) => ({
    id: i,
    delay: Math.random() * 8,
    duration: 8 + Math.random() * 6,
    left: `${5 + Math.random() * 90}%`,
    size: 12 + Math.random() * 20,
  }));

  // Generate random falling petals
  const petals = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    delay: Math.random() * 10,
    duration: 10 + Math.random() * 8,
    left: `${Math.random() * 100}%`,
    size: 14 + Math.random() * 18,
    rotation: 180 + Math.random() * 360,
  }));

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden watercolor-wash">
      {/* Background Image with Parallax */}
      <motion.div 
        className="absolute inset-0 z-0"
        initial={{ scale: 1.1 }}
        animate={{ scale: 1 }}
        transition={{ duration: 2, ease: "easeOut" }}
      >
        <img 
          src={heroWatercolor} 
          alt="Elegant watercolor floral arrangement" 
          className="w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-cream/80 via-cream/60 to-cream/90" />
      </motion.div>

      {/* Floating Hearts Rising Upward */}
      <div className="absolute inset-0 z-[1] overflow-hidden pointer-events-none">
        {hearts.map((heart) => (
          <FloatingHeart
            key={heart.id}
            delay={heart.delay}
            duration={heart.duration}
            left={heart.left}
            size={heart.size}
          />
        ))}
      </div>

      {/* Falling Rose Petals */}
      <div className="absolute inset-0 z-[1] overflow-hidden pointer-events-none">
        {petals.map((petal) => (
          <FallingPetal
            key={petal.id}
            delay={petal.delay}
            duration={petal.duration}
            left={petal.left}
            size={petal.size}
            rotation={petal.rotation}
          />
        ))}
      </div>

      {/* Floating Petals */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-4 h-4 rounded-full bg-sage/20 floating-petal z-[1]"
          style={{
            left: `${15 + i * 15}%`,
            top: `${20 + (i % 3) * 25}%`,
            animationDelay: `${i * 0.5}s`,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.7 }}
          transition={{ delay: 1.5 + i * 0.2 }}
        />
      ))}

      {/* Main Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        {/* Decorative Cross */}
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mb-8"
        >
          <span className="text-gold text-3xl">✝</span>
        </motion.div>

        {/* Pre-title */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="font-body text-sage-dark/70 tracking-[0.3em] uppercase text-sm mb-6"
        >
          Together with their families
        </motion.p>

        {/* Couple Names */}
        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 1, duration: 1, ease: "easeOut" }}
          className="font-display text-5xl md:text-7xl lg:text-8xl text-sage-dark mb-4 breathing"
        >
          <span className="block">Salmon</span>
          <motion.span 
            className="text-gold text-3xl md:text-4xl inline-block my-4"
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            &
          </motion.span>
          <span className="block">Dr. Silpina</span>
        </motion.h1>

        {/* Decorative Line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="w-48 h-px bg-gradient-to-r from-transparent via-gold to-transparent mx-auto my-8"
        />

        {/* Date */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.8 }}
          className="font-display text-2xl md:text-3xl text-sage italic"
        >
          February 7, 2026
        </motion.p>

        {/* Location hint */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2, duration: 0.8 }}
          className="font-body text-sage-dark/60 mt-4 tracking-wide"
        >
          Pokhara, Nepal
        </motion.p>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 scroll-indicator"
      >
        <div className="flex flex-col items-center gap-2 text-sage/60">
          <span className="text-xs font-body tracking-widest uppercase">Scroll</span>
          <ChevronDown className="w-5 h-5" />
        </div>
      </motion.div>

      {/* Corner Florals */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 0.6, x: 0 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute top-0 left-0 w-32 h-32 md:w-48 md:h-48 pointer-events-none"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full text-sage/30">
          <path d="M0,0 Q50,20 30,50 Q10,80 0,100" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <circle cx="20" cy="30" r="8" fill="currentColor" opacity="0.3" />
          <circle cx="35" cy="15" r="5" fill="currentColor" opacity="0.2" />
        </svg>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 0.6, x: 0 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute bottom-0 right-0 w-32 h-32 md:w-48 md:h-48 pointer-events-none rotate-180"
      >
        <svg viewBox="0 0 100 100" className="w-full h-full text-sage/30">
          <path d="M0,0 Q50,20 30,50 Q10,80 0,100" fill="none" stroke="currentColor" strokeWidth="0.5" />
          <circle cx="20" cy="30" r="8" fill="currentColor" opacity="0.3" />
          <circle cx="35" cy="15" r="5" fill="currentColor" opacity="0.2" />
        </svg>
      </motion.div>
    </section>
  );
};

export default HeroSection;
