import { ClassroomApiResponse, StudentApiResponse } from "@/modules/classroom/models"

export type ClassroomApi = {
	getClassrooms: (userId: string) => Promise<ClassroomApiResponse[]>
	uploadClassroomBanner: (uri: string, base64: string) => Promise<{ id: string }>
	getFileUrl: (path: string) => string | null
	createClassroom: (name: string, userId: string, bannerId: string) => Promise<void>
	enterClassroom: (classroomId: string, userId: string) => Promise<void>
	getClassroomById: (
		classroomId: string
	) => Promise<ClassroomApiResponse["classroom"] | null>
	getStudents: (classroomId: string) => Promise<StudentApiResponse[]>
	updateClassroom: (
		classroomId: string,
		name: string,
		bannerId?: string
	) => Promise<ClassroomApiResponse>
	leaveClassroom: (classroomId: string, userId: string) => Promise<void>
	deleteClassroom: (classroomId: string) => Promise<void>
	removeStudent: (classroomId: string, studentId: string) => Promise<void>
	getStudentById: (studentId: any) => Promise<StudentApiResponse | null>
}
