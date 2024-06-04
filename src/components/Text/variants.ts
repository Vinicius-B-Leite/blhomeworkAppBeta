import { fonts } from "@/theme"
import { RFValue } from "react-native-responsive-fontsize"

const textVariants = {
	pSmall: "pSmall",
	pMedium: "pMedium",
	pMediumBold: "pMediumBold",
	pLarge: "pLarge",
	pLargeBold: "pLargeBold",
	tSmall: "tSmall",
	tSmallBold: "tSmallBold",
	tMedium: "tMedium",
	tMediumBold: "tMediumBold",
	tLarge: "tLarge",
	tLargeItalic: "tLargeItalic",
}

type TextStyle = {
	fontSize: number
	lineHeight?: number
	fontFamily: string
}

export const textPresets: Record<keyof typeof textVariants, TextStyle> = {
	pSmall: {
		fontSize: RFValue(12),
		fontFamily: fonts.REGULAR,
	},
	pMedium: {
		fontSize: RFValue(14),
		fontFamily: fonts.REGULAR,
	},
	pMediumBold: {
		fontSize: RFValue(14),
		fontFamily: fonts.BOLD,
	},
	pLarge: {
		fontSize: RFValue(18),
		fontFamily: fonts.REGULAR,
	},
	pLargeBold: {
		fontSize: RFValue(18),
		fontFamily: fonts.BOLD,
	},
	tSmall: {
		fontSize: RFValue(22),
		fontFamily: fonts.REGULAR,
	},
	tSmallBold: {
		fontSize: RFValue(22),
		fontFamily: fonts.BOLD,
	},
	tMedium: {
		fontSize: RFValue(26),
		fontFamily: fonts.REGULAR,
	},
	tMediumBold: {
		fontSize: RFValue(26),
		fontFamily: fonts.BOLD,
	},
	tLarge: {
		fontSize: RFValue(30),
		fontFamily: fonts.REGULAR,
	},

	tLargeItalic: {
		fontSize: RFValue(30),
		fontFamily: fonts.REGULAR_ITALIC,
	},
}
