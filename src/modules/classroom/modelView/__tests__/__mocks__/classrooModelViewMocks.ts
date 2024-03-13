import { UserType } from "@/modules/auth/models"
import { ClassroomApiResponse, classroomAdapter } from "@/modules/classroom/models"

const classroomApiResponse: ClassroomApiResponse[] = [
	{
		classroom: {
			admin_id: "1",

			upload: {
				path_url: "url1",
				type: "image",
				id: "1",
			},
			created_at: "2024-03-07",
			deleted_at: "",
			id: "1",
			name: "Classroom 1",
			updated_at: "2024-03-07",
		},
	},
	{
		classroom: {
			admin_id: "1",

			upload: {
				path_url: "url2",
				type: "image",
				id: "1",
			},
			created_at: "2024-03-07",
			deleted_at: "",
			id: "2",
			name: "Classroom 2",
			updated_at: "2024-03-07",
		},
	},
	{
		classroom: {
			admin_id: "1",

			upload: {
				path_url: "url3",
				type: "image",
				id: "1",
			},
			created_at: "2024-03-07",
			deleted_at: "",
			id: "3",
			name: "Classroom 3",
			updated_at: "2024-03-07",
		},
	},
]

const classroomParsed = classroomApiResponse.map((classroom) =>
	classroomAdapter.classroomApiResponseToClassroom(classroom)
)
const user: UserType = {
	email: "fake-email",
	refreshtoken: "fake-resfresh-token",
	token: "fake-token",
	uid: "fake-uid",
	username: "fake-username",
}

export const mocks = {
	classroomApiResponse,
	classroomParsed,
	user,
}
