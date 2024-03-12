import React from "react"
import { PressableBox } from "../Box/Box"
import { Icon } from "../Icon/Icon"

type FloatButtonProps = {
	onPress: () => void
}

export const FloatButton: React.FC<FloatButtonProps> = ({ onPress }) => {
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
