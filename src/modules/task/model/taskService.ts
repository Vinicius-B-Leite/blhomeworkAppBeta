import { createTaskProps, taskApi } from "@/modules/task/api"
import { taskAdapter } from "./taskAdapter"
import { Subject, Task, File } from "./taskTypes"
import { UploadFileProps, api } from "@/api"
import { getExtension } from "@/utils"
import { mimeTypes } from "@/constant"

const getUploads = async (taskId: string) => {
	try {
		const data = await taskApi.getUploads(taskId)

		return data.map(taskAdapter.uploadApiResponseToUpload)
	} catch (error) {
		throw error
	}
}

const getTaskList = async (classroomId: string) => {
	try {
		const taskList = await taskApi.getTaskList(classroomId)
		const uploadList = await Promise.all(
			taskList.map(async (task) => {
				return await getUploads(task.id)
			})
		)

		return taskList.map((task) =>
			taskAdapter.taskApiResponseToTask(task, uploadList.flat())
		)
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
	task: createTaskProps["task"],
	classroomId: string,
	subjectId: string,
	uploads?: File[]
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
			const uploads = await Promise.all(files.map((file) => api.uploadFile(file)))
			if (uploads.length > 0) {
				await Promise.all(
					uploads.map(async (file) => {
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

const deleteSubject = async (subjectId: string) => {
	try {
		await taskApi.deltedSubject(subjectId)
	} catch (error) {
		throw error
	}
}

const updateSubject = async (subject: Subject) => {
	try {
		const data = await taskApi.updateSubject(subject)

		return taskAdapter.subjectApiResponseToSubject(data)
	} catch (error) {
		throw error
	}
}

const deleteTask = async (taskId: string) => {
	try {
		await taskApi.deleteTask(taskId)
	} catch (error) {
		throw error
	}
}

const updateTask = async (
	task: Omit<Task, "subject" | "uploads">,
	subjectId: string,
	files?: File[]
) => {
	try {
		const data = await taskApi.updateTask({
			deadLine: task.deadLine,
			title: task.title,
			description: task.description,
			id: task.id,
			subjectId,
		})
		if (files) {
			const filesAlreadyInBucket = files?.filter((file) => {
				const isFileInBucket = file.uri.includes("http")
				return isFileInBucket
			})
			const filesToUpload = files?.filter((file) => {
				const isFileInBucket = file.uri.includes("http")
				return !isFileInBucket
			})

			const filesUploaded = await Promise.all(
				filesToUpload?.map(async (file) => {
					return await api.uploadFile({
						uri: file.uri,
						base64: file.base64,
						bucketName: "task",
						contentType: getExtension(file.uri).split(
							"."
						)[1] as keyof typeof mimeTypes,
					})
				}) || []
			)

			if (filesUploaded.length > 0) {
				await Promise.all(
					filesUploaded.map(async (file) => {
						await taskApi.createUpload(file.downloadUrl, file.type, data.id)
					})
				)
			}

			const allFiles = await getUploads(data.id)
			const filesUrls = [
				...filesAlreadyInBucket.map((f) => f.uri),
				...filesUploaded.map((f) => f.downloadUrl),
			]

			const filesToDelete = allFiles.filter(
				(file) => !filesUrls.includes(file.donwloadUrl)
			)

			if (filesToDelete.length > 0) {
				await Promise.all(
					filesToDelete.map(async (file) => {
						await taskApi.deleteUpload(file.id)
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
	deleteSubject,
	updateSubject,
	deleteTask,
	updateTask,
}
