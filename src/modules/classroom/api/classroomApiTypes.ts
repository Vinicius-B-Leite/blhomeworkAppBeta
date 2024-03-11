import { ClassroomApiResponse } from "@/modules/classroom/models"

export type ClassroomApi = {
	getClassrooms: (userId: string) => Promise<ClassroomApiResponse[]>
	uploadClassroomBanner: (uri: string, base64: string) => Promise<{ id: string }>
	getFileUrl: (path: string) => string | null
	createClassroom: (name: string, userId: string, bannerId: string) => Promise<void>
	enterClassroom: (classroomId: string, userId: string) => Promise<void>
}
