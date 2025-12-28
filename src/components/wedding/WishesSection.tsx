import { motion, AnimatePresence } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef, useState } from 'react';
import { Heart, Send, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

interface Wish {
  id: string;
  name: string;
  message: string;
  timestamp: number;
}

const WishesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const { toast } = useToast();
  
  const [wishes, setWishes] = useState<Wish[]>([
    { id: '1', name: 'The Anderson Family', message: 'Wishing you a lifetime of love and happiness!', timestamp: Date.now() - 86400000 },
    { id: '2', name: 'Uncle Prakash', message: 'May God bless your union abundantly!', timestamp: Date.now() - 172800000 },
    { id: '3', name: 'Priya & Raj', message: 'So happy for you both! Love always.', timestamp: Date.now() - 259200000 },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newWish, setNewWish] = useState({ name: '', message: '' });
  const [selectedWish, setSelectedWish] = useState<Wish | null>(null);

  const handleSubmitWish = () => {
    if (!newWish.name.trim() || !newWish.message.trim()) {
      toast({
        title: "Please fill in all fields",
        description: "Both name and message are required.",
        variant: "destructive",
      });
      return;
    }

    if (newWish.message.length > 100) {
      toast({
        title: "Message too long",
        description: "Please keep your wish under 100 characters.",
        variant: "destructive",
      });
      return;
    }

    const wish: Wish = {
      id: Date.now().toString(),
      name: newWish.name.trim(),
      message: newWish.message.trim(),
      timestamp: Date.now(),
    };

    setWishes(prev => [wish, ...prev]);
    setNewWish({ name: '', message: '' });
    setIsModalOpen(false);
    
    toast({
      title: "Wish sent! 🌿",
      description: "Your blessing has been added to the tree.",
    });
  };

  const treeLeafPositions = [
    { x: 15, y: 25, delay: 0 },
    { x: 75, y: 20, delay: 0.2 },
    { x: 25, y: 45, delay: 0.4 },
    { x: 70, y: 50, delay: 0.6 },
    { x: 50, y: 30, delay: 0.8 },
    { x: 40, y: 55, delay: 1 },
  ];

  return (
    <section ref={ref} className="py-24 md:py-32 px-4 relative overflow-hidden bg-cream-warm">
      {/* Background Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-cream via-cream-warm to-cream" />

      <div className="max-w-5xl mx-auto relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-3xl md:text-5xl text-sage-dark mb-4">
            Tree of Wishes
          </h2>
          <p className="font-body text-sage/70 max-w-lg mx-auto">
            Leave your blessings for the couple on our virtual wishing tree
          </p>
        </motion.div>

        {/* Wishing Tree Illustration */}
        <div className="relative h-[500px] md:h-[600px] flex items-center justify-center">
          {/* Tree SVG */}
          <motion.svg
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ duration: 1 }}
            viewBox="0 0 400 500"
            className="absolute w-full max-w-md h-auto tree-branch"
          >
            {/* Tree Trunk */}
            <path
              d="M180 500 Q190 400 185 350 Q175 300 200 250 Q185 200 200 150"
              stroke="hsl(var(--sage-dark))"
              strokeWidth="20"
              fill="none"
              strokeLinecap="round"
            />
            <path
              d="M220 500 Q210 400 215 350 Q225 300 200 250"
              stroke="hsl(var(--sage-dark))"
              strokeWidth="15"
              fill="none"
              strokeLinecap="round"
            />
            
            {/* Branches */}
            <g stroke="hsl(var(--sage))" strokeWidth="6" fill="none" strokeLinecap="round">
              <path d="M200 200 Q150 180 100 160" />
              <path d="M200 200 Q250 180 300 160" />
              <path d="M200 250 Q130 230 80 240" />
              <path d="M200 250 Q270 230 320 240" />
              <path d="M200 300 Q140 290 90 310" />
              <path d="M200 300 Q260 290 310 310" />
            </g>

            {/* Leaves */}
            {[...Array(20)].map((_, i) => (
              <ellipse
                key={i}
                cx={80 + (i % 5) * 60 + Math.random() * 20}
                cy={140 + Math.floor(i / 5) * 50 + Math.random() * 20}
                rx={12 + Math.random() * 8}
                ry={8 + Math.random() * 4}
                fill="hsl(var(--sage-light))"
                opacity={0.4 + Math.random() * 0.3}
                className="gentle-sway"
                style={{ animationDelay: `${i * 0.1}s` }}
              />
            ))}
          </motion.svg>

          {/* Wish Tags */}
          {wishes.slice(0, 6).map((wish, index) => {
            const pos = treeLeafPositions[index] || { x: 50, y: 40, delay: 0 };
            return (
              <motion.button
                key={wish.id}
                initial={{ opacity: 0, scale: 0, y: -20 }}
                animate={isInView ? { opacity: 1, scale: 1, y: 0 } : {}}
                transition={{ delay: 0.5 + pos.delay, duration: 0.5, type: "spring" }}
                onClick={() => setSelectedWish(wish)}
                className="absolute wish-tag cursor-pointer group"
                style={{
                  left: `${pos.x}%`,
                  top: `${pos.y}%`,
                }}
              >
                <div className="bg-cream border border-gold/30 rounded-lg px-3 py-2 shadow-soft hover:shadow-gold transition-shadow duration-300">
                  <div className="w-1 h-4 bg-gold/50 mx-auto -mt-6 mb-1" />
                  <p className="font-body text-xs text-sage-dark truncate max-w-[100px]">
                    {wish.name}
                  </p>
                  <Heart className="w-3 h-3 text-gold mx-auto mt-1 group-hover:scale-125 transition-transform" />
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Leave a Wish Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="flex justify-center mt-8"
        >
          <Button
            onClick={() => setIsModalOpen(true)}
            className="btn-gold text-lg px-10 py-6"
          >
            <Heart className="w-5 h-5 mr-2" />
            Leave a Wish
          </Button>
        </motion.div>

        {/* Wish Count */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1.4 }}
          className="text-center mt-4 font-body text-sage/60 text-sm"
        >
          {wishes.length} blessings on the tree
        </motion.p>
      </div>

      {/* Add Wish Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-sage-dark/50 backdrop-blur-sm"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="bg-cream rounded-2xl p-8 max-w-md w-full shadow-elevated watercolor-border"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-display text-2xl text-sage-dark">Leave Your Blessing</h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2 hover:bg-sage/10 rounded-full transition-colors"
                >
                  <X className="w-5 h-5 text-sage" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="font-body text-sm text-sage-dark/70 block mb-2">Your Name</label>
                  <Input
                    value={newWish.name}
                    onChange={(e) => setNewWish(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter your name"
                    className="bg-cream-warm border-sage/20 focus:border-gold"
                    maxLength={50}
                  />
                </div>
                <div>
                  <label className="font-body text-sm text-sage-dark/70 block mb-2">
                    Your Wish <span className="text-sage/50">({100 - newWish.message.length} characters left)</span>
                  </label>
                  <Textarea
                    value={newWish.message}
                    onChange={(e) => setNewWish(prev => ({ ...prev, message: e.target.value }))}
                    placeholder="Write your blessing for the couple..."
                    className="bg-cream-warm border-sage/20 focus:border-gold resize-none"
                    rows={3}
                    maxLength={100}
                  />
                </div>

                <Button
                  onClick={handleSubmitWish}
                  className="w-full btn-wedding"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Send Blessing
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* View Wish Modal */}
      <AnimatePresence>
        {selectedWish && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-sage-dark/50 backdrop-blur-sm"
            onClick={() => setSelectedWish(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="bg-cream rounded-2xl p-8 max-w-sm w-full shadow-elevated text-center"
              onClick={(e) => e.stopPropagation()}
            >
              <Heart className="w-8 h-8 text-gold mx-auto mb-4" />
              <h4 className="font-display text-xl text-sage-dark mb-2">{selectedWish.name}</h4>
              <p className="font-body text-sage/80 italic">"{selectedWish.message}"</p>
              <button
                onClick={() => setSelectedWish(null)}
                className="mt-6 text-sage/60 font-body text-sm hover:text-sage transition-colors"
              >
                Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default WishesSection;
