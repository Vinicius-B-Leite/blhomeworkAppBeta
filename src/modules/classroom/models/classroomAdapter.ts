import { ClassroomApiResponse, ClassroomType } from "./classroomTypes"

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

export const classroomAdapter = {
	classroomApiResponseToClassroom,
}
