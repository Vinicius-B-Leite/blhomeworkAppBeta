import React from "react"
import { Image as ExpoImage } from "expo-image"
import { createRestyleComponent } from "@shopify/restyle"
import { ImageProps } from "./types"
import { Theme } from "@/theme"
import { comunmRestyleProps } from "../constans"

export const Image = createRestyleComponent<ImageProps, Theme>(
	comunmRestyleProps,
	ExpoImage
)

type CircleImageProps = ImageProps & {
	size?: number
}
export const CircleImage: React.FC<CircleImageProps> = ({ size = 20, ...rest }) => {
	const blurhash = "L0D,ApxufQxu-;fQfQfQfQfQfQfQ"

	return (
		<Image
			width={size}
			height={size}
			borderRadius={9999}
			placeholder={blurhash}
			transition={1000}
			{...rest}
		/>
	)
}
