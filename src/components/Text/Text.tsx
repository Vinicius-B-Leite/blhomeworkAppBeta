import React from "react"
import { createText } from "@shopify/restyle"
import { presets } from "./variants"
import { Theme } from "@/theme"

const CustomText = createText<Theme>()

export type TextProps = React.ComponentProps<typeof CustomText> & {
	preset: keyof typeof presets
	bold?: boolean
	italic?: boolean
}

export const Text: React.FC<TextProps> = ({
	children,
	preset,
	bold = false,
	italic = false,
	...rest
}) => {
	return (
		<CustomText
			fontWeight={bold ? "bold" : "normal"}
			fontStyle={italic ? "italic" : "normal"}
			color={"text"}
			{...presets[preset]}
			{...rest}>
			{children}
		</CustomText>
	)
}
