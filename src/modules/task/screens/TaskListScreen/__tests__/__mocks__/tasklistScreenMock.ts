import { UserType } from "@/modules/auth/models"
import { TaskApiResponse } from "@/modules/task/model/taskTypes"

const tasks: TaskApiResponse[] = [
	{
		classroom: {
			admin_id: "admin1",
			banner_id: null,
			created_at: "2022-01-01",
			deleted_at: null,
			id: "classroom1",
			name: "Classroom 1",
			updated_at: null,
		},
		classroom_id: "classroom1",
		dead_line: "2022-12-31",
		description: "Task 1",
		id: "task1",
		subject: {
			classroom_id: "classroom1",
			color_rgb: "#FFFFFF",
			id: "subject1",
			short_name: "Subject 1",
			title: "Subject Title 1",
		},
		subject_id: "subject1",
		title: "Task Title 1",
		created_at: "2022-01-01",
		updated_at: null,
		deleted_at: null,
	},
]

const user: UserType = {
	email: "fake-email",
	refreshtoken: "fake-resfresh-token",
	token: "fake-token",
	uid: "fake-uid",
	username: "fake-username",
}

export const mocks = {
	tasks,
	user,
}
