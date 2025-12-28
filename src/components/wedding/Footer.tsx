import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Share2, MessageCircle, Facebook, Copy, Check, Heart } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const Footer = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  const websiteUrl = window.location.href;
  const shareMessage = "You're invited to Salmon & Dr. Silpina's wedding! 💒✨";

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(websiteUrl);
      setCopied(true);
      toast({
        title: "Link copied!",
        description: "Share the invitation with your loved ones.",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please copy the link manually.",
        variant: "destructive",
      });
    }
  };

  const shareWhatsApp = () => {
    window.open(`https://wa.me/?text=${encodeURIComponent(shareMessage + " " + websiteUrl)}`, '_blank');
  };

  const shareFacebook = () => {
    window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(websiteUrl)}`, '_blank');
  };

  return (
    <footer ref={ref} className="py-16 md:py-24 px-4 relative overflow-hidden bg-sage-dark">
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
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-12"
        >
          <motion.div
            className="mb-6"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
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
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="w-48 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent mx-auto mb-12"
        />

        {/* Share Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mb-12"
        >
          <div className="flex items-center justify-center gap-2 mb-6 text-cream/70">
            <Share2 className="w-4 h-4" />
            <span className="font-body text-sm uppercase tracking-widest">Share this invitation</span>
          </div>

          <div className="flex items-center justify-center gap-4">
            {/* WhatsApp */}
            <motion.button
              onClick={shareWhatsApp}
              className="w-12 h-12 rounded-full bg-cream/10 flex items-center justify-center text-cream hover:bg-cream/20 hover:text-gold transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Share on WhatsApp"
            >
              <MessageCircle className="w-5 h-5" />
            </motion.button>

            {/* Facebook */}
            <motion.button
              onClick={shareFacebook}
              className="w-12 h-12 rounded-full bg-cream/10 flex items-center justify-center text-cream hover:bg-cream/20 hover:text-gold transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Share on Facebook"
            >
              <Facebook className="w-5 h-5" />
            </motion.button>

            {/* Copy Link */}
            <motion.button
              onClick={copyLink}
              className="w-12 h-12 rounded-full bg-cream/10 flex items-center justify-center text-cream hover:bg-cream/20 hover:text-gold transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              aria-label="Copy link"
            >
              {copied ? (
                <Check className="w-5 h-5 text-gold" />
              ) : (
                <Copy className="w-5 h-5" />
              )}
            </motion.button>
          </div>
        </motion.div>

        {/* Footer Credits */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="pt-8 border-t border-cream/10"
        >
          <p className="font-body text-cream/40 text-xs">
            February 7, 2025 • Pokhara, Nepal
          </p>
          <p className="font-body text-cream/30 text-xs mt-2">
            Made with ♥ for a beautiful celebration
          </p>
        </motion.div>

        {/* Initials with Heartbeat */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-8"
        >
          <motion.div
            className="inline-block font-display text-4xl text-gold/30"
            animate={{ scale: [1, 1.05, 1, 1.05, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            S & S
          </motion.div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
