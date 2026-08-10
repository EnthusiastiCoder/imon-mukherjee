import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			// Was a flat 2rem, which every page then overrode with a hard-coded
			// px-6. Scaling the gutter here lets the pages drop that override and
			// stops 32px of padding eating a 360px screen.
			padding: {
				DEFAULT: '1rem',
				sm: '1.5rem',
				lg: '2rem'
			},
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			// Fluid display scale. Section headings were hard-coded text-4xl/5xl
			// with no responsive prefix, so a 48px heading stayed 48px on a 360px
			// phone. These interpolate with the viewport and clamp at both ends,
			// which fixes every heading by construction rather than per call site.
			fontSize: {
				'display-sm': ['clamp(1.25rem, 1.05rem + 0.9vw, 1.5rem)', { lineHeight: '1.3' }],
				'display-md': ['clamp(1.5rem, 1.15rem + 1.6vw, 2.25rem)', { lineHeight: '1.2' }],
				'display-lg': ['clamp(1.875rem, 1.35rem + 2.4vw, 3rem)', { lineHeight: '1.15' }],
				'display-xl': ['clamp(2.25rem, 1.5rem + 3.5vw, 3.75rem)', { lineHeight: '1.1' }]
			},
			fontFamily: {
				// Roles, not families — each resolves per design direction.
				display: 'var(--font-display)',
				body: 'var(--font-body)',
				data: 'var(--font-data)'
			},
			colors: {
				// ── Redesign tokens ───────────────────────────────────────────
				// Plain var() rather than shadcn's `hsl(var(--x))` triplet trick, so
				// the values stay readable hex in one place. Trade-off: Tailwind's
				// /opacity modifiers do not work on these. That is deliberate —
				// translucent ink is a bug source in a two-theme system, so the
				// palette ships explicit surface and rule steps instead.
				surface: {
					0: 'var(--surface-0)',
					1: 'var(--surface-1)',
					2: 'var(--surface-2)'
				},
				ink: {
					1: 'var(--ink-1)',
					2: 'var(--ink-2)',
					3: 'var(--ink-3)'
				},
				// Named --signal, not --accent: shadcn already owns --accent and wraps
				// it as hsl(var(--accent)), which a hex value turns into invalid
				// hsl(#a35f00). Same reason --ds-radius is not --radius.
				signal: {
					DEFAULT: 'var(--signal)',
					ink: 'var(--signal-ink)',
					wash: 'var(--signal-wash)'
				},
				rule: {
					DEFAULT: 'var(--rule)',
					strong: 'var(--rule-strong)'
				},
				cat: {
					1: 'var(--cat-1)',
					2: 'var(--cat-2)',
					3: 'var(--cat-3)',
					4: 'var(--cat-4)'
				},
				status: {
					good: 'var(--status-good)',
					warn: 'var(--status-warn)',
					info: 'var(--status-info)'
				},

				// ── Original shadcn tokens (src/components/ui/*) ──────────────
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
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
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
