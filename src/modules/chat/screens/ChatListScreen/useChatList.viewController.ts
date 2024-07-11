import { useCallback, useMemo, useState } from "react"
import { useGetChatsModelView } from "../../modelView"
import { useDebouncedValue } from "@/hooks"
import { useFocusEffect, useNavigation } from "@react-navigation/native"
import { Chat } from "../../models"
import { useToastDispatch } from "@/store"

export function useChatListViewController() {
	const [searchChatInput, setSearchChatInput] = useState("")
	const [isSearching, setIsSearching] = useState(false)
	const debouncedSearchChatInput = useDebouncedValue(searchChatInput, 500)
	const { showToast } = useToastDispatch()
	const naviagte = useNavigation()
	const { chats, isLoading, refresh } = useGetChatsModelView({
		onError: (error) => {
			showToast({
				type: "error",
				message: "Erro ao buscar as conversas!",
			})
		},
	})

	const filteredChats = useMemo(() => {
		if (!chats || !debouncedSearchChatInput) return []
		setIsSearching(true)
		const chatsThatIncludesSearchChatInputInTitle = chats?.filter((chat) => {
			const classroomName = chat.chat.classroom.title.toLowerCase()
			const includesClassroom = classroomName.includes(
				debouncedSearchChatInput.toLowerCase()
			)
			return includesClassroom
		})

		setIsSearching(false)
		return chatsThatIncludesSearchChatInputInTitle
	}, [chats, debouncedSearchChatInput])

	const navigateToChat = useCallback((chat: Chat) => {
		naviagte.navigate("ChatRoutes", {
			screen: "Messages",
			params: {
				chat: chat,
			},
		})
	}, [])
	return {
		chats,
		isLoading,
		refresh,
		searchChatInput,
		changeInputValue: setSearchChatInput,
		isSearching: debouncedSearchChatInput !== searchChatInput || isSearching,
		filteredChats,
		navigateToChat,
	}
}
