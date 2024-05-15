import { useThemeContext } from "@/contextsProviders"
import { useAuth } from "@/modules/auth/context"
import { useNavigation } from "@react-navigation/native"

export function useProfileScreenViewController() {
	const { user, logout } = useAuth()
	const navigation = useNavigation()
	const { theme, toogleTheme } = useThemeContext()

	const handleToggleTheme = () => {
		toogleTheme()
	}

	const handleNavigateToUpdateProfile = () => {
		navigation.navigate("ProfileRoutes", {
			screen: "UpdateProfile",
		})
	}
	return {
		user,
		theme,
		handleToggleTheme,
		logout,
		handleNavigateToUpdateProfile,
	}
}
