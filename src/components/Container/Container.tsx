import React from "react"

import { Box, BoxProps, PressableBox, ScrollBox } from "../Box/Box"

import { useAppSafeArea, useAppTheme } from "@/hooks"
import { Icon } from "../Icon/Icon"
import { Text } from "../Text/Text"
import { useNavigation } from "@react-navigation/native"

type ContainerProps = React.PropsWithChildren &
	BoxProps & {
		scrollable?: boolean
		goBack?: {
			title: string
		}
	}

export const Container: React.FC<ContainerProps> = ({
	children,
	scrollable = false,
	goBack,
	...boxProps
}) => {
	const { bottom, top } = useAppSafeArea()
	const navigation = useNavigation()
	const theme = useAppTheme()

	const paddingTop = top + theme.spacing[14]
	const paddingBottom = bottom + theme.spacing[14]

	const Wrapper = scrollable ? ScrollBox : Box

	const handleGoBack = () => navigation.goBack()

	return (
		<Box
			flex={1}
			backgroundColor="bg"
			paddingHorizontal={24}
			style={{ paddingBottom, paddingTop }}>
			{goBack && (
				<PressableBox
					flexDirection="row"
					alignItems="center"
					gap={14}
					onPress={handleGoBack}>
					<Icon name="left" />
					<Text preset="tSmall" bold>
						{goBack.title}
					</Text>
				</PressableBox>
			)}
			<Wrapper
				testID="container"
				showsVerticalScrollIndicator={false}
				keyboardShouldPersistTaps="handled"
				flex={1}
				{...boxProps}>
				{children}
			</Wrapper>
		</Box>
	)
}
