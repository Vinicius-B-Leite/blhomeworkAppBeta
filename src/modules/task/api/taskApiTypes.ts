import { TaskApiResponse } from "@/modules/task/model/taskTypes"

export type TaskApi = {
	getTaskList: (classroomId: string) => Promise<TaskApiResponse[]>
}
