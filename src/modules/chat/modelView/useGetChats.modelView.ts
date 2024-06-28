import { useHandleGet } from "@/hooks"
import { chatService } from "../models/chatService"
import { useAuth } from "@/modules/auth/context"
import { CHAT_QUERY_KEYS } from "../api"
import { CoumnModelViewProps } from "@/types"

type UseGetChatsModelViewProps = CoumnModelViewProps<string, void>

export function useGetChatsModelView(props: UseGetChatsModelViewProps) {
	const { user } = useAuth()
	const { data, isLoading, refresh } = useHandleGet({
		getFn: () => chatService.getChats(user!.uid),
		queryKey: [CHAT_QUERY_KEYS.GET_CHATS, user!.uid],
		enabled: !!user?.uid,
		onError: (error) => props.onError && props.onError(error),
	})

	return {
		chats: data,
		isLoading: isLoading,
		refresh: refresh,
	}
}
