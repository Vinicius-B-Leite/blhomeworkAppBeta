import { Theme } from "@/theme"
import { createBox, createRestyleComponent } from "@shopify/restyle"
import {
	Pressable,
	PressableProps,
	ScrollView,
	ScrollViewProps,
	TouchableOpacity,
	TouchableOpacityProps,
} from "react-native"
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

export type ScrollBoxProps = ScrollViewProps & ComunmRestyleProps
export type PressableBoxProps = TouchableOpacityProps & ComunmRestyleProps
export type BoxProps = React.ComponentProps<typeof Box>
