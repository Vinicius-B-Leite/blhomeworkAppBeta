import { useNavigation } from "@react-navigation/native"

export const useHeader = () => {
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
	}
}
