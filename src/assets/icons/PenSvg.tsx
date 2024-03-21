import React from "react"

import { ClipPath, Defs, G, Path, Rect, Svg } from "react-native-svg"
import { BaseIconProps } from "./iconTypes"
import { useAppTheme } from "@/hooks"

export const PenSvg: React.FC<BaseIconProps> = ({ color, size, testID }) => {
	const theme = useAppTheme()
	return (
		<Svg width={size} height={size} viewBox="0 0 25 25" fill="none" testID={testID}>
			<Path
				d="M14.1968 4.55237L20.4478 10.8033L6.87407 24.3771L1.30082 24.9923C0.554729 25.0748 -0.0756416 24.444 0.00736623 23.6979L0.627483 18.1207L14.1968 4.55237ZM24.314 3.6217L21.3789 0.686646C20.4634 -0.228882 18.9786 -0.228882 18.063 0.686646L15.3018 3.44788L21.5528 9.69885L24.314 6.93762C25.2295 6.02161 25.2295 4.53723 24.314 3.6217Z"
				fill={theme.colors[color]}
			/>
		</Svg>
	)
}
