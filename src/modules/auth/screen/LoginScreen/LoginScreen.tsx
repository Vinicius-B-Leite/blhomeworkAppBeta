import { Box, Button, Container, FormInput, FormPasswordInput, Icon } from "@/components"
import React from "react"
import { useLoginScreenViewController } from "./loginScreen.viewController"
import { Logo } from "@/modules/auth/components"

export const LoginScreen: React.FC = () => {
	const {
		error,
		submit,
		isLoading,
		isValid,
		control,
		navigateToSignUp,
		navigateToForgetPassword,
	} = useLoginScreenViewController()

	return (
		<Container justifyContent="center" width={"100%"}>
			<Logo />

			<FormInput
				control={control}
				name="email"
				placeholder="Email"
				keyboardType="email-address"
				errorMessage={error.email?.message}
				LeftIcon={<Icon name="email" size={24} />}
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
			<Box width={"100%"} alignItems="flex-start">
				<Button link width={undefined} onPress={navigateToForgetPassword}>
					Esqueci a senha
				</Button>
			</Box>

			<Button onPress={submit} isloading={isLoading} disabled={!isValid} mt={24}>
				Entrar
			</Button>
			<Button link onPress={navigateToSignUp}>
				Não possui conta? Crie uma aqui.
			</Button>
		</Container>
	)
}
