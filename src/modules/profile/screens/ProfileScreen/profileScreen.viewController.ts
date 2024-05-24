import { useThemeContext } from "@/contextsProviders"
import { useAuth } from "@/modules/auth/context"
import { useAlertDispatch } from "@/store"
import { useNavigation } from "@react-navigation/native"

export function useProfileScreenViewController() {
	const { user, logout } = useAuth()
	const navigation = useNavigation()
	const { theme, toogleTheme } = useThemeContext()
	const { showAlert } = useAlertDispatch()

	const handleToggleTheme = () => {
		toogleTheme()
	}

	const handleNavigateToUpdateProfile = () => {
		navigation.navigate("ProfileRoutes", {
			screen: "UpdateProfile",
		})
	}

	const handleLogout = () => {
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

	return {
		user,
		theme,
		handleToggleTheme,
		logout: handleLogout,
		handleNavigateToUpdateProfile,
	}
}
