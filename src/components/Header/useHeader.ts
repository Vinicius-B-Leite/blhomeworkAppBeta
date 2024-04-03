import { useAuth } from "@/modules/auth/context"
import { useNavigation } from "@react-navigation/native"

export const useHeader = () => {
	const { user } = useAuth()
	const navigation = useNavigation()
	const handleNavigateToProfile = () => {
		//navigation.navigate("")
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
