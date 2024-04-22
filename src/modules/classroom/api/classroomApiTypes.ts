import { ClassroomApiResponse, StudentApiResponse } from "@/modules/classroom/models"

export type ClassroomApi = {
	getClassrooms: (userId: string) => Promise<ClassroomApiResponse[]>
	uploadClassroomBanner: (uri: string, base64: string) => Promise<{ id: string }>
	getFileUrl: (path: string) => string | null
	createClassroom: (
		name: string,
		userId: string,
		bannerId: string
	) => Promise<ClassroomApiResponse>
	enterClassroom: (classroomId: string, userId: string) => Promise<void>
	getClassroomById: (classroomId: string) => Promise<ClassroomApiResponse | null>
	getStudents: (classroomId: string) => Promise<StudentApiResponse[]>
	updateClassroom: (
		classroomId: string,
		name: string,
		bannerId?: string
	) => Promise<ClassroomApiResponse>
	leaveClassroom: (classroomId: string, userId: string) => Promise<void>
	deleteClassroom: (classroomId: string) => Promise<void>
	promoteStudentToClassroomAdmin: (
		studentId: string,
		classroomId: string
	) => Promise<void>
	getStudentById: (studentId: string) => Promise<StudentApiResponse | null>
	removeStudent: (classroomId: string, studentId: string) => Promise<void>
}
