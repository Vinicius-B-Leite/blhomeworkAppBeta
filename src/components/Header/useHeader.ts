import { useAuth } from "@/modules/auth/context"
import { useLogoutModelView } from "@/modules/auth/modelView"
import { useAlertDispatch } from "@/store"
import { useNavigation } from "@react-navigation/native"

export const useHeader = () => {
	const { user } = useAuth()

	const { logout } = useLogoutModelView()
	const navigation = useNavigation()
	const { showAlert } = useAlertDispatch()
	const handleNavigateToProfile = () => {
		//navigation.navigate("")
		showAlert({
			title: "Atenção",
			message: "Deseja realmente sair da conta?",
			buttons: [
				{
					type: "confirm",
					text: "Sim",
					onPress: () => {
						logout()
					},
				},
				{
					type: "cancel",
					text: "Não",
				},
			],
		})
	}
	const handleToggleTheme = () => {
		// TODO: implement theme toggle
	}

	return {
		handleNavigateToProfile,
		handleToggleTheme,
		userName: user?.username,
	}
}
