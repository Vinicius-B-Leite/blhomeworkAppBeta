import { taskApi } from "@/modules/task/api"
import { taskAdapter } from "./taskAdapter"
import { Subject, Task, Upload } from "./taskTypes"
import { UploadFileProps, api } from "@/api"
import { getExtension } from "@/utils"
import { mimeTypes } from "@/constant"

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

const createTask = async (
	task: Omit<Task, "id" | "subject">,
	classroomId: string,
	subjectId: string,
	uploads?: Upload[]
) => {
	try {
		const data = await taskApi.createTask({
			classroomId,
			subjectId,
			task: {
				deadLine: task.deadLine,
				title: task.title,
				description: task.description,
			},
		})

		const files: UploadFileProps[] =
			uploads?.map((upload) => {
				return {
					name: upload.name,
					uri: upload.uri,
					extension: upload.extension,
					base64: upload.base64,
					bucketName: "task",
					contentType: getExtension(upload.uri).split(
						"."
					)[1] as keyof typeof mimeTypes,
				}
			}) || []

		if (files.length > 0) {
			const res = await Promise.all(files.map((file) => api.uploadFile(file)))
			if (res.length > 0) {
				await Promise.all(
					res.map(async (file) => {
						await taskApi.createUpload(file.downloadUrl, file.type, data.id)
					})
				)
			}
		}

		return taskAdapter.taskApiResponseToTask(data)
	} catch (error) {
		throw error
	}
}
export const taskService = {
	getTaskList,
	createSubject,
	getSubjectList,
	createTask,
}
