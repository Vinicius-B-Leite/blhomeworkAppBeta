import { Theme } from "@/theme"
import { createBox, createRestyleComponent } from "@shopify/restyle"
import { ScrollView, ScrollViewProps } from "react-native"
import { ComunmRestyleProps, comunmRestyleProps } from "../constans"

export const Box = createBox<Theme>()

export type ScrollBoxProps = ScrollViewProps & ComunmRestyleProps
export type BoxProps = React.ComponentProps<typeof Box>
export const ScrollBox = createRestyleComponent<ScrollBoxProps, Theme>(
	comunmRestyleProps,
	ScrollView
)
