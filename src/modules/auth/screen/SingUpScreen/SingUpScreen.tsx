import React from "react"
import { Button, Container, FormInput, FormPasswordInput, Icon } from "@/components"

import { Logo } from "@/modules/auth/components"
import { useSingUpScreenViewController } from "./singupScreen.viewController"

export const SingUpScreen: React.FC = () => {
	const { control, error, isLoading, isValid, goBackToLogin, submit } =
		useSingUpScreenViewController()

	return (
		<Container scrollable mt={50}>
			<Logo mt={50} />

			<FormInput
				control={control}
				name="username"
				placeholder="Nome de usuário"
				errorMessage={error.username?.message}
				LeftIcon={<Icon name="user" />}
				testID="signup-screen-username-input"
			/>

			<FormInput
				control={control}
				name="email"
				placeholder="Seu email"
				errorMessage={error.email?.message}
				LeftIcon={<Icon name="email" />}
				boxProps={{ mt: 14 }}
				testID="signup-screen-email-input"
			/>

			<FormPasswordInput
				control={control}
				name="passwords.password"
				placeholder="Sua senha"
				errorMessage={error.passwords?.password?.message}
				boxProps={{ mt: 14 }}
				testID="signup-screen-password-input"
			/>
			<FormPasswordInput
				control={control}
				name="passwords.confirmPassword"
				placeholder="Confirme sua senha"
				errorMessage={error.passwords?.confirmPassword?.message}
				boxProps={{ mt: 14 }}
				testID="signup-screen-confirm-password-input"
			/>

			<Button
				testID="signup-screen-submit-button"
				onPress={submit}
				mt={24}
				isloading={isLoading}
				disabled={!isValid}>
				Criar conta
			</Button>
			<Button link onPress={goBackToLogin}>
				Já possui uma conta? Faça o login.
			</Button>
		</Container>
	)
}
