import { fonts } from "@/theme"

const textVariants = {
	pSmall: "pSmall",
	pMedium: "pMedium",
	pLarge: "pLarge",
	tSmall: "tSmall",
	tMedium: "tMedium",
	tLarge: "tLarge",
}

type TextStyle = {
	fontSize: number
	lineHeight: number
	fontFamily: string
}

export const presets: Record<keyof typeof textVariants, TextStyle> = {
	pSmall: {
		fontSize: 12,
		lineHeight: 18,
		fontFamily: fonts.REGULAR,
	},
	pMedium: {
		fontSize: 16,
		lineHeight: 20,
		fontFamily: fonts.REGULAR,
	},
	pLarge: {
		fontSize: 20,
		lineHeight: 24,
		fontFamily: fonts.REGULAR,
	},
	tSmall: {
		fontSize: 24,
		lineHeight: 28,
		fontFamily: fonts.REGULAR,
	},
	tMedium: {
		fontSize: 28,
		lineHeight: 32,
		fontFamily: fonts.REGULAR,
	},
	tLarge: {
		fontSize: 32,
		lineHeight: 36,
		fontFamily: fonts.REGULAR,
	},
}
