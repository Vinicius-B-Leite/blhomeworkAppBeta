import { createTheme } from "@shopify/restyle"
import { Theme, dark } from "./dark"
import { pallet } from "./pallet"

export const light: Theme = {
	...dark,
	colors: {
		...dark.colors,
		bg: pallet.white800,
		secondsBg: pallet.white600,

		text: pallet.black,
		secondText: pallet.gray450,

		contrast: pallet.lightBlue700,
		darkContrast: pallet.lightBlue900,

		scondContrast: pallet.lightGreen700,
	},
}
