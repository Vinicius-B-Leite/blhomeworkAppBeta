import React from "react"
import { Path, Svg } from "react-native-svg"
import { BaseIconProps } from "./iconTypes"
import { useAppTheme } from "@/hooks"

export const PlusSvg: React.FC<BaseIconProps> = ({ color, size, testID }) => {
	const theme = useAppTheme()

	return (
		<Svg width={size} height={size} viewBox="0 0 79 79" fill="none" testID={testID}>
			<Path
				d="M39.5 26.3333V52.6666"
				stroke={theme.colors[color]}
				stroke-linecap="round"
				stroke-linejoin="round"
				strokeWidth={4}
			/>
			<Path
				d="M26.3334 39.5H52.6667"
				stroke={theme.colors[color]}
				stroke-linecap="round"
				stroke-linejoin="round"
				strokeWidth={4}
			/>
		</Svg>
	)
}
