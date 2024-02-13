import { Theme } from "@/theme"
import { createBox, createRestyleComponent } from "@shopify/restyle"
import {
	ScrollView,
	ScrollViewProps,
	TouchableOpacity,
	TouchableOpacityProps,
} from "react-native"

import Animated from "react-native-reanimated"

import { ComunmRestyleProps, comunmRestyleProps } from "../constans"

export const Box = createBox<Theme>()

export const ScrollBox = createRestyleComponent<ScrollBoxProps, Theme>(
	comunmRestyleProps,
	ScrollView
)

export const PressableBox = createRestyleComponent<PressableBoxProps, Theme>(
	comunmRestyleProps,
	TouchableOpacity
)
export const AnimatedBox = createRestyleComponent<AnimatedBoxProps, Theme>(
	comunmRestyleProps,
	Animated.View
)

export type ScrollBoxProps = ScrollViewProps & ComunmRestyleProps
export type PressableBoxProps = TouchableOpacityProps & ComunmRestyleProps
export type AnimatedBoxProps = React.ComponentProps<typeof Animated.View> &
	ComunmRestyleProps
export type BoxProps = React.ComponentProps<typeof Box>
