import React from 'react';

interface In3DTypographyProps {
  children: React.ReactNode;
  className?: string;
  size?: 'hero' | 'large' | 'medium' | 'small' | 'footer';
  variant?: 'full' | 'primary' | 'secondary';
}

/**
 * In3D.ai Typography Component
 * Ensures consistent branding across the entire website
 * Font: Bricolage Grotesque / Outfit (Modern tech aesthetics)
 */
export const In3DTypography: React.FC<In3DTypographyProps> = ({
  children,
  className = '',
  size = 'medium',
  variant = 'full',
}) => {
  const sizeClasses = {
    hero: 'text-[14rem] tracking-[0.9rem] leading-none',
    large: 'text-[8rem] tracking-[0.6rem] leading-none',
    medium: 'text-[4rem] tracking-[0.4rem] leading-tight',
    small: 'text-[2rem] tracking-[0.2rem] leading-tight',
    footer: 'text-[20vw] tracking-[1rem] leading-none',
  };

  const baseStyle = {
    fontFamily: '"Bricolage Grotesque", "Outfit", sans-serif',
  };

  if (variant === 'full') {
    // Logic to handle In3D.ai specifically if needed
    return (
      <span className={`${sizeClasses[size]} ${className}`} style={baseStyle}>
        {children}
      </span>
    );
  }

  return (
    <span className={`${sizeClasses[size]} ${className}`} style={baseStyle}>
      {children}
    </span>
  );
};

export const getIn3DFontClass = (size: 'hero' | 'large' | 'medium' | 'small' | 'footer' = 'medium') => {
  const sizeClasses = {
    hero: 'text-[14rem] tracking-[0.9rem] leading-none',
    large: 'text-[8rem] tracking-[0.6rem] leading-none',
    medium: 'text-[4rem] tracking-[0.4rem] leading-tight',
    small: 'text-[2rem] tracking-[0.2rem] leading-tight',
    footer: 'text-[20vw] tracking-[1rem] leading-none',
  };
  return `${sizeClasses[size]}`;
};

export const in3dFontStyle = {
  fontFamily: '"Bricolage Grotesque", "Outfit", sans-serif',
};

/**
 * Professional trademark symbol component.
 */
export const TrademarkSymbol = ({ className = '' }: { className?: string }) => (
  <span
    className={className}
    style={{
      fontFamily: 'Arial, sans-serif',
      fontSize: '0.4em',
      fontWeight: 600,
      verticalAlign: 'super',
      lineHeight: 1,
      marginLeft: '0.1em',
      display: 'inline',
    }}
  >
    TM
  </span>
);
