import React, { useEffect } from "react"

import { AnimatedBox } from "../Box/Box"
import { Icon } from "../Icon/Icon"
import { Text } from "../Text/Text"

import { toastMap } from "./toastMap"
import { useToastConfig, useToastDispatch } from "@/store"
import {
	runOnJS,
	useAnimatedStyle,
	useSharedValue,
	withDelay,
	withSequence,
	withTiming,
} from "react-native-reanimated"
import { Dimensions } from "react-native"

const DEFAULT_ANIMATION_DURATION = 1500
const SCREEN_HEIGHT = Dimensions.get("window").height

export const Toast: React.FC = () => {
	const { message, type, visible } = useToastConfig()
	const { hideToast } = useToastDispatch()
	const { iconColor, iconName } = toastMap[type]

	const screenTop = 0
	const translationY = useSharedValue(screenTop)

	const animatedStyle = useAnimatedStyle(() => ({
		transform: [{ translateY: translationY.value }],
		position: "absolute",
	}))

	useEffect(() => {
		if (!visible) return

		const toValue = SCREEN_HEIGHT * 0.1

		translationY.value = withSequence(
			withTiming(toValue, { duration: 1000 }),
			withDelay(
				DEFAULT_ANIMATION_DURATION,
				withTiming(toValue * -1, { duration: 1000 }, () => {
					runOnJS(hideToast)()
				})
			)
		)
	}, [visible])

	if (!visible) return null

	return (
		<AnimatedBox
			flexDirection="row"
			alignSelf="center"
			style={animatedStyle}
			gap={8}
			alignItems="center"
			justifyContent="center"
			bg="secondsBg"
			paddingVertical={14}
			paddingHorizontal={24}
			borderRadius={8}>
			<Icon name={iconName} color={iconColor} testID={`toastIcon-${iconName}`} />
			<Text preset="pMedium">{message || "dklsajdalksj"}</Text>
		</AnimatedBox>
	)
}
