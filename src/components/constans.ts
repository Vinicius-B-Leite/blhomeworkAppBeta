import { Theme } from "@/theme"
import {
	BackgroundColorProps,
	OpacityProps,
	LayoutProps,
	SpacingProps,
	BorderProps,
	ShadowProps,
	PositionProps,
	VisibleProps,
	SpacingShorthandProps,
	BackgroundColorShorthandProps,
	spacing,
	backgroundColor,
	opacity,
	layout,
	border,
	shadow,
	visible,
	spacingShorthand,
	backgroundColorShorthand,
} from "@shopify/restyle"

export type ComunmRestyleProps = SpacingProps<Theme> &
	BackgroundColorProps<Theme> &
	OpacityProps<Theme> &
	LayoutProps<Theme> &
	BorderProps<Theme> &
	ShadowProps<Theme> &
	PositionProps<Theme> &
	VisibleProps<Theme> &
	SpacingShorthandProps<Theme> &
	BackgroundColorShorthandProps<Theme>

export const comunmRestyleProps = [
	spacing,
	backgroundColor,
	opacity,
	layout,
	border,
	shadow,
	visible,
	spacingShorthand,
	backgroundColorShorthand,
]
