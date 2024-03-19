import { api, supabase } from "@/api"
import { TaskApi } from "./taskApiTypes"

export const taskApi: TaskApi = {
	getTaskList: async (classroomId) => {
		const { data, error } = await supabase
			.from("task")
			.select("*, classroom ( * ), subject ( * )")
			.eq("classroom_id", classroomId)

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
		console.log(data, error)
	},
}
