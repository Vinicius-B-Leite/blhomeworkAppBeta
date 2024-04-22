import { UserType } from "@/modules/auth/models"
import {
	ClassroomApiResponse,
	StudentApiResponse,
	classroomAdapter,
} from "@/modules/classroom/models"
import { SubjectApiResponse } from "@/modules/task/model"

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
const studentsApiResponse: StudentApiResponse[] = [
	{
		user: {
			avatar_url: "url1",
			email: "email1@example.com",
			id: "id1",
			user_name: "user1",
		},
	},
	{
		user: {
			avatar_url: "url2",
			email: "email2@example.com",
			id: "id2",
			user_name: "user2",
		},
	},
	{
		user: {
			avatar_url: "url3",
			email: "email3@example.com",
			id: "id3",
			user_name: "user3",
		},
	},
	{
		user: {
			avatar_url: "url4",
			email: "email4@example.com",
			id: "id4",
			user_name: "user4",
		},
	},
	{
		user: {
			avatar_url: "url5",
			email: "email5@example.com",
			id: "id5",
			user_name: "user5",
		},
	},
	{
		user: {
			avatar_url: "url6",
			email: "email6@example.com",
			id: "id6",
			user_name: "user6",
		},
	},
	{
		user: {
			avatar_url: "url7",
			email: "email7@example.com",
			id: "id7",
			user_name: "user7",
		},
	},
	{
		user: {
			avatar_url: "url8",
			email: "email8@example.com",
			id: "id8",
			user_name: "user8",
		},
	},
	{
		user: {
			avatar_url: "url9",
			email: "email9@example.com",
			id: "id9",
			user_name: "user9",
		},
	},
	{
		user: {
			avatar_url: "url10",
			email: "email10@example.com",
			id: "id10",
			user_name: "user10",
		},
	},
]
const studentsParsed = studentsApiResponse.map(
	classroomAdapter.studentApiResponseToStudent
)
const subjectApiResponse: SubjectApiResponse = {
	color_rgb: "rgb(255, 0, 0)",
	id: "1",
	short_name: "MAT",
	title: "Matemática",
}
export const mocks = {
	classroomApiResponse,
	classroomParsed,
	user,
	studentsApiResponse,
	studentsParsed,
	subjectApiResponse,
}
