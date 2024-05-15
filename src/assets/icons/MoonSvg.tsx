import React from "react"
import { Path, Svg } from "react-native-svg"
import { BaseIconProps } from "./iconTypes"
import { useAppTheme } from "@/hooks"

export const MoonSvg: React.FC<BaseIconProps> = ({ color, size, testID }) => {
	const theme = useAppTheme()
	return (
		<Svg width={size} height={size} viewBox="0 0 25 25" fill="none" testID={testID}>
			<Path
				d="M13.8287 25C17.6842 25 21.2056 23.2459 23.5385 20.3715C23.8836 19.9463 23.5073 19.3251 22.9739 19.4267C16.9093 20.5816 11.3401 15.9317 11.3401 9.80977C11.3401 6.2833 13.2278 3.04048 16.296 1.29443C16.769 1.02529 16.65 0.308252 16.1126 0.208984C15.3592 0.070065 14.5948 0.000114079 13.8287 0C6.92882 0 1.32867 5.59136 1.32867 12.5C1.32867 19.3999 6.92003 25 13.8287 25Z"
				fill={theme.colors[color]}
			/>
		</Svg>
	)
}
