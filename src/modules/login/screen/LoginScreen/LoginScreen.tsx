import { Box, Container, Icon, Input, PasswordInput, Text } from "@/components"
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

			<Input
				placeholder="Email"
				keyboardType="email-address"
				LeftIcon={<Icon name="user" size={30} />}
			/>
			<PasswordInput
				placeholder="****"
				boxProps={{
					mt: 14,
				}}
			/>
		</Container>
	)
}
