import React from "react"
import { Button, Container, FormInput, Icon, Text } from "@/components"
import { useForgetPasswordViewController } from "./forgetPasswordScreen.viewController"

export const ForgetPasswordScreen: React.FC = () => {
	const { control, isValid, handleSubmit, isLoading } =
		useForgetPasswordViewController()
	return (
		<Container goBack={{ title: "Esqueci a senha" }} justifyContent="center" gap={14}>
			<Text preset="pMedium">
				Informe o e-mail da sua conta para recuperar e atualizar sua senha.
				Lembre-se de realizar a atualização no mesmo dispositivo que você
			</Text>
			<FormInput
				control={control}
				name="email"
				LeftIcon={<Icon name="email" />}
				placeholder="Email"
				testID="emailInput"
			/>
			<Button disabled={!isValid} onPress={handleSubmit} isloading={isLoading}>
				Receber email
			</Button>
		</Container>
	)
}
