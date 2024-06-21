import { api } from "@/api"
import { CHAT_QUERY_KEYS, chatApi } from "../api"
import { chatAdapter } from "./chatAdapter"
import { getExtension } from "@/utils"
import { mimeTypes } from "@/constant"
import { storage } from "@/storage"
import { ChatListItem, Message } from "./chatTypes"

const getChats = async (userId: string) => {
	try {
		const response = await chatApi.getChats(userId)
		const parsedChat = response?.map?.(chatAdapter.toChat) || []

		const chatsWithUnreadMessages: ChatListItem[] = []
		await Promise.all(
			parsedChat.map(async (chat) => {
				const storageMessages = await storage.getItem<{ data: Message[] }>({
					customKey: JSON.stringify([CHAT_QUERY_KEYS.GET_MESSAGES, chat.id]),
					key: undefined,
				})
				const serverChatMessages = await chatApi.getChatMessages(chat.id)
				const unreadMessages =
					storageMessages && serverChatMessages
						? serverChatMessages.length - storageMessages?.data?.length
						: 0

				const data = {
					chat: chat,
					unreadMessages: unreadMessages,
				}

				chatsWithUnreadMessages.push(data)
			})
		)

		return chatsWithUnreadMessages
	} catch (error) {
		throw error
	}
}

const getChatMessages = async (chatId: string) => {
	try {
		const response = await chatApi.getChatMessages(chatId)

		const parsedMessages = response?.map?.(chatAdapter.toMessage)

		return parsedMessages || []
	} catch (error) {
		throw error
	}
}

const sendMessage = async (props: {
	chatId: string
	message: string | null
	image: {
		base64: string
		uri: string
	} | null
	userId: string
}) => {
	try {
		const { chatId, message, userId, image } = props

		const isImageToSend = image?.base64 && image?.uri

		if (isImageToSend) {
			const uploadResponse = await api.uploadFile({
				base64: image.base64,
				uri: image.uri,
				folder: chatId,
				bucketName: "chat",
				contentType: getExtension(image.uri).split(
					"."
				)[1] as keyof typeof mimeTypes,
			})
			await chatApi.sendMessage(chatId, message, userId, uploadResponse.downloadUrl)
			await chatApi.updateLastMessage(chatId, "Imagem")
			return
		}

		if (message && message.trim() !== "" && !props.image) {
			await chatApi.sendMessage(chatId, message, userId, null)
			await chatApi.updateLastMessage(chatId, message)
		}
	} catch (error) {
		throw error
	}
}

export const chatService = {
	getChats,
	getChatMessages,
	sendMessage,
}
