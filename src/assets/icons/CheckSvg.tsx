import React from "react"
import { Path, Svg } from "react-native-svg"
import { BaseIconProps } from "."
import { useAppTheme } from "@/hooks"

export const CheckSvg: React.FC<BaseIconProps> = ({ color, size, testID }) => {
	const theme = useAppTheme()
	return (
		<Svg width={size} height={size} viewBox="0 0 25 25" fill="none" testID={testID}>
			<Path
				d="M24.6094 12.5C24.6094 19.1878 19.1878 24.6094 12.5 24.6094C5.81216 24.6094 0.390625 19.1878 0.390625 12.5C0.390625 5.81216 5.81216 0.390625 12.5 0.390625C19.1878 0.390625 24.6094 5.81216 24.6094 12.5ZM11.0993 18.9118L20.0837 9.92744C20.3888 9.62236 20.3888 9.12769 20.0837 8.82261L18.9789 7.71777C18.6738 7.41265 18.1791 7.41265 17.874 7.71777L10.5469 15.0448L7.12603 11.624C6.82095 11.3189 6.32627 11.3189 6.02114 11.624L4.91631 12.7288C4.61123 13.0339 4.61123 13.5286 4.91631 13.8336L9.99443 18.9118C10.2996 19.2169 10.7942 19.2169 11.0993 18.9118Z"
				fill={theme.colors[color]}
			/>
		</Svg>
	)
}
