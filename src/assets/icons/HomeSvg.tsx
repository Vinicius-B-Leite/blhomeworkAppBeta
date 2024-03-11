import React from "react"
import { Path, Svg } from "react-native-svg"
import { BaseIconProps } from "./iconTypes"
import { useAppTheme } from "@/hooks"

export const HomeSvg: React.FC<BaseIconProps> = ({ color, size, testID }) => {
	const theme = useAppTheme()
	return (
		<Svg width={size} height={size} viewBox="0 0 32 32" fill="none">
			<Path
				d="M4.5 12.1167L18 2.66669L31.5 12.1167V26.9667C31.5 27.6828 31.1839 28.3695 30.6213 28.8759C30.0587 29.3822 29.2956 29.6667 28.5 29.6667H7.5C6.70435 29.6667 5.94129 29.3822 5.37868 28.8759C4.81607 28.3695 4.5 27.6828 4.5 26.9667V12.1167Z"
				stroke={theme.colors[color]}
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
			<Path
				d="M13.5 29.3333V16H22.5V29.3333"
				stroke={theme.colors[color]}
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</Svg>
	)
}
