import { BaseIconProps } from "@/assets/icons"
import React from "react"

import { iconMap } from "./iconMap"
import { Box } from "../Box/Box"

export type IconProps = Pick<BaseIconProps, "testID"> & {
	name: keyof typeof iconMap
	size?: BaseIconProps["size"]
	color?: BaseIconProps["color"]
}
export const Icon: React.FC<IconProps> = ({
	name,
	size = 20,
	color = "text",
	testID,
}) => {
	const SvgIcon = iconMap[name]
	return (
		<Box>
			<SvgIcon size={size} color={color} testID={testID} />
		</Box>
	)
}

export { iconMap }
