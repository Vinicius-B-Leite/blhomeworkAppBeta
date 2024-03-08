import { ClassroomApiResponse } from "@/modules/classroom/models"

export type ClassroomApi = {
	getClassrooms: (userId: string) => Promise<ClassroomApiResponse[]>
}
