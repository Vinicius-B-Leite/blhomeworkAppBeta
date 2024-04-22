import { api, supabase } from "@/api"
import { TaskApi } from "./taskApiTypes"

export const taskApi: TaskApi = {
	getTaskList: async (classroomId) => {
		const { data, error } = await supabase
			.from("task")
			.select("*, classroom ( * ), subject ( * )")
			.eq("classroom_id", classroomId)
			.is("deleted_at", null)
			.gte("dead_line", new Date().toISOString())

		if (error) {
			throw new Error(error.message)
		}

		return data?.length > 0 ? data : []
	},
	createSubject: async (classroomId, subject) => {
		const { data, error } = await supabase
			.from("subject")
			.insert({
				title: subject.name,
				color_rgb: subject.color,
				short_name: subject.shortName,
				classroom_id: classroomId,
			})
			.select()

		if (error) {
			throw new Error(error.message)
		}

		return data?.length > 0 ? data[0] : null
	},
	getSubjectList: async (classroomId) => {
		const { data, error } = await supabase
			.from("subject")
			.select()
			.eq("classroom_id", classroomId)
			.is("deleted_at", null)

		if (error) {
			throw new Error(error.message)
		}

		return data?.length > 0 ? data : []
	},
	createTask: async (props) => {
		const { data, error } = await supabase
			.from("task")
			.insert({
				title: props.task.title,
				description: props.task.description,
				dead_line: props.task.deadLine.toISOString(),
				subject_id: props.subjectId,
				classroom_id: props.classroomId,
			})
			.select("*, classroom ( * ), subject ( * )")

		if (error) {
			throw new Error(error.message)
		}
		return data?.length > 0 ? data[0] : null
	},
	createUpload: async (pathUrl, type, taskId) => {
		const { data, error } = await supabase
			.from("upload")
			.insert([
				{
					path_url: pathUrl,
					type,
					task_id: taskId,
				},
			])
			.select()

		if (error) {
			throw new Error(error.message)
		}
	},
	getUploads: async (taskId) => {
		const { data, error } = await supabase
			.from("upload")
			.select()
			.eq("task_id", taskId)

		if (error) {
			throw new Error(error.message)
		}

		return data?.length > 0 ? data : []
	},
	deltedSubject: async (subjectId) => {
		const { error } = await supabase
			.from("subject")
			.update({
				deleted_at: new Date().toISOString(),
			})
			.eq("id", subjectId)

		if (error) {
			throw new Error(error.message)
		}
	},
	updateSubject: async (subject) => {
		const { data, error } = await supabase
			.from("subject")
			.update({
				title: subject.name,
				color_rgb: subject.color,
				short_name: subject.shortName,
				updated_at: new Date().toISOString(),
			})
			.eq("id", subject.id)
			.select()

		if (error) {
			throw new Error(error.message)
		}

		return data?.length > 0 ? data[0] : null
	},
	deleteTask: async (taskId) => {
		const { error } = await supabase
			.from("task")
			.update({
				deleted_at: new Date().toISOString(),
			})
			.eq("id", taskId)

		if (error) {
			throw new Error(error.message)
		}
	},
	updateTask: async (task) => {
		const { data, error } = await supabase
			.from("task")
			.update({
				title: task.title,
				description: task.description,
				dead_line: task.deadLine.toISOString(),
				subject_id: task.subjectId,
				updated_at: new Date().toISOString(),
			})
			.eq("id", task.id)
			.select("*, classroom ( * ), subject ( * )")

		if (error) {
			throw new Error(error.message)
		}

		return data?.length > 0 ? data[0] : null
	},
	deleteUpload: async (uploadId) => {
		const { error } = await supabase.from("upload").delete().eq("id", uploadId)

		if (error) {
			throw new Error(error.message)
		}
	},
}
