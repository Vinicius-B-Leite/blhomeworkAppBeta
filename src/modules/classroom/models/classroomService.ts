import { classroomApi } from "@/modules/classroom/api"
import { classroomAdapter } from "./classroomAdapter"

const getClassrooms = async (userId: string) => {
	try {
		const response = await classroomApi.getClassrooms(userId)

		return response.map((c) => classroomAdapter.classroomApiResponseToClassroom(c))
	} catch (error) {
		throw error
	}
}

export type CreateClassroomServiceProps = {
	name: string
	userId: string
	baner?: {
		uri: string
		base64: string
	}
}
const createClassroom = async (classroom: CreateClassroomServiceProps) => {
	try {
		let bannerId = ""
		if (classroom.baner) {
			const { id } = await classroomApi.uploadClassroomBanner(
				classroom.baner.uri,
				classroom.baner.base64
			)

			bannerId = id
		}
		await classroomApi.createClassroom(classroom.name, classroom.userId, bannerId)
	} catch (error) {
		throw error
	}
}
export const classroomService = { getClassrooms, createClassroom }
