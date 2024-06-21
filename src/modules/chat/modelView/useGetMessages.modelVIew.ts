import { useHandleGet } from "@/hooks"
import { chatService } from "../models/chatService"

import { CoumnModelViewProps } from "@/types"
import { Message } from "../models"

type useGetMessagesModelViewProps = CoumnModelViewProps<string, Message[]> & {
	chatId: string
	queryKey: (string | number | boolean | null | undefined)[]
}

export function useGetMessagesModelView({
	chatId,
	onError,
	onSuccess,
	queryKey,
}: useGetMessagesModelViewProps) {
	const { data, isLoading } = useHandleGet({
		getFn: () => chatService.getChatMessages(chatId),
		queryKey: queryKey,
		onSuccess,
		onError,
		enabled: !!chatId,
	})

	return {
		messages: data || [],
		isLoading,
	}
}
