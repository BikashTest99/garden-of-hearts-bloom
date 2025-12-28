import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Phone, MessageCircle, Heart } from 'lucide-react';

const RSVPSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  // Replace with actual phone number
  const phoneNumber = "+977-9800000000";
  const whatsappMessage = encodeURIComponent(
    "Hello! I would like to confirm my attendance for Salmon & Dr. Silpina's wedding.\n\nName: \nNumber of guests: "
  );

  return (
    <section ref={ref} className="py-24 md:py-32 px-4 relative overflow-hidden bg-sage/10">
      {/* Decorative Background */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-64 h-64 bg-sage/5 rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-gold/5 rounded-full translate-x-1/2 translate-y-1/2" />
      </div>

      <div className="max-w-3xl mx-auto relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="font-display text-3xl md:text-5xl text-sage-dark mb-4">
            Will You Join Us?
          </h2>
          <p className="font-body text-sage/70 max-w-lg mx-auto">
            Please confirm your attendance so we can prepare to celebrate with you
          </p>
        </motion.div>

        {/* Main RSVP Card */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="watercolor-border bg-cream/95 p-8 md:p-12 backdrop-blur-sm text-center"
        >
          {/* Heart Icon */}
          <motion.div
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="mb-8"
          >
            <div className="inline-block p-4 rounded-full bg-sage/10">
              <Heart className="w-10 h-10 text-gold fill-gold/20" />
            </div>
          </motion.div>

          {/* RSVP Text */}
          <p className="font-body text-sage-dark/70 text-lg mb-6">
            Please confirm your attendance via
          </p>

          {/* Phone Number Display */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.5, duration: 0.5 }}
            className="mb-8"
          >
            <p className="font-display text-3xl md:text-4xl text-sage-dark tracking-wide pulse-glow inline-block px-6 py-3 rounded-full bg-cream-warm border border-gold/30">
              {phoneNumber}
            </p>
          </motion.div>

          {/* Decorative Divider */}
          <div className="flex items-center justify-center gap-4 my-8">
            <div className="w-16 h-px bg-gradient-to-r from-transparent to-gold/50" />
            <span className="text-gold">✦</span>
            <div className="w-16 h-px bg-gradient-to-l from-transparent to-gold/50" />
          </div>

          {/* Action Buttons */}
          <div className="grid sm:grid-cols-2 gap-4 max-w-md mx-auto">
            {/* Call Button */}
            <motion.a
              href={`tel:${phoneNumber.replace(/[^0-9+]/g, '')}`}
              className="btn-wedding flex items-center justify-center gap-3 py-4"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Phone className="w-5 h-5" />
              <span>Call Now</span>
            </motion.a>

            {/* WhatsApp Button */}
            <motion.a
              href={`https://wa.me/${phoneNumber.replace(/[^0-9]/g, '')}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold flex items-center justify-center gap-3 py-4"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <MessageCircle className="w-5 h-5" />
              <span>WhatsApp RSVP</span>
            </motion.a>
          </div>

          {/* Alternative Text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.8, duration: 0.8 }}
            className="mt-8 font-body text-sage/60 text-sm italic"
          >
            Or reach us via call/WhatsApp at the number above
          </motion.p>
        </motion.div>

        {/* Floating Floral Elements */}
        {[...Array(4)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute pointer-events-none"
            style={{
              left: i % 2 === 0 ? '5%' : '85%',
              top: `${25 + i * 20}%`,
            }}
            animate={{
              y: [0, -10, 0],
              rotate: [0, 5, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              delay: i * 0.5,
            }}
          >
            <svg width="40" height="40" viewBox="0 0 40 40" className="text-sage/20">
              <ellipse cx="20" cy="20" rx="15" ry="8" fill="currentColor" />
              <ellipse cx="20" cy="20" rx="8" ry="15" fill="currentColor" />
            </svg>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default RSVPSection;
