import {
	Subject,
	SubjectApiResponse,
	Task,
	TaskApiResponse,
	UploadApiResponse,
} from "@/modules/task/model/taskTypes"

export type createTaskProps = {
	task: Omit<Task, "id" | "subject" | "uploads">
	classroomId: string
	subjectId: string
}
export type TaskApi = {
	getTaskList: (classroomId: string) => Promise<TaskApiResponse[]>
	createSubject: (
		classroomId: string,
		subject: Omit<Subject, "id">
	) => Promise<SubjectApiResponse>
	getSubjectList: (classroomId: string) => Promise<SubjectApiResponse[]>
	createTask: (props: createTaskProps) => Promise<TaskApiResponse>
	createUpload: (pathUrl: string, type: string, taskId: string) => Promise<void>
	getUploads: (taskId: any) => Promise<UploadApiResponse[]>
	deltedSubject: (subjectId: string) => Promise<void>
	updateSubject: (subject: Subject) => Promise<SubjectApiResponse>
}
