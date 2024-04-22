import { Box } from "@/components/Box/Box"
import { Icon } from "@/components/Icon/Icon"
import { Text } from "@/components/Text/Text"
import React from "react"

const EmptyList: React.FC = () => {
	return (
		<Box justifyContent="center" alignItems="center" mt={14}>
			<Icon name="sadFace" color="contrast" />
			<Text preset="pMedium" mt={4}>
				A lista está vazia
			</Text>
		</Box>
	)
}

export default EmptyList
