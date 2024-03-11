import React from "react"
import { Path, Svg } from "react-native-svg"
import { BaseIconProps } from "./iconTypes"
import { useAppTheme } from "@/hooks"

export const ImageSvg: React.FC<BaseIconProps> = ({ color, size, testID }) => {
	const theme = useAppTheme()
	return (
		<Svg width={size} height={size} viewBox="0 0 49 49" fill="none">
			<Path
				d="M44.4062 42.875H4.59375C2.05666 42.875 0 40.8183 0 38.2812V10.7188C0 8.18166 2.05666 6.125 4.59375 6.125H44.4062C46.9433 6.125 49 8.18166 49 10.7188V38.2812C49 40.8183 46.9433 42.875 44.4062 42.875ZM10.7188 11.4844C7.75884 11.4844 5.35938 13.8838 5.35938 16.8438C5.35938 19.8037 7.75884 22.2031 10.7188 22.2031C13.6787 22.2031 16.0781 19.8037 16.0781 16.8438C16.0781 13.8838 13.6787 11.4844 10.7188 11.4844ZM6.125 36.75H42.875V26.0312L34.4995 17.6558C34.0511 17.2073 33.3239 17.2073 32.8754 17.6558L19.9062 30.625L14.5933 25.312C14.1448 24.8636 13.4177 24.8636 12.9691 25.312L6.125 32.1562V36.75Z"
				fill={theme.colors[color]}
			/>
		</Svg>
	)
}
