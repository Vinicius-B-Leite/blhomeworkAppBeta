import {
	Subject,
	SubjectApiResponse,
	Task,
	TaskApiResponse,
} from "@/modules/task/model/taskTypes"

export type TaskApi = {
	getTaskList: (classroomId: string) => Promise<TaskApiResponse[]>
	createSubject: (
		classroomId: string,
		subject: Omit<Subject, "id">
	) => Promise<SubjectApiResponse>
	getSubjectList: (classroomId: string) => Promise<SubjectApiResponse[]>
	createTask: (
		task: Omit<Task, "id" | "subject"> & { classroomId: string; subjectId: string }
	) => Promise<TaskApiResponse>
}
