import { useRouteParams } from "@/hooks"
import { useNavigation } from "@react-navigation/native"

export function useSubjectsScreenViewController() {
	const navigation = useNavigation()
	const params = useRouteParams("Subjects")

	const handleNavigateToCreateSubject = () => {
		navigation.navigate("TaskRoutes", {
			screen: "CreateSubject",
			params: {
				classroomId: params!.classroomId,
			},
		})
	}

	return {
		handleNavigateToCreateSubject,
	}
}
