import { useAppTheme } from "@/hooks/useAppTheme"
import { Theme } from "@/theme"
import React from "react"
import { ActivityIndicator, ActivityIndicatorProps } from "react-native"

type SpinnerProps = ActivityIndicatorProps & {
	color?: keyof Theme["colors"]
	size?: number
}

export const Spinner: React.FC<SpinnerProps> = ({
	color = "text",
	size = 20,
	...rest
}) => {
	const theme = useAppTheme()

	return <ActivityIndicator color={theme.colors[color]} size={size} {...rest} />
}
