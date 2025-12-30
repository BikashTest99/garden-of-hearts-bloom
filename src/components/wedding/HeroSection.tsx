import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';
import heroWatercolor from '@/assets/hero-watercolor.jpg';

const HeroSection = () => {
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

      {/* Floating Petals */}
      {[...Array(6)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-4 h-4 rounded-full bg-sage/20 floating-petal"
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
