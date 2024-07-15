import { classroomApi } from "@/modules/classroom/api"
import { classroomAdapter } from "./classroomAdapter"
import { convertUriToBase64 } from "@/utils"
import { taskApi } from "@/modules/task/api"
import { chatApi } from "@/modules/chat/api"

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
		if (classroom?.bannerUri) {
			const base64 = await convertUriToBase64(classroom.bannerUri)
			const { id } = await classroomApi.uploadClassroomBanner(
				classroom.bannerUri,
				base64
			)

			bannerId = id
		}
		const classroomResponse = await classroomApi.createClassroom(
			classroom.name,
			classroom.userId,
			bannerId
		)
		await Promise.all([
			taskApi.createSubject(classroomResponse.classroom.id, {
				name: "Matemática",
				shortName: "MAT",
				color: "rgb(255, 0, 0)",
			}),
			taskApi.createSubject(classroomResponse.classroom.id, {
				name: "Português",
				shortName: "POT",
				color: "rgb(0, 0, 255)",
			}),
			chatApi.createChat(classroomResponse.classroom.id),
		])
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

		if (!data) return null

		return classroomAdapter.classroomApiResponseToClassroom(data)
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

const leaveClassroom = async (classroomId: string, userId: string) => {
	try {
		const [classroom, students] = await Promise.all([
			getClassroomById(classroomId),
			getStudents(classroomId),
		])

		const isAdmin = classroom?.adminId === userId

		if (students.length > 1 && isAdmin) {
			throw new Error("Promote another student to admin before leaving the room")
		}

		if (students.length === 1) {
			await deleteClassroom(classroomId)
		}

		await classroomApi.leaveClassroom(classroomId, userId)
	} catch (error) {
		throw error
	}
}

const deleteClassroom = async (classroomId: string) => {
	try {
		await classroomApi.deleteClassroom(classroomId)
		const chat = await chatApi.getChatByClassroomId(classroomId)
		if (!chat) return
		await Promise.all([
			chatApi.deleteAllMessagesFromChat(chat.id.toString()),
			chatApi.deleteChatByClassroomId(classroomId),
		])
	} catch (error) {
		throw error
	}
}
const getStudentById = async (studentId: string, classroomId: string) => {
	try {
		const response = await classroomApi.getStudentById(studentId, classroomId)

		return response ? classroomAdapter.studentApiResponseToStudent(response) : null
	} catch (error) {
		throw error
	}
}

const promoteStudentToClassroomAdmin = async (studentId: string, classroomId: string) => {
	try {
		const [classroom, student] = await Promise.all([
			getClassroomById(classroomId),
			getStudentById(studentId, classroomId),
		])

		const classroomExist = !!classroom
		const studentExist = !!student

		if (!classroomExist) throw new Error("Classroom not found")
		if (!studentExist) throw new Error("Student not found")

		await classroomApi.promoteStudentToClassroomAdmin(studentId, classroomId)
	} catch (error) {
		throw error
	}
}
const removeStudent = async (classroomId: string, studentId: string) => {
	try {
		const [classroom, student] = await Promise.all([
			getClassroomById(classroomId),
			getStudentById(studentId, studentId),
		])

		const classroomExists = !!classroom
		const studentExists = !!student

		if (!classroomExists || !studentExists) {
			throw new Error("Classroom or student not found")
		}

		await classroomApi.removeStudent(classroomId, studentId)
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
	leaveClassroom,
	promoteStudentToClassroomAdmin,
	getClassroomById,
	removeStudent,
}
