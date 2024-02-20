import { Box, BoxProps, Text } from "@/components"
import React from "react"

export const Logo: React.FC<BoxProps> = (boxProps) => {
	return (
		<Box flexDirection="row" gap={12} justifyContent="center" mb={50} {...boxProps}>
			<Text preset="tLarge" italic color="contrast">
				BL
			</Text>
			<Text preset="tLarge" italic>
				Homework
			</Text>
		</Box>
	)
}
