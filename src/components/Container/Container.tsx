import React from "react"

import { Box } from "../Box/Box"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { useAppTheme } from "@/hooks/useAppTheme"

type ContainerProps = React.PropsWithChildren

export const Container: React.FC<ContainerProps> = ({ children }) => {
	const { bottom, top } = useSafeAreaInsets()
	const theme = useAppTheme()

	const paddingTop = Math.max(top, theme.spacing[14])
	const paddingBottom = Math.max(bottom, theme.spacing[14])
	return (
		<Box backgroundColor="bg" flex={1} style={{ paddingBottom, paddingTop }}>
			{children}
		</Box>
	)
}
