import { api, supabase } from "@/api"
import { ClassroomApi } from "./classroomApiTypes"
import {
	ClassroomApiResponse,
	Student,
	StudentApiResponse,
} from "@/modules/classroom/models"
import uuid from "react-native-uuid"
import { getExtension } from "@/utils"
import { decode } from "base64-arraybuffer"
import { mimeTypes } from "@/constant"

export const classroomApi: ClassroomApi = {
	getClassrooms: async (userId: string) => {
		const { data, error } = await supabase
			.from("student")
			.select(`classroom ( * , upload (*))`)
			.eq("user_id", userId)

		if (error) {
			throw new Error(error.message)
		}
		return data as unknown as ClassroomApiResponse[]
	},
	uploadClassroomBanner: async (uri: string, base64: string) => {
		const { downloadUrl, type } = await api.uploadFile({
			base64: base64,
			bucketName: "classroomsBanners",
			uri: uri,
			contentType: getExtension(uri).split(".")[1] as keyof typeof mimeTypes,
		})

		const { data: uploadData, error: errorOnInsert } = await supabase
			.from("upload")
			.insert({
				path_url: downloadUrl,
				type: type,
			})
			.select()

		if (errorOnInsert) {
			throw new Error(errorOnInsert.message)
		}

		return { id: uploadData[0].id }
	},
	getFileUrl: (path: string) => {
		const { data } = supabase.storage.from("classroomsBanners").getPublicUrl(path)

		return data.publicUrl || null
	},
	createClassroom: async (name, userId, bannerId) => {
		const { data, error } = await supabase
			.from("classroom")
			.insert({
				banner_id: bannerId,
				name,
				admin_id: userId,
			})
			.select()

		if (error) {
			throw new Error(error.message)
		}

		await classroomApi.enterClassroom(data![0].id, userId)
		return
	},
	enterClassroom: async (classroomId: string, userId: string) => {
		const { error } = await supabase.from("student").insert({
			classroom_id: classroomId,
			user_id: userId,
		})

		if (error) {
			throw new Error(error.message)
		}

		return
	},
	getClassroomById: async (classroomId: string) => {
		const { data, error, status } = await supabase
			.from("classroom")
			.select("*")
			.eq("id", classroomId)
		const isClassroomNotFound = status === 400 && data === null
		if (isClassroomNotFound) {
			throw new Error("Classroom not found")
		}
		if (error && error.message) {
			throw new Error(error.message)
		}

		return data
	},
	getStudents: async (classroomId: string) => {
		const { data, error } = await supabase
			.from("student")
			.select("user ( * )")
			.eq("classroom_id", classroomId)

		if (error) {
			throw new Error(error.message)
		}

		return data as unknown as StudentApiResponse[]
	},
	updateClassroom: async (classroomId, name, bannerId) => {
		const { data, error } = await supabase
			.from("classroom")
			.update({
				name: name,
				banner_id: bannerId,
				updated_at: new Date().toISOString(),
			})
			.eq("id", classroomId)
			.select()

		if (error) {
			throw new Error(error.message)
		}

		return data![0]
	},
}
