import React, { useEffect } from "react"
import { AnimatedBox, Box, PressableBox } from "../Box/Box"
import { useAppSafeArea, useAppTheme } from "@/hooks"
import { useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated"
import { Icon } from "../Icon/Icon"
import { Text } from "../Text/Text"
import { useAnimatedHeaderOptionsConfig, useAnimatedHeaderOptionsDispatch } from "@/store"
import { Spinner } from "../Spinner/Spinner"

export const AnimatedHeaderOptions: React.FC = () => {
	const { top } = useAppSafeArea()
	const theme = useAppTheme()
	const animatedOpacity = useSharedValue(0)
	const { rightOptions, title, visible, titleColor, onClose } =
		useAnimatedHeaderOptionsConfig()
	const { hideAnimatedHeaderOptions } = useAnimatedHeaderOptionsDispatch()

	const handleGoBack = () => {
		onClose?.()
		hideAnimatedHeaderOptions()
	}
	const animatedStyle = useAnimatedStyle(() => ({
		opacity: animatedOpacity.value,
	}))

	const runAnimation = (opt: "hide" | "show") => {
		const toValue = opt === "hide" ? 0 : 1
		animatedOpacity.value = withTiming(toValue, { duration: 500 })
	}

	useEffect(() => {
		if (!visible) {
			runAnimation("hide")
			return
		}

		runAnimation("show")
	}, [visible])

	if (!visible) return null
	return (
		<AnimatedBox
			bg="secondsBg"
			p={24}
			width={"100%"}
			flexDirection="row"
			justifyContent="space-between"
			gap={24}
			style={[
				{
					paddingTop: top + theme.spacing[14],
					position: "absolute",
					top: 0,
					left: 0,
				},
				animatedStyle,
			]}>
			<PressableBox
				onPress={handleGoBack}
				flexDirection="row"
				alignItems="center"
				flex={1}
				gap={12}
				testID="back-button">
				<Icon name="left" />
				<Text
					preset="pLarge"
					numberOfLines={1}
					style={{ flex: 1, color: titleColor }}>
					{title}
				</Text>
			</PressableBox>
			<Box flexDirection="row" alignItems="center" gap={14}>
				{rightOptions.map((option, index) =>
					option.isLoading ? (
						<Spinner />
					) : (
						<PressableBox
							key={index}
							onPress={() => {
								hideAnimatedHeaderOptions()
								option.onPress()
							}}>
							<Icon name={option.iconsName} testID={option.iconsName} />
						</PressableBox>
					)
				)}
			</Box>
		</AnimatedBox>
	)
}
