import { ClassroomApiResponse, ClassroomType } from "@/modules/classroom/models"

export type ChatApiResponse = {
	classroom: ClassroomApiResponse["classroom"]
	classroomId: ClassroomApiResponse["classroom"]["id"]
	id: number
	last_message: string | null
	messages: MessageApiResponse[]
}

export type MessageApiResponse = {
	chatId: ChatApiResponse["id"]
	id: number
	message: string | null
	created_at: string
	updated_at: string | null
	deleted_at: string | null
	uploadUrl: null | string
	userId: string
	user: {
		avatar_url: string | null
		email: string
		id: string
		user_name: string
	}
}

export type Chat = {
	classroom: ClassroomType
	id: string
	lastMessage: string | null
	messages: Message[]
}

export type ChatListItem = {
	chat: Chat
	unreadMessages: number
}

export type Message = {
	chatId: Chat["id"]
	id: string
	message: string | null
	createdAt: Date
	updatedAt: Date | null
	deletedAt: Date | null
	uploadUrl: string | null
	userId: string
	user: {
		avatarUrl: string | null
		email: string
		username: string
		id: string
	}
}

export type SubscribeMessagePayloadResponse = {
	commit_timestamp: string
	errors: null
	eventType: string
	new: {
		chatId: number
		created_at: string
		deleted_at: null
		id: number
		message: string
		updated_at: null
		uploadId: null
		userId: string
	}
	old: {}
	schema: "public"
	table: "messages"
}
