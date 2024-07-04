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
	onPress?: () => void
}
export const Input: React.FC<InputProps> = ({
	LeftIcon,
	RightIcon,
	errorMessage,
	boxProps,
	onPress,
	style,
	multiline,
	...textinputProps
}) => {
	const theme = useAppTheme()
	const inputRef = useRef<TextInput>(null)

	return (
		<Box>
			<PressableBox
				onPress={() => onPress?.() || inputRef.current?.focus()}
				activeOpacity={1}
				width={"100%"}
				bg="secondsBg"
				borderRadius={10}
				paddingVertical={14}
				paddingHorizontal={20}
				{...boxProps}>
				<Box testID="inputBox" alignItems="center" flexDirection="row" gap={14}>
					{LeftIcon}
					<TextInput
						onPressIn={() => onPress?.() || inputRef.current?.focus()}
						ref={inputRef}
						cursorColor={theme.colors.contrast}
						placeholderTextColor={theme.colors.secondText}
						style={[
							{
								...textPresets.pMedium,
								flex: 1,
								color: theme.colors.text,
								padding: 0,
								paddingVertical: 0,
								paddingBottom: 0,
							},
							style,
						]}
						multiline={multiline}
						{...textinputProps}
					/>
					<Box alignSelf={multiline ? "flex-end" : "center"}>{RightIcon}</Box>
				</Box>
			</PressableBox>
			{errorMessage && (
				<Text preset="pSmall" color="alert" mt={4}>
					{errorMessage}
				</Text>
			)}
		</Box>
	)
}
