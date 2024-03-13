import { PressableBox, Text } from "@/components"
import React from "react"

type SubmitBtProps = {
	onPress: () => void
	isValid: boolean
}

const SubmitBt: React.FC<SubmitBtProps> = ({ onPress, isValid }) => {
	return (
		<PressableBox onPress={onPress} disabled={!isValid}>
			<Text preset="pMedium" color={isValid ? "contrast" : "darkContrast"}>
				Criar
			</Text>
		</PressableBox>
	)
}

export default SubmitBt
