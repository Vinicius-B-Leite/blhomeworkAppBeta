import { useNavigation } from "@react-navigation/native"

export function useSubjectsScreenViewController() {
	const navigation = useNavigation()

	const handleNavigateToCreateSubject = () => {
		navigation.navigate("TaskRoutes", {
			screen: "CreateSubject",
		})
	}

	return {
		handleNavigateToCreateSubject,
	}
}
