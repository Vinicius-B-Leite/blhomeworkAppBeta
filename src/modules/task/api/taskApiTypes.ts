import {
	Subject,
	SubjectApiResponse,
	TaskApiResponse,
} from "@/modules/task/model/taskTypes"

export type TaskApi = {
	getTaskList: (classroomId: string) => Promise<TaskApiResponse[]>
	createSubject: (
		classroomId: string,
		subject: Omit<Subject, "id">
	) => Promise<SubjectApiResponse>
}
