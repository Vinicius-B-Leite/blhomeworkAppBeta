import React, { useRef } from "react"
import { TextInput, TextInputProps, View } from "react-native"
import { Box, BoxProps, PressableBox } from "../Box/Box"
import { useAppTheme } from "@/hooks/useAppTheme"
import { textPresets } from "../Text/variants"
import { Text } from "../Text/Text"

export type InputProps = Omit<TextInputProps, "placeholderTextColor" | "cursorColor"> & {
	LeftIcon?: React.ReactNode
	RightIcon?: React.ReactNode
	errorMessage?: string
	boxProps?: BoxProps
}
export const Input: React.FC<InputProps> = ({
	LeftIcon,
	RightIcon,
	errorMessage,
	boxProps,
	...textinputProps
}) => {
	const theme = useAppTheme()
	const inputRef = useRef<TextInput>(null)

	return (
		<PressableBox
			onPress={() => inputRef.current?.focus()}
			width={"100%"}
			bg="secondsBg"
			borderRadius={10}
			paddingVertical={14}
			paddingHorizontal={20}
			{...boxProps}>
			<Box testID="inputBox" flexDirection="row" gap={14}>
				{LeftIcon}
				<TextInput
					ref={inputRef}
					cursorColor={theme.colors.contrast}
					placeholderTextColor={theme.colors.secondText}
					style={{
						flex: 1,
						color: theme.colors.text,
						...textPresets.pMedium,
						padding: 0,
						paddingBottom: 0,
					}}
					{...textinputProps}
				/>
				<Box alignSelf="center">{RightIcon}</Box>
			</Box>
			{errorMessage && (
				<Text preset="pSmall" color="alert" mt={4}>
					{errorMessage}
				</Text>
			)}
		</PressableBox>
	)
}
