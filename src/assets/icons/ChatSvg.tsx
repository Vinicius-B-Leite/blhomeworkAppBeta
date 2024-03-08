import React from "react"
import { Path, Svg } from "react-native-svg"
import { BaseIconProps } from "./iconTypes"
import { useAppTheme } from "@/hooks"

export const ChatSvg: React.FC<BaseIconProps> = ({ color, size, testID }) => {
	const theme = useAppTheme()
	return (
		<Svg width={size} height={size} viewBox="0 0 27 27" fill="none" testID={testID}>
			<Path
				d="M23.625 16.875C23.625 17.4717 23.3879 18.044 22.966 18.466C22.544 18.8879 21.9717 19.125 21.375 19.125H7.875L3.375 23.625V5.625C3.375 5.02826 3.61205 4.45597 4.03401 4.03401C4.45597 3.61205 5.02826 3.375 5.625 3.375H21.375C21.9717 3.375 22.544 3.61205 22.966 4.03401C23.3879 4.45597 23.625 5.02826 23.625 5.625V16.875Z"
				stroke={theme.colors[color]}
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</Svg>
	)
}
