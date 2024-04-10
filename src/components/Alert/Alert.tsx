import React from "react"
import { Box, PressableBox } from "../Box/Box"
import { Text } from "../Text/Text"
import { Button } from "../Button/Button"
import { useAlertConfig, useAlertDispatch } from "@/store"

export const Alert: React.FC = () => {
	const { buttons, message, visible, title } = useAlertConfig()
	const { hideAlert } = useAlertDispatch()
	if (!visible) return null

	const handleButtonOnPress = (callback?: () => void) => {
		hideAlert()
		callback?.()
	}

	return (
		<PressableBox
			onPress={hideAlert}
			width={"100%"}
			height={"100%"}
			justifyContent="center"
			alignItems="center"
			style={{
				position: "absolute",
				top: 0,
				left: 0,
				backgroundColor: "rgba(0, 0, 0, 0.3)",
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
							bg={button.type === "confirm" ? "darkContrast" : "darkAlert"}
							textProps={{
								color: button.type === "confirm" ? "contrast" : "alert",
							}}>
							{button?.text?.length
								? button.text
								: button.type === "confirm"
								? "Sim"
								: "Não"}
						</Button>
					))}
				</Box>
			</Box>
		</PressableBox>
	)
}
