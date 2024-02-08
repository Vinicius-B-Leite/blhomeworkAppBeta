import React from "react"

import { Box, BoxProps, ScrollBox } from "../Box/Box"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useAppTheme } from "@/hooks/useAppTheme"

type ContainerProps = React.PropsWithChildren &
	BoxProps & {
		scrollabel?: boolean
	}

export const Container: React.FC<ContainerProps> = ({
	children,
	scrollabel = false,
	...boxProps
}) => {
	const { bottom, top } = useSafeAreaInsets()
	const theme = useAppTheme()

	const paddingTop = Math.max(top, theme.spacing[14]) + theme.spacing[14]
	const paddingBottom = Math.max(bottom, theme.spacing[14]) + theme.spacing[14]

	const Wrapper = scrollabel ? ScrollBox : Box

	return (
		<Wrapper
			keyboardShouldPersistTaps="handled"
			flex={1}
			backgroundColor="bg"
			paddingHorizontal={24}
			{...boxProps}
			style={{ paddingBottom, paddingTop }}>
			{children}
		</Wrapper>
	)
}
