import React from "react"

import { BoxProps, ScrollBox } from "../Box/Box"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useAppTheme } from "@/hooks/useAppTheme"

type ContainerProps = React.PropsWithChildren & BoxProps

export const Container: React.FC<ContainerProps> = ({ children }) => {
	const { bottom, top } = useSafeAreaInsets()
	const theme = useAppTheme()

	const paddingTop = Math.max(top, theme.spacing[14]) + theme.spacing[14]
	const paddingBottom = Math.max(bottom, theme.spacing[14]) + theme.spacing[14]

	return (
		<ScrollBox
			keyboardShouldPersistTaps="handled"
			backgroundColor="bg"
			flex={1}
			paddingHorizontal={24}
			style={{ paddingBottom, paddingTop }}>
			{children}
		</ScrollBox>
	)
}
