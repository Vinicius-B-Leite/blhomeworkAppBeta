import { useRouteParams } from "@/hooks"
import * as WebBrowser from "expo-web-browser"
import { useDoneTask } from "../../modelView"
import { useToastDispatch } from "@/store"
import { useNavigation } from "@react-navigation/native"

export function useTaskDetailsScreenViewController() {
	const params = useRouteParams("TaskDetails")
	const { deadLine, id, subject, title, uploads, description, isDone } = params!.task
	const classroomId = params!.classroomId
	const { showToast } = useToastDispatch()
	const navigation = useNavigation()
	const { markTaskAsDone, isLoading } = useDoneTask({
		classroomId: classroomId,
		onError: () => {
			showToast({ message: "Erro ao concluir tarefa!", type: "error" })
		},
		onSuccess: () => {
			navigation.goBack()
			showToast({ message: "Tarefa concluída com sucesso!", type: "success" })
		},
	})

	const openFile = async ({ donwloadUrl }: { donwloadUrl: string }) => {
		await WebBrowser.openBrowserAsync(donwloadUrl)
	}
	return {
		deadLine,
		subject,
		title,
		uploads,
		description,
		openFile,
		markTaskAsDone,
		isLoading,
		id,
		isDone,
	}
}
