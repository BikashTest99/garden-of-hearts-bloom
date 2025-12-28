import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

const BlessingSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-24 md:py-32 px-4 relative overflow-hidden bg-cream-warm">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, hsl(var(--sage)) 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="max-w-5xl mx-auto relative">
        {/* Decorative Cross */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="inline-block p-4 rounded-full bg-cream border border-gold/30">
            <span className="text-gold text-4xl">✝</span>
          </div>
        </motion.div>

        {/* Section Title */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="font-display text-3xl md:text-4xl text-sage-dark text-center mb-4"
        >
          The Blessing
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="font-body text-sage/80 text-center mb-16 italic"
        >
          "Two families become one, as two hearts unite in love"
        </motion.p>

        {/* Parents Grid */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          {/* Groom's Parents */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="watercolor-border bg-cream/80 p-8 text-center backdrop-blur-sm"
          >
            <div className="mb-6">
              <span className="text-gold text-2xl">♦</span>
            </div>
            <p className="font-body text-sage-dark/60 text-sm uppercase tracking-widest mb-4">
              Son of
            </p>
            <h3 className="font-display text-xl md:text-2xl text-sage-dark mb-2">
              Mr. Rajendra Kumar Adhikari
            </h3>
            <p className="font-body text-sage italic">(Raju)</p>
            <div className="w-16 h-px bg-gold/40 mx-auto my-4" />
            <p className="font-body text-sage-dark/60 text-sm uppercase tracking-widest mb-4">
              &
            </p>
            <h3 className="font-display text-xl md:text-2xl text-sage-dark">
              Mrs. Sarala Adhikari
            </h3>
          </motion.div>

          {/* Elegant Divider - Mobile */}
          <div className="md:hidden flex items-center justify-center">
            <div className="w-px h-12 bg-gradient-to-b from-transparent via-gold to-transparent" />
          </div>

          {/* Bride's Parents */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="watercolor-border bg-cream/80 p-8 text-center backdrop-blur-sm"
          >
            <div className="mb-6">
              <span className="text-gold text-2xl">♦</span>
            </div>
            <p className="font-body text-sage-dark/60 text-sm uppercase tracking-widest mb-4">
              Daughter of
            </p>
            <h3 className="font-display text-xl md:text-2xl text-sage-dark mb-2">
              Dr. Dhakaram Budhamagar
            </h3>
            <div className="w-16 h-px bg-gold/40 mx-auto my-4" />
            <p className="font-body text-sage-dark/60 text-sm uppercase tracking-widest mb-4">
              &
            </p>
            <h3 className="font-display text-xl md:text-2xl text-sage-dark">
              Mrs. Nirmala Budhamagar
            </h3>
          </motion.div>
        </div>

        {/* Desktop Vertical Divider */}
        <div className="hidden md:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-px h-48 bg-gradient-to-b from-transparent via-gold/50 to-transparent pointer-events-none" style={{ top: '65%' }} />

        {/* Floating Petals */}
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-sage/10"
            style={{
              left: `${20 + i * 20}%`,
              top: `${30 + (i % 2) * 40}%`,
            }}
            animate={{
              y: [0, -20, 0],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          />
        ))}
      </div>
    </section>
  );
};

export default BlessingSection;
