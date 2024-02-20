import React from "react"
import { ClipPath, Defs, G, Path, Rect, Svg } from "react-native-svg"
import { BaseIconProps } from "./iconTypes"
import { useAppTheme } from "@/hooks"

export const ErrorSvg: React.FC<BaseIconProps> = ({ color, size, ...rest }) => {
	const theme = useAppTheme()
	return (
		<Svg width={size} height={size} viewBox="0 0 25 25" fill="none" {...rest}>
			<G>
				<Path
					d="M24.6094 12.5C24.6094 19.1893 19.1874 24.6094 12.5 24.6094C5.81265 24.6094 0.390625 19.1893 0.390625 12.5C0.390625 5.8146 5.81265 0.390625 12.5 0.390625C19.1874 0.390625 24.6094 5.8146 24.6094 12.5ZM12.5 14.9414C11.2595 14.9414 10.2539 15.947 10.2539 17.1875C10.2539 18.428 11.2595 19.4336 12.5 19.4336C13.7405 19.4336 14.7461 18.428 14.7461 17.1875C14.7461 15.947 13.7405 14.9414 12.5 14.9414ZM10.3675 6.86787L10.7297 13.5085C10.7467 13.8192 11.0036 14.0625 11.3148 14.0625H13.6852C13.9964 14.0625 14.2533 13.8192 14.2703 13.5085L14.6325 6.86787C14.6508 6.53223 14.3835 6.25 14.0474 6.25H10.9525C10.6164 6.25 10.3492 6.53223 10.3675 6.86787Z"
					fill={theme.colors[color]}
				/>
			</G>
			<Defs>
				<ClipPath id="clip0_345_8">
					<Rect width="25" height="25" fill="white" />
				</ClipPath>
			</Defs>
		</Svg>
	)
}
