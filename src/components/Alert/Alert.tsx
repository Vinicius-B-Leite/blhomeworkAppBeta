import React from "react"
import { Box, PressableBox } from "../Box/Box"
import { Text } from "../Text/Text"
import { Button } from "../Button/Button"
import { AlertButton, useAlertConfig, useAlertDispatch } from "@/store"
import { Theme } from "@/theme"

export const Alert: React.FC = () => {
	const { buttons, message, visible, title } = useAlertConfig()
	const { hideAlert } = useAlertDispatch()
	if (!visible) return null

	const handleButtonOnPress = (callback?: () => void) => {
		hideAlert()
		callback?.()
	}

	const handleButtonType = (button: AlertButton) => {
		let bgColor: keyof Theme["colors"] = "darkAlert"
		let textColor: keyof Theme["colors"] = "text"
		let text = button.text

		if (button.type === "confirm") {
			bgColor = "darkContrast"
			textColor = "contrast"
			text = "Sim"
		}

		if (button.type === "cancel") {
			bgColor = "darkAlert"
			textColor = "alert"
			text = "Não"
		}

		return { bgColor, textColor, text }
	}

	return (
		<PressableBox
			onPress={hideAlert}
			width={"100%"}
			height={"100%"}
			justifyContent="center"
			bg="black03"
			alignItems="center"
			style={{
				position: "absolute",
				top: 0,
				left: 0,
			}}>
			<Box bg="bg" p={24} borderRadius={10}>
				<Text preset="tSmall" mb={20}>
					{title || "Atenção"}
				</Text>
				<Text preset="pMedium">{message}</Text>
				<Box flexDirection="row" justifyContent="space-between" gap={20} mt={20}>
					{buttons.map((button, index) => (
						<Button
							onPress={() => handleButtonOnPress(button.onPress)}
							key={index}
							flex={1}
							bg={handleButtonType(button).bgColor}
							textProps={{
								color: handleButtonType(button).textColor,
							}}>
							{handleButtonType(button).text}
						</Button>
					))}
				</Box>
			</Box>
		</PressableBox>
	)
}
