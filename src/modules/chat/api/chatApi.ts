import { supabase } from "@/api"
import { ChatApi } from "./chatApiType"

export const chatApi: ChatApi = {
	getChats: async (userId: string) => {
		const { data: classrooms, error: classroomError } = await supabase
			.from("student")
			.select("*")
			.eq("user_id", userId)

		if (classroomError?.message) {
			throw new Error(classroomError.message)
		}
		const classroomsIds = classrooms?.map((student: any) => student.classroom_id)

		if (!classroomsIds) return null

		const { data: chats, error: chatError } = await supabase
			.from("chat")
			.select("*, classroom (*, upload (*)), messages (*, user (*))")
			.in("classroomId", classroomsIds)

		if (chatError?.message) {
			throw new Error(chatError.message)
		}

		return chats
	},
	getChatMessages: async (chatId: string) => {
		const { data: messages, error } = await supabase
			.from("messages")
			.select("*, user (*)")
			.eq("chatId", chatId)
			.order("created_at", { ascending: true })

		if (error?.message) {
			throw new Error(error.message)
		}

		return messages
	},
	sendMessage: async (chatId, message, userId, imageUrl) => {
		const { data, error } = await supabase.from("messages").insert([
			{
				chatId,
				message,
				userId,
				uploadUrl: imageUrl,
			},
		])

		if (error?.message) {
			throw new Error(error.message)
		}

		return
	},
	createChat: async (classroomId: string) => {
		const { data, error } = await supabase.from("chat").insert([{ classroomId }])

		if (error?.message) {
			throw new Error(error.message)
		}
	},
	updateLastMessage: async (chatId: string, message: string) => {
		const { data, error } = await supabase
			.from("chat")
			.update({ last_message: message })
			.eq("id", chatId)

		if (error?.message) {
			throw new Error(error.message)
		}
	},
	deleteAllMessagesFromChat: async (chatId: string) => {
		const { error } = await supabase.from("messages").delete().eq("chatId", chatId)

		if (error?.message) {
			throw new Error(error.message)
		}
	},
	deleteChatByClassroomId: async (classroomId: string) => {
		const { error } = await supabase
			.from("chat")
			.delete()
			.eq("classroomId", classroomId)

		if (error?.message) {
			throw new Error(error.message)
		}
	},
	getChatByClassroomId: async (classroomId: string) => {
		const { data, error } = await supabase
			.from("chat")
			.select("*")
			.eq("classroomId", classroomId)

		if (error?.message) {
			throw new Error(error.message)
		}

		return data?.[0]
	},
}
