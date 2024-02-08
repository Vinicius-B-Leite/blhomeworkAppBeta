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
		<Box {...boxProps}>
			<PressableBox
				testID="inputBox"
				onPress={() => inputRef.current?.focus()}
				bg="secondsBg"
				flexDirection="row"
				alignItems="center"
				paddingHorizontal={20}
				height={55}
				borderRadius={10}
				gap={14}>
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
				{RightIcon}
			</PressableBox>
			{errorMessage && (
				<Text preset="pSmall" color="alert" mt={4}>
					{errorMessage}
				</Text>
			)}
		</Box>
	)
}
