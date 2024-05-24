import { useThemeContext } from "@/contextsProviders"
import { useAuth } from "@/modules/auth/context"

import { useNavigation } from "@react-navigation/native"

export const useHeader = () => {
	const { user } = useAuth()
	const { toogleTheme, theme } = useThemeContext()
	const navigation = useNavigation()
	const handleNavigateToProfile = () => {
		navigation.navigate("ProfileRoutes", {
			screen: "Profile",
		})
	}
	const handleToggleTheme = () => {
		toogleTheme()
	}

	return {
		handleNavigateToProfile,
		handleToggleTheme,
		userName: user?.username,
		avatar: user?.avatarUrl,

		theme,
	}
}
