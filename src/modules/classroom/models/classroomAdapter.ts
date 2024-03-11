import { ClassroomApiResponse, ClassroomType } from "./classroomTypes"

const classroomApiResponseToClassroom = (
	classroom: ClassroomApiResponse
): ClassroomType => {
	return {
		bannerUrl: classroom.classroom.banner_url,
		id: classroom.classroom.id,
		title: classroom.classroom.name,
	}
}

export const classroomAdapter = {
	classroomApiResponseToClassroom,
}
