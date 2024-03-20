import React from "react"
import { ClipPath, Defs, G, Path, Rect, Svg } from "react-native-svg"
import { BaseIconProps } from "./iconTypes"
import { useAppTheme } from "@/hooks"

export const UploadSvg: React.FC<BaseIconProps> = ({ color, size, testID }) => {
	const theme = useAppTheme()
	return (
		<Svg width={size} height={size} viewBox="0 0 24 24" fill="none" testID={testID}>
			<G clip-path="url(#clip0_13_156)">
				<Path
					d="M16 16L12 12L8 16"
					stroke={theme.colors[color]}
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
				<Path
					d="M12 12V21"
					stroke={theme.colors[color]}
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
				<Path
					d="M20.39 18.39C21.3653 17.8583 22.1358 17.0169 22.5798 15.9986C23.0239 14.9804 23.1162 13.8432 22.8422 12.7667C22.5682 11.6901 21.9434 10.7355 21.0666 10.0534C20.1898 9.37137 19.1108 9.00072 18 8.99998H16.74C16.4373 7.82923 15.8731 6.74232 15.0899 5.82098C14.3067 4.89964 13.3248 4.16783 12.2181 3.68059C11.1113 3.19335 9.90851 2.96334 8.70008 3.00787C7.49164 3.05239 6.30903 3.37028 5.24114 3.93765C4.17325 4.50501 3.24787 5.30709 2.53458 6.28357C1.82129 7.26004 1.33865 8.38552 1.12294 9.57538C0.90723 10.7652 0.964065 11.9885 1.28917 13.1532C1.61428 14.318 2.1992 15.3938 2.99996 16.3"
					stroke={theme.colors[color]}
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
				<Path
					d="M16 16L12 12L8 16"
					stroke={theme.colors[color]}
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			</G>
			<Defs>
				<ClipPath id="clip0_13_156">
					<Rect width="24" height="24" fill={theme.colors[color]} />
				</ClipPath>
			</Defs>
		</Svg>
	)
}
