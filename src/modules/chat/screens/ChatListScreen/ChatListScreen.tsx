import React from "react"
import { useChatListViewController } from "./useChatList.viewController"
import { Box, Container, Icon, Input, List } from "@/components"
import ChatItem from "./components/ChatItem"
import { Spinner } from "@/components/Spinner/Spinner"

export const ChatListScreen: React.FC = () => {
	const {
		chats,
		isLoading,
		refresh,
		searchChatInput,
		changeInputValue,
		filteredChats,
		isSearching,
		navigateToChat,
	} = useChatListViewController()

	return (
		<Container
			goBack={{
				title: "Conversas",
			}}>
			<Input
				value={searchChatInput}
				onChangeText={changeInputValue}
				RightIcon={isSearching ? <Spinner size={24} /> : undefined}
				placeholder="Pesquisar conversa"
				LeftIcon={<Icon name="search" size={24} />}
				boxProps={{
					mt: 24,
				}}
			/>

			<Box mt={24} flex={1}>
				<List
					data={searchChatInput ? filteredChats : chats}
					isLoading={isLoading}
					refresh={refresh}
					renderItem={({ item }) => (
						<ChatItem {...item} onPress={navigateToChat} />
					)}
				/>
			</Box>
		</Container>
	)
}
