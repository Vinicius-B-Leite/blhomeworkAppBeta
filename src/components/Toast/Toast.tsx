import React, { useEffect } from "react"

import { AnimatedBox } from "../Box/Box"
import { Icon } from "../Icon/Icon"
import { Text } from "../Text/Text"
import { useAppSafeArea } from "@/hooks"

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

const DEFAULT_ANIMATION_DURATION = 1500

export const Toast: React.FC = () => {
	const { top } = useAppSafeArea()
	const { message, type, visible } = useToastConfig()
	const { hideToast } = useToastDispatch()
	const { iconColor, iconName } = toastMap[type]
	const translationY = useSharedValue(0)

	const animatedStyle = useAnimatedStyle(() => ({
		transform: [{ translateY: translationY.value }],
	}))

	useEffect(() => {
		if (!visible) return

		const toValue = 40 + top
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
			position="absolute"
			style={animatedStyle}
			gap={8}
			alignItems="center"
			justifyContent="center"
			bg="secondsBg"
			paddingVertical={14}
			paddingHorizontal={24}
			borderRadius={8}>
			<Icon name={iconName} color={iconColor} testID={`toastIcon-${iconName}`} />
			<Text preset="pMedium">{message}</Text>
		</AnimatedBox>
	)
}
