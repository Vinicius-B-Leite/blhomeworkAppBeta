import React from "react"
import { Dimensions, Image, View } from "react-native"

import { Box, PressableBox } from "../Box/Box"
import { Icon } from "../Icon/Icon"

type ImageViewProps = {
	uri: string
	visible: boolean
	onClose: () => void
	onSend: () => void
}

const { height, width } = Dimensions.get("window")
const ImageView: React.FC<ImageViewProps> = ({ uri, visible, onClose, onSend }) => {
	if (!visible) {
		return
	}

	const handleSendImage = () => {
		onSend()
		onClose()
	}

	return (
		<Box
			style={{ position: "absolute", top: 0, left: 0 }}
			width={"100%"}
			height={"100%"}>
			<PressableBox
				onPress={onClose}
				bg="bg"
				borderRadius={9999}
				padding={8}
				testID="close-image"
				style={{
					position: "absolute",
					top: height * 0.08,
					left: width * 0.05,
					zIndex: 2,
				}}>
				<Icon name="left" size={40} />
			</PressableBox>
			<Image source={{ uri: uri }} style={{ width: "100%", height: "100%" }} />
			<PressableBox
				onPress={handleSendImage}
				bg="contrast"
				borderRadius={9999}
				padding={8}
				style={{
					position: "absolute",
					top: height * 0.85,
					left: width * 0.8,
					zIndex: 2,
				}}>
				<Icon name="send" size={40} />
			</PressableBox>
		</Box>
	)
}

export default ImageView
