import { fonts } from "@/theme"

const textVariants = {
	pSmall: "pSmall",
	pMedium: "pMedium",
	pMediumBold: "pMediumBold",
	pLarge: "pLarge",
	tSmall: "tSmall",
	tSmallBold: "tSmallBold",
	tMedium: "tMedium",
	tLarge: "tLarge",
	tLargeItalic: "tLargeItalic",
}

type TextStyle = {
	fontSize: number
	lineHeight: number
	fontFamily: string
}

export const textPresets: Record<keyof typeof textVariants, TextStyle> = {
	pSmall: {
		fontSize: 12,
		lineHeight: 22,
		fontFamily: fonts.REGULAR,
	},
	pMedium: {
		fontSize: 16,
		lineHeight: 26,
		fontFamily: fonts.REGULAR,
	},
	pMediumBold: {
		fontSize: 16,
		lineHeight: 26,
		fontFamily: fonts.BOLD,
	},
	pLarge: {
		fontSize: 20,
		lineHeight: 30,
		fontFamily: fonts.REGULAR,
	},
	tSmall: {
		fontSize: 24,
		lineHeight: 34,
		fontFamily: fonts.REGULAR,
	},
	tSmallBold: {
		fontSize: 24,
		lineHeight: 34,
		fontFamily: fonts.BOLD,
	},
	tMedium: {
		fontSize: 28,
		lineHeight: 38,
		fontFamily: fonts.REGULAR,
	},
	tLarge: {
		fontSize: 32,
		lineHeight: 42,
		fontFamily: fonts.REGULAR,
	},
	tLargeItalic: {
		fontSize: 32,
		lineHeight: 42,
		fontFamily: fonts.REGULAR_ITALIC,
	},
}
