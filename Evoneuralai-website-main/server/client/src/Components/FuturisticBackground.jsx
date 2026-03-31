import React from 'react';
import { motion } from 'framer-motion';

// Elegant floating shape component matching the Landing page style
const ElegantShape = ({
  className = '',
  delay = 0,
  width = 400,
  height = 100,
  rotate = 0,
  gradient = 'from-primary/15',
}) => {
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: -150,
        rotate: rotate - 15,
      }}
      animate={{
        opacity: 1,
        y: 0,
        rotate: rotate,
      }}
      transition={{
        duration: 2.4,
        delay,
        ease: [0.23, 0.86, 0.39, 0.96],
        opacity: { duration: 1.2 },
      }}
      className={`absolute ${className}`}
    >
      <motion.div
        animate={{
          y: [0, 15, 0],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{
          width,
          height,
        }}
        className="relative"
      >
        <div
          className={`
            absolute inset-0 rounded-full
            bg-gradient-to-r to-transparent
            ${gradient}
            backdrop-blur-[3px] border border-white/[0.08]
            shadow-[0_24px_80px_rgba(8,15,30,0.45)]
            after:absolute after:inset-0 after:rounded-full
            after:bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.08),transparent_70%)]
          `}
        />
      </motion.div>
    </motion.div>
  );
};

const FuturisticBackground = ({ 
  children, 
  variant = 'default',
  className = ''
}) => {
  return (
    <div className={`relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(33,212,253,0.12),_transparent_34%),radial-gradient(circle_at_bottom_right,_rgba(255,192,84,0.12),_transparent_28%),#060b16] ${className}`}>
      {/* Gradient overlay - matching landing page */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-[rgba(255,192,84,0.08)] blur-3xl" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(148,163,184,0.06)_1px,transparent_1px),linear-gradient(90deg,rgba(148,163,184,0.06)_1px,transparent_1px)] bg-[size:120px_120px] opacity-20" />

      {/* Elegant floating shapes - matching landing page */}
      <div className="absolute inset-0 overflow-hidden">
        <ElegantShape
          delay={0.3}
          width={600}
          height={140}
          rotate={12}
          gradient="from-primary/20"
          className="left-[-10%] md:left-[-5%] top-[15%] md:top-[20%]"
        />

        <ElegantShape
          delay={0.5}
          width={500}
          height={120}
          rotate={-15}
          gradient="from-[rgba(255,192,84,0.2)]"
          className="right-[-5%] md:right-[0%] top-[70%] md:top-[75%]"
        />

        <ElegantShape
          delay={0.4}
          width={300}
          height={80}
          rotate={-8}
          gradient="from-sky-300/15"
          className="left-[5%] md:left-[10%] bottom-[5%] md:bottom-[10%]"
        />

        <ElegantShape
          delay={0.6}
          width={200}
          height={60}
          rotate={20}
          gradient="from-[rgba(255,192,84,0.22)]"
          className="right-[15%] md:right-[20%] top-[10%] md:top-[15%]"
        />

        <ElegantShape
          delay={0.7}
          width={150}
          height={40}
          rotate={-25}
          gradient="from-cyan-400/18"
          className="left-[20%] md:left-[25%] top-[5%] md:top-[10%]"
        />
      </div>

      {/* Top and bottom gradient fade - matching landing page */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#060b16] via-transparent to-[#060b16]/80" />

      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default FuturisticBackground;
