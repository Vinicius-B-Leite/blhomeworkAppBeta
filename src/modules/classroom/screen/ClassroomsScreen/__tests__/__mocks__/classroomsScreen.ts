import { UserType } from "@/modules/auth/models"
import {
	ClassroomApiResponse,
	StudentApiResponse,
	classroomAdapter,
} from "@/modules/classroom/models"

const user: UserType = {
	avatarUrl: "url_avatar",
	username: "example_user",
	email: "example@example.com",
	uid: "123456",
	token: "token_string",
	refreshtoken: "refresh_token_string",
}

const classroomApiResponse: ClassroomApiResponse[] = [
	{
		classroom: {
			admin_id: user.uid,
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

const studentApiResponse: StudentApiResponse[] = [
	{
		user: {
			avatar_url: "url_avatar",
			email: "email",
			id: "id",
			user_name: "user_name",
		},
	},
	{
		user: {
			avatar_url: "url_avatar2",
			email: "email2",
			id: "id2",
			user_name: "user_name2",
		},
	},
	{
		user: {
			avatar_url: "url_avatar3",
			email: "email3",
			id: "id3",
			user_name: "user_name3",
		},
	},
]

export const mocks = {
	classroomApiResponse,
	classroomParsed,
	user,
	studentApiResponse,
}
