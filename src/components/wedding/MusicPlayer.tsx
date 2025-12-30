import { motion, AnimatePresence } from 'framer-motion';
import { useState, useRef, useEffect } from 'react';
import { Pause, Play, Volume2, VolumeX, Music } from 'lucide-react';

const MusicPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const musicUrl = "/music/cant-help-falling-in-love.mp3";

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.3;
      audioRef.current.loop = true;
      
      // Try to autoplay immediately
      audioRef.current.play().then(() => {
        setIsPlaying(true);
        setHasInteracted(true);
      }).catch(() => {
        // Autoplay blocked, will try on first interaction
      });
    }
  }, []);

  // Fallback: Attempt autoplay on first user interaction with the page
  useEffect(() => {
    if (hasInteracted) return;

    const handleFirstInteraction = () => {
      if (!hasInteracted && audioRef.current) {
        setHasInteracted(true);
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch(() => {
          // Autoplay blocked, user needs to click play
        });
      }
    };

    // Listen for any user interaction
    document.addEventListener('click', handleFirstInteraction, { once: true });
    document.addEventListener('scroll', handleFirstInteraction, { once: true });
    document.addEventListener('touchstart', handleFirstInteraction, { once: true });

    return () => {
      document.removeEventListener('click', handleFirstInteraction);
      document.removeEventListener('scroll', handleFirstInteraction);
      document.removeEventListener('touchstart', handleFirstInteraction);
    };
  }, [hasInteracted]);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(() => {
          // Autoplay blocked by browser
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <>
      <audio ref={audioRef} src={musicUrl} preload="auto" />
      
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.5 }}
        className="fixed bottom-6 right-6 z-50"
      >
        {/* Main Button */}
        <motion.button
          onClick={() => setIsExpanded(!isExpanded)}
          className="relative w-14 h-14 rounded-full bg-sage shadow-elevated flex items-center justify-center text-cream hover:bg-sage-dark transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Music className="w-6 h-6" />
          
          {/* Music Visualizer Bars */}
          {isPlaying && !isMuted && (
            <div className="absolute -top-1 -right-1 flex items-end gap-0.5">
              {[...Array(3)].map((_, i) => (
                <motion.div
                  key={i}
                  className="w-1 bg-gold rounded-full music-bar"
                  style={{ animationDelay: `${i * 0.1}s` }}
                />
              ))}
            </div>
          )}
        </motion.button>

        {/* Expanded Controls */}
        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.8, y: 10 }}
              className="absolute bottom-16 right-0 bg-cream rounded-2xl shadow-elevated p-4 min-w-[220px] watercolor-border"
            >
              <p className="font-display text-sage-dark text-sm mb-3">Wedding Music</p>
              
              <div className="flex items-center gap-3">
                {/* Play/Pause */}
                <motion.button
                  onClick={togglePlay}
                  className="w-12 h-12 rounded-full bg-sage flex items-center justify-center text-cream hover:bg-sage-dark transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {isPlaying ? (
                    <Pause className="w-5 h-5" />
                  ) : (
                    <Play className="w-5 h-5 ml-0.5" />
                  )}
                </motion.button>

                {/* Volume Control */}
                <motion.button
                  onClick={toggleMute}
                  className="w-10 h-10 rounded-full bg-sage/20 flex items-center justify-center text-sage hover:bg-sage/30 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {isMuted ? (
                    <VolumeX className="w-5 h-5" />
                  ) : (
                    <Volume2 className="w-5 h-5" />
                  )}
                </motion.button>

                {/* Now Playing Text */}
                <div className="flex-1">
                  <p className="font-body text-xs text-sage/60">
                    {isPlaying ? 'Now Playing' : 'Paused'}
                  </p>
                  <p className="font-body text-xs text-sage truncate">
                    Can't Help Falling In Love
                  </p>
                </div>
              </div>

              {/* Waveform Visualization */}
              {isPlaying && !isMuted && (
                <div className="mt-3 flex items-center justify-center gap-1 h-6">
                  {[...Array(12)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="w-1 bg-gold/60 rounded-full"
                      animate={{
                        height: [4, 16, 8, 20, 4],
                      }}
                      transition={{
                        duration: 0.8,
                        repeat: Infinity,
                        delay: i * 0.05,
                        ease: "easeInOut",
                      }}
                    />
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
};

export default MusicPlayer;
