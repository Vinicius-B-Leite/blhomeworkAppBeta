import { Theme } from "@/theme"
import React from "react"
import { Svg } from "react-native-svg"

export type BaseIconProps = {
	size: number
	color: keyof Theme["colors"]
	testID?: string
}
