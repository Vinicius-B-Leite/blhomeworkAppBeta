import React from "react"

import { Box, BoxProps, ScrollBox } from "../Box/Box"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useAppTheme } from "@/hooks/useAppTheme"
import { useAppSafeArea } from "@/hooks"

type ContainerProps = React.PropsWithChildren &
	BoxProps & {
		scrollabel?: boolean
	}

export const Container: React.FC<ContainerProps> = ({
	children,
	scrollabel = false,
	...boxProps
}) => {
	const { bottom, top } = useAppSafeArea()
	const theme = useAppTheme()

	const paddingTop = top + theme.spacing[14]
	const paddingBottom = bottom + theme.spacing[14]

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
