/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "1.5rem",
        lg: "2rem",
        xl: "2.5rem",
      },
      screens: {
        "2xl": "1440px",
      },
    },
  	extend: {
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {
  			border: 'var(--border)',
  			input: 'var(--input)',
  			ring: 'var(--ring)',
  			background: 'var(--background)',
  			foreground: 'var(--foreground)',
  			primary: {
  				DEFAULT: 'var(--primary)',
  				foreground: 'var(--primary-foreground)'
  			},
  			secondary: {
  				DEFAULT: 'var(--secondary)',
  				foreground: 'var(--secondary-foreground)'
  			},
  			destructive: {
  				DEFAULT: 'var(--destructive)',
  				foreground: 'var(--destructive-foreground)'
  			},
  			muted: {
  				DEFAULT: 'var(--muted)',
  				foreground: 'var(--muted-foreground)'
  			},
  			accent: {
  				DEFAULT: 'var(--accent)',
  				foreground: 'var(--accent-foreground)'
  			},
  			popover: {
  				DEFAULT: 'var(--popover)',
  				foreground: 'var(--popover-foreground)'
  			},
  			card: {
  				DEFAULT: 'var(--card)',
  				foreground: 'var(--card-foreground)'
  			},
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			},
  			width: {
  				sidebar: 'var(--sidebar-width)',
  				'sidebar-icon': 'var(--sidebar-width-icon)'
  			}
  		},
  		scrollBehavior: [
  			'smooth'
  		],
  		boxShadow: {
  			'card': '0 18px 48px rgba(2, 8, 23, 0.24), inset 0 1px 0 rgba(255, 255, 255, 0.04)',
  			'card-hover': '0 24px 64px rgba(2, 8, 23, 0.32), inset 0 1px 0 rgba(255, 255, 255, 0.06)',
  			'panel': '0 28px 80px rgba(2, 8, 23, 0.38)',
  			'glow': '0 0 0 1px rgba(103, 232, 249, 0.18), 0 24px 80px rgba(34, 211, 238, 0.16)',
  			'inset-soft': 'inset 0 1px 0 rgba(255,255,255,0.06), inset 0 -1px 0 rgba(255,255,255,0.02)'
  		},
  		fontFamily: {
  			display: [
  				'Rejouice Headline',
  				'Outfit',
  				'sans-serif'
  			],
  			body: [
  				'Bricolage Grotesque',
  				'sans-serif'
  			],
  			mono: [
  				'JetBrains Mono',
  				'monospace'
  			]
  		},
  		animation: {
  			gradient: 'gradient 15s ease infinite',
  			blob: 'blob 7s infinite',
  			'fade-in': 'fadeIn 0.5s ease-out forwards',
  			'gradient-x': 'gradient-x 15s ease infinite',
  			pulse: 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
  			shimmer: 'shimmer 2s linear infinite',
  			soundwave: 'soundwave 0.8s ease-in-out infinite',
  			'float-slow': 'floatSlow 10s ease-in-out infinite',
  			'aurora': 'aurora 18s ease infinite',
  			'soft-pulse': 'softPulse 2.8s ease-in-out infinite'
  		},
  		keyframes: {
  			floatSlow: {
  				'0%, 100%': {
  					transform: 'translateY(0px)'
  				},
  				'50%': {
  					transform: 'translateY(-10px)'
  				}
  			},
  			aurora: {
  				'0%, 100%': {
  					backgroundPosition: '0% 50%'
  				},
  				'50%': {
  					backgroundPosition: '100% 50%'
  				}
  			},
  			softPulse: {
  				'0%, 100%': {
  					opacity: '0.85'
  				},
  				'50%': {
  					opacity: '1'
  				}
  			},
  			soundwave: {
  				'0%, 100%': {
  					transform: 'scaleY(0.5)',
  					opacity: '0.6'
  				},
  				'50%': {
  					transform: 'scaleY(1)',
  					opacity: '1'
  				}
  			},
  			gradient: {
  				'0%, 100%': {
  					'background-size': '200% 200%',
  					'background-position': 'left center'
  				},
  				'50%': {
  					'background-size': '200% 200%',
  					'background-position': 'right center'
  				}
  			},
  			blob: {
  				'0%': {
  					transform: 'translate(0px, 0px) scale(1)'
  				},
  				'33%': {
  					transform: 'translate(30px, -50px) scale(1.1)'
  				},
  				'66%': {
  					transform: 'translate(-20px, 20px) scale(0.9)'
  				},
  				'100%': {
  					transform: 'translate(0px, 0px) scale(1)'
  				}
  			},
  			fadeIn: {
  				'0%': {
  					opacity: '0',
  					transform: 'translateY(10px)'
  				},
  				'100%': {
  					opacity: '1',
  					transform: 'translateY(0)'
  				}
  			},
  			'gradient-x': {
  				'0%, 100%': {
  					'background-size': '200% 200%',
  					'background-position': 'left center'
  				},
  				'50%': {
  					'background-size': '200% 200%',
  					'background-position': 'right center'
  				}
  			},
  			shimmer: {
  				'0%': {
  					transform: 'translateX(-100%)'
  				},
  				'100%': {
  					transform: 'translateX(100%)'
  				}
  			}
  		}
  	}
  },
  plugins: [],
}
