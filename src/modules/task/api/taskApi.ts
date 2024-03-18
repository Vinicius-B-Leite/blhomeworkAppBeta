import { supabase } from "@/api"
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
}
