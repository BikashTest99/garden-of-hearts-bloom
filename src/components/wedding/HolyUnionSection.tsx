import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import floralFrame from '@/assets/floral-frame.png';

const HolyUnionSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 md:py-40 px-4 relative overflow-hidden bg-cream">
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-cream-warm/50 via-transparent to-cream-warm/50" />

      <div className="max-w-4xl mx-auto relative">
        {/* Floral Frame Background */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={isInView ? { opacity: 0.15, scale: 1 } : {}}
          transition={{ duration: 1.2 }}
          className="absolute inset-0 flex items-center justify-center pointer-events-none"
        >
          <img 
            src={floralFrame} 
            alt="" 
            className="w-full max-w-3xl h-auto breathing"
          />
        </motion.div>

        {/* Content */}
        <div className="relative z-10 text-center py-16">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="font-body text-sage/80 text-lg md:text-xl tracking-wide mb-8"
          >
            We invite you to the holy union of
          </motion.p>

          {/* Names with Shimmer */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.5, duration: 1 }}
            className="relative"
          >
            <h2 className="font-display text-5xl md:text-7xl lg:text-8xl text-sage-dark leading-tight">
              Salmon
            </h2>
            <motion.div
              className="my-6 flex items-center justify-center gap-4"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <div className="w-12 h-px bg-gold" />
              <span className="text-gold text-3xl font-display">&</span>
              <div className="w-12 h-px bg-gold" />
            </motion.div>
            <h2 className="font-display text-5xl md:text-7xl lg:text-8xl text-sage-dark leading-tight">
              Dr. Silpina
            </h2>

            {/* Shimmer Effect */}
            <motion.div
              className="absolute inset-0 shimmer pointer-events-none"
              style={{ mixBlendMode: 'overlay' }}
            />
          </motion.div>

          {/* Decorative Elements */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="mt-12 flex items-center justify-center gap-2"
          >
            <FlowerIcon className="w-6 h-6 text-sage/40 gentle-sway" />
            <span className="text-sage/60 font-body italic">in holy matrimony</span>
            <FlowerIcon className="w-6 h-6 text-sage/40 gentle-sway animation-delay-200" />
          </motion.div>

          {/* Golden Glow */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 0.2 } : {}}
            transition={{ delay: 1, duration: 1 }}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full pointer-events-none"
            style={{
              background: 'radial-gradient(circle, hsl(var(--gold) / 0.3) 0%, transparent 70%)',
            }}
          />
        </div>
      </div>

      {/* Bottom Decorative Border */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent"
      />
    </section>
  );
};

const FlowerIcon = ({ className }: { className?: string }) => (
  <svg viewBox="0 0 24 24" className={className} fill="currentColor">
    <path d="M12 2C10.9 2 10 2.9 10 4C10 5.1 10.9 6 12 6C13.1 6 14 5.1 14 4C14 2.9 13.1 2 12 2ZM6 8C4.9 8 4 8.9 4 10C4 11.1 4.9 12 6 12C7.1 12 8 11.1 8 10C8 8.9 7.1 8 6 8ZM18 8C16.9 8 16 8.9 16 10C16 11.1 16.9 12 18 12C19.1 12 20 11.1 20 10C20 8.9 19.1 8 18 8ZM12 10C10.34 10 9 11.34 9 13C9 14.66 10.34 16 12 16C13.66 16 15 14.66 15 13C15 11.34 13.66 10 12 10ZM6 14C4.9 14 4 14.9 4 16C4 17.1 4.9 18 6 18C7.1 18 8 17.1 8 16C8 14.9 7.1 14 6 14ZM18 14C16.9 14 16 14.9 16 16C16 17.1 16.9 18 18 18C19.1 18 20 17.1 20 16C20 14.9 19.1 14 18 14ZM12 18C10.9 18 10 18.9 10 20C10 21.1 10.9 22 12 22C13.1 22 14 21.1 14 20C14 18.9 13.1 18 12 18Z"/>
  </svg>
);

export default HolyUnionSection;
