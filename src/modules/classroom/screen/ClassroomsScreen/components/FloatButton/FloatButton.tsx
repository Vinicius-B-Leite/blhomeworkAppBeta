import { Icon, PressableBox } from "@/components"
import React from "react"

type FloatButtonProps = {
	onPress: () => void
}

const FloatButton: React.FC<FloatButtonProps> = ({ onPress }) => {
	return (
		<PressableBox
			onPress={onPress}
			position="absolute"
			bg="contrast"
			alignSelf="flex-end"
			borderRadius={9999}
			style={{ position: "absolute", bottom: 0 }}
			testID="float-button">
			<Icon name="plus" color="text" size={80} />
		</PressableBox>
	)
}

export default FloatButton
