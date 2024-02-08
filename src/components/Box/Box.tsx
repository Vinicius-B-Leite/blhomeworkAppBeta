import { Theme } from "@/theme"
import { createBox, createRestyleComponent } from "@shopify/restyle"
import { Pressable, PressableProps, ScrollView, ScrollViewProps } from "react-native"
import { ComunmRestyleProps, comunmRestyleProps } from "../constans"

export const Box = createBox<Theme>()

export const ScrollBox = createRestyleComponent<ScrollBoxProps, Theme>(
	comunmRestyleProps,
	ScrollView
)

export const PressableBox = createRestyleComponent<PressableBoxProps, Theme>(
	comunmRestyleProps,
	Pressable
)

export type ScrollBoxProps = ScrollViewProps & ComunmRestyleProps
export type PressableBoxProps = PressableProps & ComunmRestyleProps
export type BoxProps = React.ComponentProps<typeof Box>
