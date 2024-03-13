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
}
