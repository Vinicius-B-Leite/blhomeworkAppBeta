import { classroomApi } from "@/modules/classroom/api"
import { classroomAdapter } from "./classroomAdapter"
import { convertUriToBase64 } from "@/utils"

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
	bannerUri?: string
	classroomId?: string
}
const createClassroom = async (classroom: CreateClassroomServiceProps) => {
	try {
		let bannerId = ""
		if (classroom.bannerUri) {
			const base64 = await convertUriToBase64(classroom.bannerUri)
			const { id } = await classroomApi.uploadClassroomBanner(
				classroom.bannerUri,
				base64
			)

			bannerId = id
		}
		await classroomApi.createClassroom(classroom.name, classroom.userId, bannerId)
	} catch (error) {
		throw error
	}
}

export type UpdateClassroomServiceProps = Omit<
	CreateClassroomServiceProps,
	"userId" | "baner"
> & {
	bannerUri?: string
}
const updateClassroom = async (classroom: UpdateClassroomServiceProps) => {
	try {
		if (!classroom.classroomId) throw new Error("Classroom id is required")

		let bannerId = ""
		const wasImageUpdated =
			classroom.bannerUri && !classroom.bannerUri.includes("https://")
		if (wasImageUpdated && classroom.bannerUri) {
			const base64 = await convertUriToBase64(classroom.bannerUri)
			const { id } = await classroomApi.uploadClassroomBanner(
				classroom.bannerUri,
				base64
			)

			bannerId = id
		}
		await classroomApi.updateClassroom(
			classroom.classroomId,
			classroom.name,
			bannerId.length > 0 ? bannerId : undefined
		)
	} catch (error) {
		throw error
	}
}

const enterClassroom = async (classroomCode: string, userId: string) => {
	try {
		const classroomExists = await getClassroomById(classroomCode)
		if (classroomExists) {
			await classroomApi.enterClassroom(classroomCode, userId)
		}
	} catch (error) {
		throw error
	}
}

const getClassroomById = async (classroomId: string) => {
	try {
		const data = await classroomApi.getClassroomById(classroomId)

		if (!data) return []
		return classroomAdapter.classroomApiResponseToClassroom(data[0])
	} catch (error) {
		throw error
	}
}

const getStudents = async (classroomId: string) => {
	try {
		const response = await classroomApi.getStudents(classroomId)

		return response.map(classroomAdapter.studentApiResponseToStudent)
	} catch (error) {
		throw error
	}
}
export const classroomService = {
	getClassrooms,
	createClassroom,
	enterClassroom,
	getStudents,
	updateClassroom,
}
