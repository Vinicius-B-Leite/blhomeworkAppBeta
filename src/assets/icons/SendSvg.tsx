import React from "react"

import { Path, Svg } from "react-native-svg"
import { BaseIconProps } from "./iconTypes"
import { useAppTheme } from "@/hooks/useAppTheme"

export const SendSvg: React.FC<BaseIconProps> = ({ color, size }) => {
	const theme = useAppTheme()
	return (
		<Svg width={size} height={size} viewBox="0 0 36 36" fill="none">
			<Path
				d="M26.6556 8.96045L17.5252 19.6126"
				stroke={theme.colors[color]}
				strokeWidth="3"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
			<Path
				d="M26.6557 8.96045L19.7317 28.7431L15.7752 19.8409L6.87305 15.8844L26.6557 8.96045Z"
				stroke={theme.colors[color]}
				strokeWidth="3"
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</Svg>
	)
}
