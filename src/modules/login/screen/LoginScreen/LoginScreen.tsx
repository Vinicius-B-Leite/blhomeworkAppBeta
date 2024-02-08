import { Box, Container, Text } from "@/components"
import React from "react"

export const LoginScreen: React.FC = () => {
	return (
		<Container>
			<Box
				flexDirection="row"
				gap={12}
				justifyContent="center"
				paddingVertical={50}>
				<Text preset="tLarge" italic color="contrast">
					BL
				</Text>
				<Text preset="tLarge" italic>
					Homework
				</Text>
			</Box>
		</Container>
	)
}
