import { BaseIconProps } from "@/assets/icons"
import React from "react"

import { iconMap } from "./iconMap"

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
	return <SvgIcon size={size} color={color} testID={testID} />
}
