import React from "react"
import { PressableBox, PressableBoxProps } from "../Box/Box"
import { Text } from "../Text/Text"
import { Spinner } from "../Spinner/Spinner"

type ButtonProps = React.PropsWithChildren &
	PressableBoxProps & {
		isloading?: boolean
		link?: boolean
	}

export const Button: React.FC<ButtonProps> = ({
	isloading = false,
	link = false,
	children,
	...rest
}) => {
	const bg = rest.disabled ? "darkContrast" : "contrast"
	return (
		<PressableBox
			alignItems="center"
			justifyContent="center"
			height={45}
			width={"100%"}
			borderRadius={10}
			activeOpacity={0.8}
			disabled={isloading || rest.disabled}
			bg={link ? "transparent" : bg}
			{...rest}>
			{isloading ? (
				<Spinner testID="spinner" />
			) : (
				<Text
					preset="pMedium"
					bold={!link}
					textDecorationLine={link ? "underline" : "none"}>
					{children}
				</Text>
			)}
		</PressableBox>
	)
}
