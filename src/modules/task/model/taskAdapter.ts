import {
	Subject,
	SubjectApiResponse,
	Task,
	TaskApiResponse,
	Upload,
	UploadApiResponse,
} from "./taskTypes"

const uploadApiResponseToUpload = (uploadApiResponse: UploadApiResponse): Upload => {
	return {
		id: uploadApiResponse.id,
		donwloadUrl: uploadApiResponse.path_url,
		type: uploadApiResponse.type,
		taskId: uploadApiResponse.task_id || null,
	}
}
const taskApiResponseToTask = (
	taskApiResponse: TaskApiResponse,
	doneTasks?: { task_id: string; user_id: string }[],
	uploads?: Upload[]
): Task => {
	return {
		isDone: doneTasks?.some((doneTask) => doneTask.task_id === taskApiResponse.id),
		deadLine: new Date(taskApiResponse.dead_line),
		description: taskApiResponse.description,
		id: taskApiResponse.id,
		subject: {
			color: taskApiResponse.subject.color_rgb,
			id: taskApiResponse.subject.id,
			name: taskApiResponse.subject.title,
			shortName: taskApiResponse.subject.short_name,
		},
		title: taskApiResponse.title,
		uploads:
			(uploads &&
				uploads?.length > 0 &&
				uploads?.filter((upload) => upload.taskId === taskApiResponse.id)) ||
			null,
	}
}

const subjectApiResponseToSubject = (subjectApiResponse: SubjectApiResponse): Subject => {
	return {
		color: subjectApiResponse.color_rgb,
		id: subjectApiResponse.id,
		name: subjectApiResponse.title,
		shortName: subjectApiResponse.short_name,
	}
}

export const taskAdapter = {
	taskApiResponseToTask,
	subjectApiResponseToSubject,
	uploadApiResponseToUpload,
}
