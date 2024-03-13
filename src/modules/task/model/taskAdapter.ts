import { Task, TaskApiResponse } from "./taskTypes"

const taskApiResponseToTask = (taskApiResponse: TaskApiResponse): Task => {
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

export const taskAdapter = {
	taskApiResponseToTask,
}
