import { ChatApiResponse, MessageApiResponse } from "../models"

export type ChatApi = {
	getChats: (userId: string) => Promise<ChatApiResponse[] | null>
	getChatMessages: (chatId: string) => Promise<MessageApiResponse[] | null>
	sendMessage: (
		chatId: string,
		message: string | null,
		userId: string,
		imageUrl: string | null
	) => Promise<void>
	createChat: (classroomId: string) => Promise<void>
	updateLastMessage: (chatId: string, message: string) => Promise<void>
	deleteAllMessagesFromChat: (classroomId: string) => Promise<void>
	deleteChatByClassroomId: (classroomId: string) => Promise<void>
	getChatByClassroomId: (classroomId: string) => Promise<ChatApiResponse | null>
}
