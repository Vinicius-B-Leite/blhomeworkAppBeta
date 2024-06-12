import React from "react"
import { PressableBox, PressableBoxProps } from "../Box/Box"
import { Text, TextProps } from "../Text/Text"
import { Spinner } from "../Spinner/Spinner"
import { Theme } from "@/theme"

type ButtonProps = React.PropsWithChildren &
	PressableBoxProps & {
		isloading?: boolean
		link?: boolean
		textProps?: Omit<TextProps, "preset">
	}

export const Button: React.FC<ButtonProps> = ({
	isloading = false,
	link = false,
	children,
	textProps,
	...rest
}) => {
	const hadleLink = () => {
		const bg = rest.disabled ? "darkContrast" : "contrast"
		let textDecoratioLine: TextProps["textDecorationLine"] = "none"
		let bgcolor: keyof Theme["colors"] = bg
		let bold = true

		if (link) {
			textDecoratioLine = "underline"
			bgcolor = "transparent"
			bold = false
		}

		return {
			textDecoratioLine,
			bgcolor,
			bold,
		}
	}

	return (
		<PressableBox
			alignItems="center"
			justifyContent="center"
			height={45}
			width={"100%"}
			borderRadius={10}
			activeOpacity={0.8}
			disabled={isloading || rest.disabled}
			bg={hadleLink().bgcolor}
			{...rest}>
			{isloading ? (
				<Spinner testID="spinner" />
			) : (
				<Text
					preset="pMedium"
					bold={hadleLink().bold}
					textDecorationLine={hadleLink().textDecoratioLine}
					{...textProps}>
					{children}
				</Text>
			)}
		</PressableBox>
	)
}
