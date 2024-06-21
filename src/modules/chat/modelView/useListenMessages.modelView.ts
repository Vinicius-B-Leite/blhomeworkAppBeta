import { useEffect, useMemo, useState } from "react"

import { useGetMessagesModelView } from "./useGetMessages.modelVIew"
import { formatDate, saveDataInStorageWithTimestamp } from "@/utils"
import { supabase } from "@/api"
import { authService } from "@/modules/auth/models"

import { Message } from "../models"
import { CoumnModelViewProps } from "@/types"

import { useNavigation } from "@react-navigation/native"
import { CHAT_QUERY_KEYS } from "../api"

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

	useEffect(() => {
		navigation.addListener("beforeRemove", (ac) => {
			saveDataInStorageWithTimestamp(messages, queryKey)
		})

		return () => {
			navigation.removeListener("beforeRemove", () => {})
		}
	}, [navigation, messages])

	useEffect(() => {
		if (!chatId) return
		const channels = supabase.channel("custom-filter-channel")

		channels
			.on(
				"postgres_changes",
				{
					event: "INSERT",
					schema: "public",
					table: "messages",
					filter: `chatId=eq.${chatId}`,
				},
				async (payload) => {
					if (!payload?.new?.userId) return

					const user = await authService.getUserData(payload.new.userId)

					if (!user) return

					const message: Message = {
						chatId: payload.new.chatId,
						id: payload.new.id.toString(),
						message: payload.new.message,
						createdAt: new Date(payload.new.created_at),
						updatedAt: null,
						deletedAt: null,
						uploadUrl: payload.new.uploadUrl,
						userId: payload.new.userId,
						user: {
							avatarUrl: user.avatar_url || null,
							email: user.email,
							username: user.user_name,
							id: user.id,
						},
					}
					setMessages((prev) => [...prev, message])
				}
			)
			.subscribe()

		return () => {
			supabase.removeChannel(channels)
		}
	}, [chatId])

	return {
		sectionMessages,
		isLoading,
	}
}
