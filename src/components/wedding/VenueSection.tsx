import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';
import { Church, PartyPopper, Clock, MapPin, Calendar, Navigation } from 'lucide-react';

const VenueSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const venues = [
    {
      icon: Church,
      type: "Wedding Ceremony",
      name: "Pokhara Community Church",
      date: "February 5, 2026",
      time: "11:00 AM",
      address: "Pokhara, Nepal",
      mapUrl: "https://maps.google.com/?q=Pokhara+Community+Church+Nepal",
    },
    {
      icon: PartyPopper,
      type: "Reception",
      name: "R.C. Complex",
      date: "February 7, 2026",
      time: "4:00 PM onwards",
      address: "Lamachaur, Pokhara",
      mapUrl: "https://maps.google.com/?q=Lamachaur+Pokhara+Nepal",
    },
  ];

  return (
    <section ref={ref} className="py-24 md:py-32 px-4 relative overflow-hidden bg-sage/5">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <svg width="100%" height="100%">
          <pattern id="leaves" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
            <path d="M30 0 Q45 15 30 30 Q15 15 30 0" fill="currentColor" className="text-sage" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#leaves)" />
        </svg>
      </div>

      <div className="max-w-5xl mx-auto relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-5xl text-sage-dark mb-4">
            Celebration Details
          </h2>
          <p className="font-body text-sage/70 max-w-lg mx-auto">
            Join us as we celebrate our union in the beautiful city of Pokhara
          </p>
        </motion.div>

        {/* Venue Cards */}
        <div className="grid md:grid-cols-2 gap-8 md:gap-12">
          {venues.map((venue, index) => (
            <motion.div
              key={venue.type}
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + index * 0.2, duration: 0.8 }}
              className="group"
            >
              <div className="watercolor-border bg-cream/90 p-8 md:p-10 backdrop-blur-sm hover:shadow-elevated transition-shadow duration-500">
                {/* Icon */}
                <div className="mb-6 flex justify-center">
                  <div className="p-4 rounded-full bg-sage/10 group-hover:bg-sage/20 transition-colors duration-300">
                    <venue.icon className="w-8 h-8 text-sage" />
                  </div>
                </div>

                {/* Type */}
                <p className="font-body text-gold text-sm uppercase tracking-[0.2em] text-center mb-2">
                  {venue.type}
                </p>

                {/* Name */}
                <h3 className="font-display text-2xl md:text-3xl text-sage-dark text-center mb-6">
                  {venue.name}
                </h3>

                {/* Divider */}
                <div className="w-24 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent mx-auto mb-6" />

                {/* Details */}
                <div className="space-y-4">
                  <div className="flex items-center justify-center gap-3 text-sage-dark/80">
                    <Calendar className="w-4 h-4 text-gold" />
                    <span className="font-body">{venue.date}</span>
                  </div>
                  <div className="flex items-center justify-center gap-3 text-sage-dark/80">
                    <Clock className="w-4 h-4 text-gold" />
                    <span className="font-body">{venue.time}</span>
                  </div>
                  <div className="flex items-center justify-center gap-3 text-sage-dark/80">
                    <MapPin className="w-4 h-4 text-gold" />
                    <span className="font-body">{venue.address}</span>
                  </div>
                </div>

                {/* Get Directions Button */}
                <motion.a
                  href={venue.mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-8 flex items-center justify-center gap-2 btn-wedding w-full"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <Navigation className="w-4 h-4" />
                  <span>Get Directions</span>
                </motion.a>
              </div>

              {/* Decorative Lantern */}
              <motion.div
                className="hidden md:block absolute -top-6 left-1/2 -translate-x-1/2"
                animate={{ y: [0, -5, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              >
                <svg width="24" height="40" viewBox="0 0 24 40" className="text-gold/60">
                  <rect x="8" y="0" width="8" height="4" fill="currentColor" />
                  <line x1="12" y1="4" x2="12" y2="10" stroke="currentColor" strokeWidth="1" />
                  <ellipse cx="12" cy="25" rx="10" ry="15" fill="none" stroke="currentColor" strokeWidth="1" />
                  <ellipse cx="12" cy="25" rx="6" ry="10" fill="currentColor" opacity="0.3" />
                </svg>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Dress Code Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="text-center mt-12"
        >
          <p className="font-body text-sage/60 italic">
            Dress Code: Formal / Traditional attire welcome
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default VenueSection;
