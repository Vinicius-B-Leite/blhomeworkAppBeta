import { taskApi } from "@/modules/task/api"
import { taskAdapter } from "./taskAdapter"

const getTaskList = async (classroomId: string) => {
	try {
		const data = await taskApi.getTaskList(classroomId)

		return data.map(taskAdapter.taskApiResponseToTask)
	} catch (error) {
		throw error
	}
}

export const taskService = {
	getTaskList,
}
