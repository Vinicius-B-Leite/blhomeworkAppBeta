import React from "react"
import { createText } from "@shopify/restyle"

const CustomText = createText()

export const Text: React.FC = () => {
	return <CustomText>something</CustomText>
}
