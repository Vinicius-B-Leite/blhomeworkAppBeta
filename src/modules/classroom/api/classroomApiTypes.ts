import { ClassroomApiResponse } from "../models"

export type ClassroomApi = {
	getClassrooms: (userId: string) => Promise<ClassroomApiResponse[]>
}
