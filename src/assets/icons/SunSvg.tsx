import React from "react"

import { ClipPath, Defs, G, Path, Rect, Svg } from "react-native-svg"
import { BaseIconProps } from "./iconTypes"
import { useAppTheme } from "@/hooks"

export const SunSvg: React.FC<BaseIconProps> = ({ color, size, testID }) => {
	const theme = useAppTheme()
	return (
		<Svg width={size} height={size} viewBox="0 0 25 25" fill="none" testID={testID}>
			<G clip-path="url(#clip0_305_17)">
				<Path
					d="M12.528 17C15.3981 17 17.7247 14.7614 17.7247 12C17.7247 9.23858 15.3981 7 12.528 7C9.65803 7 7.33142 9.23858 7.33142 12C7.33142 14.7614 9.65803 17 12.528 17Z"
					stroke={theme.colors[color]}
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
				<Path
					d="M12.5281 1V3"
					stroke={theme.colors[color]}
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
				<Path
					d="M12.5281 21V23"
					stroke={theme.colors[color]}
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
				<Path
					d="M4.44208 4.21997L5.91792 5.63997"
					stroke={theme.colors[color]}
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
				<Path
					d="M19.1382 18.3601L20.614 19.7801"
					stroke={theme.colors[color]}
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
				<Path
					d="M1.09546 12H3.17411"
					stroke={theme.colors[color]}
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
				<Path
					d="M21.882 12H23.9607"
					stroke={theme.colors[color]}
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
				<Path
					d="M4.44208 19.7801L5.91792 18.3601"
					stroke={theme.colors[color]}
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
				<Path
					d="M19.1382 5.63997L20.614 4.21997"
					stroke={theme.colors[color]}
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			</G>
			<Defs>
				<ClipPath id="clip0_305_17">
					<Rect
						width="24.9438"
						height="24"
						fill={theme.colors[color]}
						transform="translate(0.0561523)"
					/>
				</ClipPath>
			</Defs>
		</Svg>
	)
}
