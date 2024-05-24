import * as LocalAuthentication from "expo-local-authentication"

export const authenticate = async () => {
	const deviceHasLocalAuthentication = await LocalAuthentication.authenticateAsync({
		promptMessage: "Faça autenticação para salvar suas alteracões!",
		cancelLabel: "Cancelar",
		fallbackLabel: "Não reconhecido.",
	})
	return deviceHasLocalAuthentication
}
