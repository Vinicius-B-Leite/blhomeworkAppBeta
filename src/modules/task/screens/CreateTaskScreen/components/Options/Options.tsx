import { Icon, IconProps, PressableBox, Text } from "@/components"
import React from "react"

type OptionsProps = {
	icon: IconProps
	text: string
	onPress: () => void
}

const Options: React.FC<OptionsProps> = ({ icon, text, onPress }) => {
	return (
		<PressableBox
			onPress={onPress}
			flexDirection="row"
			gap={8}
			alignItems="center"
			mb={24}>
			<Icon {...icon} />
			<Text preset="pSmall">{text}</Text>
		</PressableBox>
	)
}

export default Options
