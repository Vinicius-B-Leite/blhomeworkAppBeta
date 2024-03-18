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
			righComponent?: React.ReactNode
		}
		submitButton?: {
			onPress: () => void
		}
	}

export const Container: React.FC<ContainerProps> = ({
	children,
	scrollable = false,
	goBack,
	submitButton,
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
				<Box
					flexDirection="row"
					justifyContent="space-between"
					alignItems="center"
					g={14}>
					<PressableBox
						flex={1}
						flexDirection="row"
						alignItems="center"
						gap={14}
						onPress={handleGoBack}>
						<Icon name="left" />
						<Text preset="tSmallBold" numberOfLines={1} style={{ flex: 1 }}>
							{goBack.title}
						</Text>
					</PressableBox>
					{!submitButton && goBack.righComponent}
					{submitButton && (
						<PressableBox onPress={submitButton.onPress}>
							<Text preset="pMedium" color={"contrast"}>
								Criar
							</Text>
						</PressableBox>
					)}
				</Box>
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
