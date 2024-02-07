import { createTheme } from "@shopify/restyle"
import { pallet } from "./pallet"

export const dark = createTheme({
	colors: {
		bg: pallet.black800,
		secondsBg: pallet.black900,

		text: pallet.white900,
		secondText: pallet.gray400,

		contrast: pallet.lightBlue600,
	},

	spacing: {
		8: 8,
		12: 12,
		14: 14,
		20: 20,
		24: 24,
		36: 36,
		50: 50,
	},
	borderRadii: {
		8: 8,
		10: 10,
	},
	textVariants: {
		defaults: {},
	},
})

export type Theme = typeof dark
