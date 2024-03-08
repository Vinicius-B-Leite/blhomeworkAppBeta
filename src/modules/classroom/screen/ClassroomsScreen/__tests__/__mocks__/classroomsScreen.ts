import { UserType } from "@/modules/auth/models"
import { ClassroomApiResponse } from "@/modules/classroom/models"
import { classroomAdapter } from "@/modules/classroom/models/classroomAdapter"

const classroomApiResponse: ClassroomApiResponse[] = [
	{
		classroom: {
			banner_url: "url1",
			created_at: "2024-03-07",
			deleted_at: "",
			id: "1",
			name: "Classroom 1",
			updated_at: "2024-03-07",
		},
	},
	{
		classroom: {
			banner_url: "url2",
			created_at: "2024-03-07",
			deleted_at: "",
			id: "2",
			name: "Classroom 2",
			updated_at: "2024-03-07",
		},
	},
	{
		classroom: {
			banner_url: "url3",
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
	avatarUrl: "url_avatar",
	username: "example_user",
	email: "example@example.com",
	uid: "123456",
	token: "token_string",
	refreshtoken: "refresh_token_string",
}

export const mocks = {
	classroomApiResponse,
	classroomParsed,
	user,
}
