import { UserType } from "@/modules/auth/models"
import {
	ClassroomApiResponse,
	StudentApiResponse,
	classroomAdapter,
} from "@/modules/classroom/models"
const user: UserType = {
	email: "email",
	refreshtoken: "refreshtoken",
	token: "token",
	uid: "uid",
	username: "username",
	avatarUrl: "avatarUrl",
}
const studentsApiResponse: StudentApiResponse[] = [
	{
		user: {
			avatar_url: "https",
			email: user.email,
			id: user.uid,
			user_name: user.username,
		},
	},
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

const classroomApiResponse: ClassroomApiResponse = {
	classroom: {
		admin_id: user.uid,
		created_at: "2021-09-01T00:00:00Z",
		deleted_at: "",
		id: "classroom123",
		name: "classroom name",
		updated_at: "",
		upload: {
			id: "upload123",
			path_url: "url",
			type: "png",
		},
	},
}

const classroom = classroomAdapter.classroomApiResponseToClassroom(classroomApiResponse)

export const mocks = { studentsApiResponse, classroom, user, classroomApiResponse }
