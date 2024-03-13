import { TaskApiResponse } from "../model/taskTypes"

export type TaskApi = {
	getTaskList: (classroomId: string) => Promise<TaskApiResponse[]>
}
