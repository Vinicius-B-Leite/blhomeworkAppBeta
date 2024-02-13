import React from "react"

import { Box, BoxProps, ScrollBox } from "../Box/Box"

import { useAppSafeArea, useAppTheme } from "@/hooks"

type ContainerProps = React.PropsWithChildren &
	BoxProps & {
		scrollable?: boolean
	}

export const Container: React.FC<ContainerProps> = ({
	children,
	scrollable = false,
	...boxProps
}) => {
	const { bottom, top } = useAppSafeArea()
	const theme = useAppTheme()

	const paddingTop = top + theme.spacing[14]
	const paddingBottom = bottom + theme.spacing[14]

	const Wrapper = scrollable ? ScrollBox : Box

	return (
		<Wrapper
			testID="container"
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
