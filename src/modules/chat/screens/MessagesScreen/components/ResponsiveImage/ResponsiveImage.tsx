import { Image } from "@/components"
import React, { useEffect } from "react"
import { Dimensions, Image as RNImage, View } from "react-native"

type ResponsiveImageProps = {
	url: string
}

const ResponsiveImage: React.FC<ResponsiveImageProps> = ({ url }) => {
	const [imageSize, setImageSize] = React.useState({ w: 0, h: 0 })

	useEffect(() => {
		RNImage.getSize(url, (width, height) => {
			const { width: screenWidth, height: screenHeight } = Dimensions.get("window")
			const aspectRatio = width / height
			const maxHeight = screenHeight / 1.6
			let w = screenWidth * 0.7
			let h = w / aspectRatio

			if (h > maxHeight) {
				h = maxHeight
				w = h * aspectRatio
			}

			setImageSize({ w, h })
		})
	}, [url])
	return (
		<Image
			contentFit="contain"
			overflow="hidden"
			source={{ uri: url }}
			width={imageSize.w}
			height={imageSize.h}
			borderRadius={8}
		/>
	)
}

export default ResponsiveImage
