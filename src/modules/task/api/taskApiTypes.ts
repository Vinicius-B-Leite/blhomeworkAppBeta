import { UploadFileProps } from "@/api"
import {
	Subject,
	SubjectApiResponse,
	Task,
	TaskApiResponse,
} from "@/modules/task/model/taskTypes"

type createTaskProps = {
	task: Omit<Task, "id" | "subject">
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
}
