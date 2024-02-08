import {
	Box,
	Button,
	Container,
	FormInput,
	FormPasswordInput,
	Icon,
	Input,
	PasswordInput,
	Text,
} from "@/components"
import React from "react"
import { useLoginScreenViewController } from "./loginScreen.viewController"

export const LoginScreen: React.FC = () => {
	const { error, submit, isLoading, isValid, control } = useLoginScreenViewController()

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

			<FormInput
				control={control}
				name="email"
				placeholder="Email"
				keyboardType="email-address"
				errorMessage={error.email?.message}
				LeftIcon={<Icon name="user" size={30} />}
				boxProps={{
					mt: 50,
				}}
			/>

			<FormPasswordInput
				control={control}
				name="password"
				placeholder="****"
				errorMessage={error.password?.message}
				boxProps={{
					mt: 14,
				}}
			/>

			<Button onPress={submit} isloading={isLoading} disabled={!isValid} mt={24}>
				Entrar
			</Button>
			<Button link>Não possui conta? Crie uma aqui.</Button>
		</Container>
	)
}
