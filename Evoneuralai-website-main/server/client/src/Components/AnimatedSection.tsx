import { ReactNode, CSSProperties } from 'react';
import { motion, Variants, useInView } from 'framer-motion';
import { useRef } from 'react';

type AnimationType = 'fadeUp' | 'fadeDown' | 'fadeLeft' | 'fadeRight' | 'scale' | 'blur' | 'slideUp' | 'none';

interface AnimatedSectionProps {
  children: ReactNode;
  animation?: AnimationType;
  delay?: number;
  duration?: number;
  className?: string;
  style?: CSSProperties;
  once?: boolean;
  amount?: number;
  stagger?: number;
}

const animations: Record<AnimationType, Variants> = {
  fadeUp: {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0 }
  },
  fadeDown: {
    hidden: { opacity: 0, y: -28 },
    visible: { opacity: 1, y: 0 }
  },
  fadeLeft: {
    hidden: { opacity: 0, x: -28 },
    visible: { opacity: 1, x: 0 }
  },
  fadeRight: {
    hidden: { opacity: 0, x: 28 },
    visible: { opacity: 1, x: 0 }
  },
  scale: {
    hidden: { opacity: 0, scale: 0.96 },
    visible: { opacity: 1, scale: 1 }
  },
  blur: {
    hidden: { opacity: 0, filter: 'blur(12px)' },
    visible: { opacity: 1, filter: 'blur(0px)' }
  },
  slideUp: {
    hidden: { opacity: 0, y: 36 },
    visible: { opacity: 1, y: 0 }
  },
  none: {
    hidden: {},
    visible: {}
  }
};

/**
 * AnimatedSection - A reusable component for scroll-triggered animations
 * 
 * @example
 * <AnimatedSection animation="fadeUp" delay={0.2}>
 *   <YourContent />
 * </AnimatedSection>
 */
const AnimatedSection = ({
  children,
  animation = 'fadeUp',
  delay = 0,
  duration = 0.24,
  className = '',
  style,
  once = true,
  amount = 0.2,
}: AnimatedSectionProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={animations[animation]}
      transition={{
        duration,
        delay,
        ease: [0.22, 1, 0.36, 1]
      }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
};

/**
 * AnimatedList - Animates children with staggered delays
 */
interface AnimatedListProps {
  children: ReactNode[];
  animation?: AnimationType;
  staggerDelay?: number;
  duration?: number;
  className?: string;
  itemClassName?: string;
  once?: boolean;
  amount?: number;
}

export const AnimatedList = ({
  children,
  animation = 'fadeUp',
  staggerDelay = 0.1,
  duration = 0.22,
  className = '',
  itemClassName = '',
  once = true,
  amount = 0.1
}: AnimatedListProps) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount });

  const containerVariants: Variants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: staggerDelay
      }
    }
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={containerVariants}
      className={className}
    >
      {children.map((child, index) => (
        <motion.div
          key={index}
          variants={animations[animation]}
          transition={{ duration, ease: [0.22, 1, 0.36, 1] }}
          className={itemClassName}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
};

/**
 * ScrollProgressBar - Shows reading progress at the top of the page
 */
export const ScrollProgressBar = () => {
  return (
    <motion.div
      className="fixed left-0 right-0 top-0 z-[100] h-1 origin-left bg-gradient-to-r from-primary via-cyan-300 to-[rgba(255,192,84,0.95)]"
      style={{ scaleX: 0 }}
      initial={{ scaleX: 0 }}
      animate={{ scaleX: 1 }}
      transition={{ duration: 0.24 }}
    />
  );
};

export default AnimatedSection;
