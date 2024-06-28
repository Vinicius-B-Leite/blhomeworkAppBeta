import { classroomAdapter } from "@/modules/classroom/models"
import { Chat, ChatApiResponse, Message, MessageApiResponse } from "./chatTypes"
import { profileAdapert } from "@/modules/profile/models/profileAdapter"

const toChat = (chat: ChatApiResponse): Chat => {
	return {
		classroom: classroomAdapter.classroomApiResponseToClassroom({
			classroom: chat.classroom,
		}),
		id: chat.id.toString(),
		lastMessage: chat.last_message,
		messages: chat.messages.map(toMessage),
	}
}

const toMessage = (message: MessageApiResponse): Message => {
	return {
		id: message.id.toString(),
		chatId: message.chatId.toString(),
		message: message?.message || null,
		userId: message.userId,
		uploadUrl: message.uploadUrl || null,
		createdAt: new Date(message.created_at),
		deletedAt: message.deleted_at ? new Date(message.deleted_at) : null,
		updatedAt: message.updated_at ? new Date(message.updated_at) : null,
		user: {
			avatarUrl: message.user.avatar_url || null,
			email: message.user.email,
			id: message.user.id,
			username: message.user.user_name,
		},
	}
}

export const chatAdapter = {
	toChat,
	toMessage,
}
