import React from "react"
import { Image as RNImage } from "react-native"
import { createRestyleComponent } from "@shopify/restyle"
import { ImageProps } from "./types"
import { Theme } from "@/theme"
import { comunmRestyleProps } from "../constans"

export const Image = createRestyleComponent<ImageProps, Theme>(
	comunmRestyleProps,
	RNImage
)

type CircleImageProps = ImageProps & {
	size?: number
}
export const CircleImage: React.FC<CircleImageProps> = ({ size = 20, ...rest }) => {
	return <Image width={size} height={size} borderRadius={9999} {...rest} />
}
