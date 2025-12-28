import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Share2, Copy, Check, Heart, QrCode, MapPin } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { QRCodeSVG } from 'qrcode.react';
const Footer = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-50px"
  });
  const {
    toast
  } = useToast();
  const [copied, setCopied] = useState(false);
  const [showQR, setShowQR] = useState(false);
  const websiteUrl = window.location.href;
  const shareMessage = "You're invited to Salmon & Dr. Silpina's wedding! 💒✨";

  // Venue location for QR code
  const venueLocation = "https://maps.google.com/?q=R.C.+Complex+Lamachaur+Pokhara+Nepal";
  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(websiteUrl);
      setCopied(true);
      toast({
        title: "Link copied!",
        description: "Share the invitation with your loved ones."
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please copy the link manually.",
        variant: "destructive"
      });
    }
  };
  const shareWhatsApp = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(shareMessage + " " + websiteUrl)}`, '_blank');
  };
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

        {/* Share Section */}
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={isInView ? {
        opacity: 1,
        y: 0
      } : {}} transition={{
        delay: 0.5,
        duration: 0.8
      }} className="mb-12">
          <div className="flex items-center justify-center gap-2 mb-6 text-cream/70">
            <Share2 className="w-4 h-4" />
            <span className="font-body text-sm uppercase tracking-widest">Share this invitation</span>
          </div>

          <div className="flex items-center justify-center gap-4">
            {/* WhatsApp */}
            <motion.button onClick={shareWhatsApp} className="w-12 h-12 rounded-full bg-cream/10 flex items-center justify-center text-cream hover:bg-cream/20 hover:text-gold transition-colors" whileHover={{
            scale: 1.1
          }} whileTap={{
            scale: 0.9
          }} aria-label="Share on WhatsApp">
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
            </motion.button>

            {/* Copy Link */}
            <motion.button onClick={copyLink} className="w-12 h-12 rounded-full bg-cream/10 flex items-center justify-center text-cream hover:bg-cream/20 hover:text-gold transition-colors" whileHover={{
            scale: 1.1
          }} whileTap={{
            scale: 0.9
          }} aria-label="Copy link">
              {copied ? <Check className="w-5 h-5 text-gold" /> : <Copy className="w-5 h-5" />}
            </motion.button>
          </div>
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