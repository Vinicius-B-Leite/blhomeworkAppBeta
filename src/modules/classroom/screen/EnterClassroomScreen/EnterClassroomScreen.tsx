import React from "react"
import { Button, Container, FormInput, Text } from "@/components"

import { useEnterClassroomScreenViewController } from "./enterClassroomScreen.viewController"

export const EnterClassroomScreen: React.FC = () => {
	const { control, isValid, handleEnterClassroom, isLoading } =
		useEnterClassroomScreenViewController()
	return (
		<Container
			goBack={{
				title: "Entrar em uma sala",
			}}
			justifyContent="center"
			gap={24}>
			<Text preset="pMedium">Insira o código da sala para fazer parte dela!</Text>
			<FormInput control={control} name="code" placeholder="Código da sala" />

			<Button
				onPress={handleEnterClassroom}
				isloading={isLoading}
				disabled={!isValid}>
				Entrar na sala
			</Button>
		</Container>
	)
}
