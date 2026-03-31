import type { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface PageLayoutProps {
  children: ReactNode;
  /** Optional extra class for the outer container */
  className?: string;
  /** Optional extra class for the inner max-width container */
  contentClassName?: string;
}

/**
 * Shared page wrapper for homogeneous layout across Dashboard, Lessons, Explore, etc.
 * Use with Sidebar: main content area already has bg-background; this adds consistent padding and max-width.
 */
export function PageLayout({ children, className = '', contentClassName = '' }: PageLayoutProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
      className={`min-h-screen bg-background pt-24 pb-10 sm:pb-12 ${className}`}
    >
      <div className={`mx-auto w-full max-w-[1440px] px-4 sm:px-6 lg:px-8 ${contentClassName}`}>
        {children}
      </div>
    </motion.div>
  );
}
