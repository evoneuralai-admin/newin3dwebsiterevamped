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
    <footer className="py-3 px-4 bg-background/95 backdrop-blur-sm border-t border-border">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        {/* Company Info */}
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="font-medium" style={in3dFontStyle}>
            <span className="text-foreground">In</span>
            <span className="text-primary">3D.ai</span>
            <TrademarkSymbol className="ml-0.5" />
          </span>
          <span className="hidden sm:inline">•</span>
          <span className="hidden sm:inline">© {currentYear} Evoneural Artificial Intelligence .</span>
        </div>

        {/* Links */}
        <div className="flex items-center gap-4 text-xs">
          <Link 
            to="/privacy-policy" 
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            Privacy
          </Link>
          <span className="text-border">|</span>
          <Link 
            to="/terms-conditions" 
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            Terms
          </Link>
        </div>
      </div>
    </footer>
  );
}

export default MinimalFooter;
