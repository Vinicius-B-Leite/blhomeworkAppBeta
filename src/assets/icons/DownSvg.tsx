import React from "react"
import { Path, Svg } from "react-native-svg"
import { BaseIconProps } from "."
import { useAppTheme } from "@/hooks"

export const DownSvg: React.FC<BaseIconProps> = ({ color, size, testID }) => {
	const theme = useAppTheme()
	return (
		<Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
			<Path
				d="M6 9L12 15L18 9"
				stroke={theme.colors[color]}
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</Svg>
	)
}
