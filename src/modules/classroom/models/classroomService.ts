import { classroomApi } from "../api"
import { classroomAdapter } from "./classroomAdapter"

const getClassrooms = async (userId: string) => {
	try {
		const response = await classroomApi.getClassrooms(userId)

		return response.map((c) => classroomAdapter.classroomApiResponseToClassroom(c))
	} catch (error) {
		throw error
	}
}

export const classroomService = { getClassrooms }
