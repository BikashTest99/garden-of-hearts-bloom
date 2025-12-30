import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import story1 from '@/assets/story/story-1.png';
import story2 from '@/assets/story/story-2.png';
import story3 from '@/assets/story/story-3.png';
import story4 from '@/assets/story/story-4.png';
import story5 from '@/assets/story/story-5.png';

const storyFrames = [
  { image: story1, title: "First Dance", subtitle: "Where our hearts met" },
  { image: story2, title: "Growing Together", subtitle: "In each other's embrace" },
  { image: story3, title: "The Promise", subtitle: "A moment frozen in time" },
  { image: story4, title: "Dancing Through Life", subtitle: "Our love in motion" },
  { image: story5, title: "Forever Yours", subtitle: "Together, always" },
];

const StorySection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <section ref={containerRef} className="relative h-[500vh] bg-gradient-to-b from-wedding-cream via-wedding-blush/20 to-wedding-cream">
      {/* Sticky container for the "video" effect */}
      <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden">
        {/* Background decorative elements */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-wedding-sage/30 blur-3xl" />
          <div className="absolute bottom-20 right-10 w-40 h-40 rounded-full bg-wedding-rose/30 blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-wedding-gold/20 blur-3xl" />
        </div>

        {/* Frame container */}
        <div className="relative w-full max-w-lg mx-auto px-4">
          {/* Decorative frame */}
          <div className="absolute inset-0 -m-8 border-2 border-wedding-gold/30 rounded-full" 
               style={{ borderRadius: '50% 50% 50% 50% / 60% 60% 40% 40%' }} />
          
          {/* Story frames */}
          <div className="relative aspect-square flex items-center justify-center">
            {storyFrames.map((frame, index) => {
              const frameStart = index / storyFrames.length;
              const frameEnd = (index + 1) / storyFrames.length;
              const frameMid = (frameStart + frameEnd) / 2;

              return (
                <StoryFrame
                  key={index}
                  frame={frame}
                  progress={scrollYProgress}
                  frameStart={frameStart}
                  frameEnd={frameEnd}
                  frameMid={frameMid}
                  index={index}
                />
              );
            })}
          </div>

          {/* Progress indicator */}
          <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 flex gap-2">
            {storyFrames.map((_, index) => {
              const frameStart = index / storyFrames.length;
              const frameEnd = (index + 1) / storyFrames.length;
              
              return (
                <ProgressDot
                  key={index}
                  progress={scrollYProgress}
                  frameStart={frameStart}
                  frameEnd={frameEnd}
                />
              );
            })}
          </div>
        </div>

        {/* Section title */}
        <motion.div 
          className="absolute top-12 left-1/2 -translate-x-1/2 text-center"
          style={{ opacity: useTransform(scrollYProgress, [0, 0.1], [1, 0.3]) }}
        >
          <p className="text-wedding-sage uppercase tracking-[0.3em] text-sm mb-2">Our Journey</p>
          <h2 className="font-display text-3xl md:text-4xl text-wedding-rose">A Love Story</h2>
        </motion.div>

        {/* Scroll hint */}
        <motion.div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-center"
          style={{ opacity: useTransform(scrollYProgress, [0, 0.1], [1, 0]) }}
        >
          <p className="text-muted-foreground text-sm mb-2">Scroll to reveal our story</p>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 border-2 border-wedding-gold/50 rounded-full mx-auto flex justify-center pt-2"
          >
            <div className="w-1.5 h-3 bg-wedding-gold/60 rounded-full" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

interface StoryFrameProps {
  frame: { image: string; title: string; subtitle: string };
  progress: any;
  frameStart: number;
  frameEnd: number;
  frameMid: number;
  index: number;
}

const StoryFrame = ({ frame, progress, frameStart, frameEnd, frameMid, index }: StoryFrameProps) => {
  const opacity = useTransform(
    progress,
    [frameStart, frameStart + 0.05, frameMid, frameEnd - 0.05, frameEnd],
    [0, 1, 1, 1, 0]
  );

  const scale = useTransform(
    progress,
    [frameStart, frameStart + 0.08, frameMid, frameEnd - 0.08, frameEnd],
    [0.8, 1, 1, 1, 0.8]
  );

  const y = useTransform(
    progress,
    [frameStart, frameStart + 0.05, frameEnd - 0.05, frameEnd],
    [50, 0, 0, -50]
  );

  const textOpacity = useTransform(
    progress,
    [frameStart + 0.08, frameStart + 0.15, frameEnd - 0.15, frameEnd - 0.08],
    [0, 1, 1, 0]
  );

  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center"
      style={{ opacity, scale, y }}
    >
      {/* Image */}
      <div className="relative w-64 h-64 md:w-80 md:h-80">
        <img
          src={frame.image}
          alt={frame.title}
          className="w-full h-full object-contain drop-shadow-lg"
        />
        
        {/* Decorative ring around image */}
        <motion.div
          className="absolute inset-0 -m-4 border border-wedding-gold/40 rounded-full"
          animate={{ rotate: 360 }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Text */}
      <motion.div 
        className="text-center mt-8"
        style={{ opacity: textOpacity }}
      >
        <h3 className="font-display text-2xl md:text-3xl text-wedding-rose mb-2">
          {frame.title}
        </h3>
        <p className="text-muted-foreground italic">
          {frame.subtitle}
        </p>
      </motion.div>

      {/* Frame number */}
      <motion.span 
        className="absolute top-4 right-4 text-wedding-gold/50 font-display text-4xl"
        style={{ opacity: textOpacity }}
      >
        {String(index + 1).padStart(2, '0')}
      </motion.span>
    </motion.div>
  );
};

interface ProgressDotProps {
  progress: any;
  frameStart: number;
  frameEnd: number;
}

const ProgressDot = ({ progress, frameStart, frameEnd }: ProgressDotProps) => {
  const isActive = useTransform(
    progress,
    [frameStart, frameStart + 0.01, frameEnd - 0.01, frameEnd],
    [0, 1, 1, 0]
  );

  const scale = useTransform(isActive, [0, 1], [1, 1.5]);
  const backgroundColor = useTransform(
    isActive,
    [0, 1],
    ['hsl(var(--wedding-gold) / 0.3)', 'hsl(var(--wedding-gold))']
  );

  return (
    <motion.div
      className="w-2 h-2 rounded-full"
      style={{ scale, backgroundColor }}
    />
  );
};

export default StorySection;
