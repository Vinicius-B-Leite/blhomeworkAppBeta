import { createTheme } from "@shopify/restyle"
import { pallet } from "./pallet"
import { Dimensions } from "react-native"

export const dark = createTheme({
	colors: {
		bg: pallet.black800,
		secondsBg: pallet.black900,

		text: pallet.white900,
		secondText: pallet.gray400,

		contrast: pallet.lightBlue600,
		darkContrast: pallet.lightBlue800,

		scondContrast: pallet.lightGreen600,
		secondDarkContrast: pallet.lightGreen900,

		thirdContrast: pallet.lightYellow600,
		thirdDarkContrast: pallet.lightYellow900,

		alert: pallet.red900,
		darkAlert: pallet.darkRed900,

		...pallet,
	},

	spacing: {
		4: 4,
		8: 8,
		12: 12,
		14: 14,
		20: 20,
		24: 24,
		36: 36,
		50: 50,
		10: 10,
	},
	borderRadii: {
		8: 8,
		10: 10,
		9999: Dimensions.get("screen").height,
	},
	textVariants: {
		defaults: {},
	},
})

export type Theme = typeof dark
