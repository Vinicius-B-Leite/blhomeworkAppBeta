import { Box, Button, Container, Icon, Input, PasswordInput, Text } from "@/components"
import React from "react"

export const LoginScreen: React.FC = () => {
	return (
		<Container justifyContent="center" alignItems="center" width={"100%"}>
			<Box flexDirection="row" gap={12} justifyContent="center">
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
				boxProps={{
					mt: 50,
				}}
			/>
			<PasswordInput
				placeholder="****"
				boxProps={{
					mt: 14,
				}}
			/>

			<Button disabled mt={24}>
				Entrar
			</Button>
			<Button link>Não possui conta? Crie uma aqui.</Button>
		</Container>
	)
}
