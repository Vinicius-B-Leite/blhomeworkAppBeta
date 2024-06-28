import { useRouteParams } from "@/hooks"
import { useListenMessagesModelView, useSendMessageModelView } from "../../modelView"
import { useToastDispatch } from "@/store"

import { pickImage } from "@/utils"
import { useState } from "react"

export function useMessagesViewController() {
	const params = useRouteParams("Messages")
	const [messageInput, setMessageInput] = useState("")
	const [imageInput, setImageInput] = useState<{ uri: string; base64: string } | null>(
		null
	)
	const { showToast } = useToastDispatch()

	const { sendMessage, isLoading: isSendingMessage } = useSendMessageModelView({
		chatId: params?.chat.id || "",
		onError: (error) => {
			showToast({
				type: "error",
				message: "Erro ao enviar a mensagem!",
			})
		},
		onSuccess: () => {
			setMessageInput("")
			setImageInput(null)
		},
	})

	const { isLoading, sectionMessages } = useListenMessagesModelView({
		chatId: params?.chat.id || "",
		onError: (error) => {
			showToast({
				type: "error",
				message: "Erro ao buscar as mensagens!",
			})
		},
	})

	const handleChangeMessageInput = (text: string) => {
		setMessageInput(text)
	}

	const handleSelectImage = async () => {
		const result = await pickImage({ allowsEditing: false })

		if (!result || !result.base64) return

		setImageInput({
			base64: result.base64,
			uri: result.uri,
		})
	}

	const handleCleanImageInput = () => {
		setImageInput(null)
	}

	const handleSendMessage = async () => {
		const messageIsImage = imageInput?.base64 && imageInput?.uri
		if (messageIsImage) {
			sendMessage({
				image: imageInput,
				message: null,
			})
			return
		}
		if (messageInput.trim() === "") return

		sendMessage({
			message: messageInput,
			image: null,
		})
	}

	return {
		params,
		sectionMessages,
		isLoading,
		messageInput,
		handleChangeMessageInput,
		handleSelectImage,
		isSendingMessage,
		handleSendMessage,
		imageInput,
		handleCleanImageInput,
	}
}
