import type { Config } from "tailwindcss";
import tailwindcssAnimate from "tailwindcss-animate";

export default {
	darkMode: ["class"],
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
		extend: {
			colors: {
				// === Thème global ===
				theme: {
					background: 'hsl(var(--background))', // Couleur de fond principale
					foreground: 'hsl(var(--foreground))', // Couleur du texte principal
				},

				// === Composants ===
				components: {
					card: {
						DEFAULT: 'hsl(var(--card))', // Fond des cartes
						foreground: 'hsl(var(--card-foreground))', // Texte dans les cartes
					},
					popover: {
						DEFAULT: 'hsl(var(--popover))', // Fond des popovers
						foreground: 'hsl(var(--popover-foreground))', // Texte dans les popovers
					},
				},

				// === Couleurs principales ===
				primary: {
					DEFAULT: 'hsl(var(--primary))', // Couleur primaire pour les actions importantes
					foreground: 'hsl(var(--primary-foreground))', // Texte sur éléments primaires
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))', // Couleur secondaire pour les éléments secondaires
					foreground: 'hsl(var(--secondary-foreground))', // Texte sur éléments secondaires
				},

				// === Couleurs complémentaires ===
				muted: {
					DEFAULT: 'hsl(var(--muted))', // Couleur neutre (muted)
					foreground: 'hsl(var(--muted-foreground))', // Texte sur fond neutre
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))', // Couleur d'accentuation
					foreground: 'hsl(var(--accent-foreground))', // Texte sur couleur d'accent
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))', // Couleur pour les actions destructives
					foreground: 'hsl(var(--destructive-foreground))', // Texte sur actions destructives
				},

				// === Couleurs utilitaires ===
				utilities: {
					border: 'hsl(var(--border))', // Couleur des bordures
					input: 'hsl(var(--input))', // Couleur des champs de saisie
					ring: 'hsl(var(--ring))', // Couleur des anneaux (focus)
				},

				// === Couleurs de graphiques ===
				chart: {
					1: 'hsl(var(--chart-1))', // Couleur de graphique 1
					2: 'hsl(var(--chart-2))', // Couleur de graphique 2
					3: 'hsl(var(--chart-3))', // Couleur de graphique 3
					4: 'hsl(var(--chart-4))', // Couleur de graphique 4
					5: 'hsl(var(--chart-5))', // Couleur de graphique 5
				},
			},

			// === Bordures arrondies ===
			borderRadius: {
				lg: 'var(--radius)', // Grande bordure arrondie
				md: 'calc(var(--radius) - 2px)', // Bordure moyenne
				sm: 'calc(var(--radius) - 4px)', // Petite bordure
			},
		},
	},
	 // Active le mode sombre via la classe `dark`
	plugins: [tailwindcssAnimate],
} satisfies Config;
