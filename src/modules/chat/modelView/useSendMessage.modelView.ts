import { useMutation } from "@tanstack/react-query"
import { CHAT_QUERY_KEYS } from "../api"
import { chatService } from "../models/chatService"
import { useAuth } from "@/modules/auth/context"
import { CoumnModelViewProps } from "@/types"

type UseSendMessageModelViewProps = CoumnModelViewProps<string, void> & {
	chatId: string
}

type mutationFnProps = {
	message: string | null
	image: {
		base64: string
		uri: string
	} | null
}

export function useSendMessageModelView(props: UseSendMessageModelViewProps) {
	const { user } = useAuth()

	const { mutate, isPending } = useMutation<void, Error, mutationFnProps>({
		mutationKey: [CHAT_QUERY_KEYS.SEND_MESSAGE],
		mutationFn: (mutationProps) => {
			const isImageToSend = mutationProps.image?.base64 && mutationProps.image?.uri

			if (isImageToSend) {
				return chatService.sendMessage({
					message: null,
					userId: user!.uid,
					chatId: props.chatId,
					image: mutationProps.image,
				})
			}

			return chatService.sendMessage({
				message: mutationProps.message,
				userId: user!.uid,
				chatId: props.chatId,
				image: null,
			})
		},
		retry: false,
		gcTime: Infinity,
		onError: (error) => {
			props?.onError && props.onError(error.message)
		},
		onSuccess: () => {
			props?.onSuccess && props.onSuccess()
		},
	})

	return {
		sendMessage: mutate,
		isLoading: isPending,
	}
}
