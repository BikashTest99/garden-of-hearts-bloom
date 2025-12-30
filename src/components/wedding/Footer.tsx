import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Heart, QrCode, MapPin } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

const Footer = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-50px"
  });
  const [showQR, setShowQR] = useState(false);

  // Venue location for QR code
  const venueLocation = "https://maps.google.com/?q=R.C.+Complex+Lamachaur+Pokhara+Nepal";
  return <footer ref={ref} className="py-16 md:py-24 px-4 relative overflow-hidden bg-sage-dark">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg width="100%" height="100%">
          <pattern id="footer-leaves" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
            <circle cx="40" cy="40" r="2" fill="currentColor" className="text-cream" />
          </pattern>
          <rect width="100%" height="100%" fill="url(#footer-leaves)" />
        </svg>
      </div>

      <div className="max-w-3xl mx-auto relative text-center">
        {/* Main Message */}
        <motion.div initial={{
        opacity: 0,
        y: 30
      }} animate={isInView ? {
        opacity: 1,
        y: 0
      } : {}} transition={{
        duration: 0.8
      }} className="mb-12">
          <motion.div className="mb-6" animate={{
          scale: [1, 1.1, 1]
        }} transition={{
          duration: 2,
          repeat: Infinity
        }}>
            <Heart className="w-10 h-10 text-gold mx-auto fill-gold/30" />
          </motion.div>
          
          <h3 className="font-display text-2xl md:text-3xl text-cream mb-4">
            With love and gratitude
          </h3>
          <p className="font-display text-3xl md:text-4xl text-gold">
            Salmon & Silpina
          </p>
        </motion.div>

        {/* Decorative Divider */}
        <motion.div initial={{
        scaleX: 0
      }} animate={isInView ? {
        scaleX: 1
      } : {}} transition={{
        delay: 0.3,
        duration: 0.8
      }} className="w-48 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent mx-auto mb-12" />

        {/* QR Code Section */}
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={isInView ? {
        opacity: 1,
        y: 0
      } : {}} transition={{
        delay: 0.4,
        duration: 0.8
      }} className="mb-12">
          <motion.button onClick={() => setShowQR(!showQR)} className="inline-flex items-center gap-2 text-cream/70 hover:text-gold transition-colors mb-4" whileHover={{
          scale: 1.05
        }} whileTap={{
          scale: 0.95
        }}>
            <QrCode className="w-5 h-5" />
            <span className="font-body text-sm uppercase tracking-widest">
              {showQR ? 'Hide' : 'Show'} Location QR Code
            </span>
          </motion.button>

          {showQR && <motion.div initial={{
          opacity: 0,
          scale: 0.8
        }} animate={{
          opacity: 1,
          scale: 1
        }} exit={{
          opacity: 0,
          scale: 0.8
        }} className="bg-cream p-4 rounded-2xl inline-block mb-4">
              <QRCodeSVG value={venueLocation} size={150} bgColor="hsl(36, 33%, 91%)" fgColor="hsl(78, 17%, 35%)" level="M" />
              <p className="font-body text-sage text-xs mt-2 flex items-center justify-center gap-1">
                <MapPin className="w-3 h-3" />
                Scan to get directions
              </p>
            </motion.div>}
        </motion.div>


        {/* Footer Credits */}
        <motion.div initial={{
        opacity: 0
      }} animate={isInView ? {
        opacity: 1
      } : {}} transition={{
        delay: 0.7,
        duration: 0.8
      }} className="pt-8 border-t border-cream/10">
          
          <p className="font-body text-cream/30 text-xs mt-2">
            Made with ♥ for a beautiful celebration
          </p>
        </motion.div>

        {/* Initials with Heartbeat */}
        <motion.div initial={{
        opacity: 0
      }} animate={isInView ? {
        opacity: 1
      } : {}} transition={{
        delay: 1,
        duration: 0.8
      }} className="mt-8">
          <motion.div className="inline-block font-display text-4xl text-gold/30" animate={{
          scale: [1, 1.05, 1, 1.05, 1]
        }} transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}>
            S & S
          </motion.div>
        </motion.div>
      </div>
    </footer>;
};
export default Footer;