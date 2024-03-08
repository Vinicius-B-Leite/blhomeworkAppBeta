import { supabase } from "@/api"
import { ClassroomApi } from "./classroomApiTypes"
import { ClassroomApiResponse } from "@/modules/classroom/models"

export const classroomApi: ClassroomApi = {
	getClassrooms: async (userId: string) => {
		const { data, error } = await supabase
			.from("student")
			.select(`classroom (*)`)
			.eq("user_id", userId)

		if (error) {
			throw new Error(error.message)
		}
		return data as unknown as ClassroomApiResponse[]
	},
}
