import { useEffect, useMemo, useState } from "react"

import { useGetMessagesModelView } from "./useGetMessages.modelVIew"
import { formatDate, saveDataInStorageWithTimestamp } from "@/utils"

import { Message } from "../models"
import { CoumnModelViewProps } from "@/types"

import { useNavigation } from "@react-navigation/native"
import { CHAT_QUERY_KEYS } from "../api"
import { useQueryClient } from "@tanstack/react-query"
import { useAuth } from "@/modules/auth/context"
import { chatService } from "../models/chatService"

type SectionMessages = {
	title: string
	data: Message[]
}

type useListenMessagesModelViewProps = CoumnModelViewProps<string, void> & {
	chatId: string
}
export function useListenMessagesModelView({
	chatId,
	onError,
}: useListenMessagesModelViewProps) {
	const [messages, setMessages] = useState<Message[]>([])
	const navigation = useNavigation()
	const client = useQueryClient()
	const { user } = useAuth()
	const queryKey = [CHAT_QUERY_KEYS.GET_MESSAGES, chatId]
	const { isLoading } = useGetMessagesModelView({
		chatId: chatId,
		onError: (error) => {
			onError?.(error)
		},
		onSuccess: (m) => {
			setMessages(m)
		},
		queryKey,
	})

	const sectionMessages: SectionMessages[] = useMemo(() => {
		const groupedMessagesByDate = messages.reduce((acc, message) => {
			const lastSection = acc[acc.length - 1]

			const formattedDate = formatDate(new Date(message.createdAt))
			if (!lastSection || lastSection.title !== formattedDate) {
				acc.push({
					title: formattedDate,
					data: [message],
				})
			} else {
				lastSection.data.push(message)
			}
			return acc
		}, [] as SectionMessages[])

		const orderedMessages = groupedMessagesByDate.map((section) => ({
			...section,
			data: section.data.reverse(),
		}))

		return orderedMessages.reverse()
	}, [messages])

	const updateChatList = async () => {
		client.invalidateQueries({
			queryKey: [CHAT_QUERY_KEYS.GET_CHATS, user!.uid],
		})
	}
	useEffect(() => {
		navigation.addListener("beforeRemove", (ac) => {
			saveDataInStorageWithTimestamp(messages, queryKey)
			updateChatList()
		})

		return () => {
			navigation.removeListener("beforeRemove", () => {})
		}
	}, [navigation, messages])

	const receviMessage = () => {
		if (!chatId) return

		const unSub = chatService.onMessageReceived((message) => {
			setMessages((prev) => [...prev, message])
		}, chatId)

		return unSub
	}

	useEffect(() => {
		const unsub = receviMessage()
		return () => {
			unsub?.()
		}
	}, [chatId])

	return {
		sectionMessages,
		isLoading,
	}
}
