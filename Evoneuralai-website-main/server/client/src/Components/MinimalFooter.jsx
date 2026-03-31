/**
 * MinimalFooter - Compact footer for logged-in users
 * Shows only essential links: Privacy, Terms, Company name
 */

import React from "react";
import { Link } from 'react-router-dom';
import { in3dFontStyle, TrademarkSymbol } from './In3DTypography';

function MinimalFooter() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border/70 bg-background/80 px-4 py-4 backdrop-blur-2xl">
      <div className="mx-auto flex max-w-[1440px] flex-col items-center justify-between gap-3 sm:flex-row sm:gap-4">
        {/* Company Info */}
        <div className="flex items-center gap-3 text-xs text-muted-foreground">
          <div className="flex h-9 w-9 items-center justify-center rounded-2xl border border-border/80 bg-card/80 shadow-card">
            <span className="text-sm font-semibold text-primary">AI</span>
          </div>
          <span className="font-medium" style={in3dFontStyle}>
            <span className="text-foreground">In</span>
            <span className="text-primary">3D.ai</span>
            <TrademarkSymbol className="ml-0.5" />
          </span>
          <span className="hidden sm:inline">•</span>
          <span className="hidden sm:inline">© {currentYear} Evoneural Artificial Intelligence.</span>
        </div>

        {/* Links */}
        <div className="flex items-center gap-4 text-xs uppercase tracking-[0.2em]">
          <Link 
            to="/privacy-policy" 
            className="text-muted-foreground transition-colors hover:text-primary"
          >
            Privacy
          </Link>
          <span className="text-border">|</span>
          <Link 
            to="/terms-conditions" 
            className="text-muted-foreground transition-colors hover:text-primary"
          >
            Terms
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default MinimalFooter;
