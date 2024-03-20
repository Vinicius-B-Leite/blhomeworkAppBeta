import { useRouteParams } from "@/hooks"
import * as WebBrowser from "expo-web-browser"

export function useTaskDetailsScreenViewController() {
	const params = useRouteParams("TaskDetails")
	const { deadLine, id, subject, title, uploads, description } = params!.task
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
	}
}
