import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Phone, Heart } from 'lucide-react';

const RSVPSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  
  const phoneNumber = "9814124480";
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
              href={`tel:${phoneNumber}`}
              className="btn-wedding flex items-center justify-center gap-3 py-4"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Phone className="w-5 h-5" />
              <span>Call Now</span>
            </motion.a>

            {/* WhatsApp Button */}
            <motion.a
              href={`https://wa.me/977${phoneNumber}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold flex items-center justify-center gap-3 py-4"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
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
