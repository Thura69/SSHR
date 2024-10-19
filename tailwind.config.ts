import type { Config } from 'tailwindcss'
import { COLORS } from './constants'
import { transform } from 'lodash'

const config: Config = {
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
        "./node_modules/primereact/**/*.{js,ts,jsx,tsx}",
    ],
    prefix: '',
    darkMode: ['class'],
    theme: {
        container: {
            center: true,
            padding: '2rem',
            screens: {
                '2xl': '1400px',
            },
        },
        extend: {
            colors: COLORS,
            borderRadius: {
                '8': '8px',
                '16': '16px',
            },
            boxShadow: {
                md: '2px 4px 16px 0px rgba(0, 0, 0, 0.08)',
                lg: '4px 8px 20px 0px rgba(0, 0, 0, 0.08)',
                xl: '8px 8px 24px 0px rgba(0, 0, 0, 0.08)',
                '2xl': '12px 10px 32px 0px rgba(0, 0, 0, 0.10)',
            },
            backgroundImage: {
                'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
                'gradient-conic':
                    'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
            },
            keyframes: {
                'accordion-down': {
                    from: { height: '0' },
                    to: { height: 'var(--radix-accordion-content-height)' },
                },
                'accordion-up': {
                    from: { height: 'var(--radix-accordion-content-height)' },
                    to: { height: '0' },
                },
                blueAnimate: {
                    from: { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(1px)' },
                    to: { transform: 'translateY(0)' },
                },
                tealAnimate: {
                    from: { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-1px)' },
                    to: { transform: 'translateY(0)' },
                },
                cardShow: {
                    '0%': { transform: 'translateX(4px)', opacity: '0.5' },
                    '100%': { transform: 'translateX(0px)', opacity: '1' }
                },
                fateShow: {
                    '0%': { opacity: '0.5' },
                    '100%': { opacity: '1' }
                }

            },
            animation: {
                'accordion-down': 'accordion-down 0.2s ease-out',
                'accordion-up': 'accordion-up 0.2s ease-out',
                'logo-loader-blue': 'blueAnimate 0.8s infinite ease-in both',
                'logo-loader-teal': 'tealAnimate 0.8s infinite ease-in both',
                'show-card-initial': 'cardShow 0.3s  ease-in both',
                'fade-item': 'fateShow 0.1s ease-in both'
            },
            screens: {
                xs: '280px',
                side: '850px'
            },
        },
    },
    plugins: [
        require('tailwindcss-animate'),
        require('tailwindcss-debug-screens'),
        require('@tailwindcss/typography'),
    ],
}
export default config
