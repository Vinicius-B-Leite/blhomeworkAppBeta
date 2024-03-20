import { Box, Icon, IconProps, PressableBox, Text } from "@/components"
import React from "react"

type OptionsProps = {
	icon: IconProps
	text: string
	errorMessage?: string
	onPress: () => void
}

const Options: React.FC<OptionsProps> = ({ icon, text, onPress, errorMessage }) => {
	return (
		<PressableBox onPress={onPress}>
			<Box flexDirection="row" gap={8} alignItems="center" mt={12}>
				<Icon {...icon} />
				<Text preset="pSmall">{text}</Text>
			</Box>

			<Text preset="pSmall" color="alert">
				{errorMessage}
			</Text>
		</PressableBox>
	)
}

export default Options
