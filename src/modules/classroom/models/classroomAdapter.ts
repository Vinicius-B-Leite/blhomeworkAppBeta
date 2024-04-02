import {
	ClassroomApiResponse,
	ClassroomType,
	Student,
	StudentApiResponse,
} from "./classroomTypes"

const classroomApiResponseToClassroom = (
	classroom: ClassroomApiResponse
): ClassroomType => {
	return {
		bannerUrl: classroom.classroom?.upload?.path_url || null,
		id: classroom.classroom.id,
		title: classroom.classroom.name,
		adminId: classroom.classroom.admin_id,
	}
}

const studentApiResponseToStudent = (student: StudentApiResponse): Student => {
	return {
		avatarUrl: student.user?.avatar_url || null,
		email: student.user.email,
		id: student.user.id,
		userName: student.user.user_name,
	}
}

export const classroomAdapter = {
	classroomApiResponseToClassroom,
	studentApiResponseToStudent,
}
