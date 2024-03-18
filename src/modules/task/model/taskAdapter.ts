import { Subject, SubjectApiResponse, Task, TaskApiResponse } from "./taskTypes"

const taskApiResponseToTask = (taskApiResponse: TaskApiResponse): Task => {
	console.log("taskApiResponse", taskApiResponse)

	return {
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
}
