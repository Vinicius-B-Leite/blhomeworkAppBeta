import { taskApi } from "@/modules/task/api"
import { taskAdapter } from "./taskAdapter"
import { Subject } from "./taskTypes"

const getTaskList = async (classroomId: string) => {
	try {
		const data = await taskApi.getTaskList(classroomId)

		return data.map(taskAdapter.taskApiResponseToTask)
	} catch (error) {
		throw error
	}
}

const createSubject = async (classroomId: string, subject: Omit<Subject, "id">) => {
	try {
		const data = await taskApi.createSubject(classroomId, subject)

		return taskAdapter.subjectApiResponseToSubject(data)
	} catch (error) {
		throw error
	}
}

const getSubjectList = async (classroomId: string) => {
	try {
		const data = await taskApi.getSubjectList(classroomId)

		return data.map(taskAdapter.subjectApiResponseToSubject)
	} catch (error) {
		throw error
	}
}
export const taskService = {
	getTaskList,
	createSubject,
	getSubjectList,
}
