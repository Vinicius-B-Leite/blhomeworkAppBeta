import { UserType } from "@/modules/auth/models"
import { ClassroomApiResponse, ClassroomType } from "@/modules/classroom/models"

const user: UserType = {
	avatarUrl: "url_avatar",
	username: "example_user",
	email: "example@example.com",
	uid: "123456",
	token: "token_string",
	refreshtoken: "refresh_token_string",
}

const classroomApiResponse: ClassroomApiResponse = {
	classroom: {
		name: "example_classroom",
		upload: null,
		id: "123456",
		created_at: "2021-09-01T00:00:00.000Z",
		admin_id: "123456",
		deleted_at: "",
		updated_at: "2021-09-01T00:00:00.000Z",
	},
}

const classroom: ClassroomType = {
	adminId: user.uid,
	bannerUrl: "url_banner",
	id: "123456",
	title: "example_classroom",
}

export const mocks = {
	user,
	classroom,
	classroomApiResponse,
}
