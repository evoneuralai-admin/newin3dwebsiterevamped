import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { TrademarkSymbol } from './In3DTypography';

interface In3DLoaderProps {
  onComplete?: () => void;
}

/**
 * In3D Loader Component
 * Branded loader that appears before the website is fully loaded
 * Matches In3D.ai branding (In3D.ai typography)
 */
export const In3DLoader: React.FC<In3DLoaderProps> = ({ onComplete }) => {
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    // Wait for critical assets to load
    const checkAssets = () => {
      if (document.readyState === 'complete') {
        // Small delay for smooth transition
        setTimeout(() => {
          setIsComplete(true);
          setTimeout(() => {
            onComplete?.();
          }, 500);
        }, 800);
      }
    };

    if (document.readyState === 'complete') {
      checkAssets();
    } else {
      window.addEventListener('load', checkAssets);
      return () => window.removeEventListener('load', checkAssets);
    }
  }, [onComplete]);

  if (isComplete) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: isComplete ? 0 : 1 }}
      transition={{ duration: 0.5 }}
      className="fixed inset-0 z-[9999] bg-black flex items-center justify-center"
    >
      <div className="flex flex-col items-center justify-center">
        {/* In3D.ai Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <h1
            className="text-white text-[6rem] tracking-[0.4rem] leading-none"
            style={{ fontFamily: 'Bricolage Grotesque, sans-serif' }}
          >
            <span className="text-foreground">In3D</span>
            <span className="text-primary">.ai</span>
            <TrademarkSymbol className="ml-2" />
          </h1>
        </motion.div>

        {/* Loading Spinner */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="relative w-16 h-16"
        >
          <div className="absolute inset-0 border-4 border-primary/30 rounded-full"></div>
          <motion.div
            className="absolute inset-0 border-4 border-transparent border-t-primary rounded-full"
            animate={{ rotate: 360 }}
            transition={{
              duration: 1,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        </motion.div>

        {/* Loading Text */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.4 }}
          className="mt-6 text-white/70 text-sm tracking-wider"
        >
          Loading...
        </motion.p>
      </div>
    </motion.div>
  );
};

export default In3DLoader;
