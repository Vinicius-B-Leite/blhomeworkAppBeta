import { Box, CircleImage, PressableBox, Text } from "@/components"
import { Chat, ChatListItem } from "@/modules/chat/models"
import React from "react"
import ImageNotFound from "@/assets/images/ImageNotfound.png"

type ChatItemProps = ChatListItem & {
	onPress: (chat: Chat) => void
}

const ChatItem: React.FC<ChatItemProps> = ({ onPress, chat, unreadMessages }) => {
	const { classroom, id, lastMessage, messages } = chat

	return (
		<PressableBox
			onPress={() => onPress({ classroom, id, lastMessage, messages })}
			flexDirection="row"
			bg="secondsBg"
			p={12}
			gap={14}
			borderRadius={8}
			mb={14}>
			<CircleImage
				size={48}
				source={
					classroom?.bannerUrl ? { uri: classroom.bannerUrl } : ImageNotFound
				}
			/>
			<Box justifyContent="center" flex={1}>
				<Text preset="pMedium" numberOfLines={1}>
					{classroom.title}
				</Text>
				{lastMessage && (
					<Text preset="pSmall" color="secondText" numberOfLines={1}>
						{lastMessage}
					</Text>
				)}
			</Box>

			{unreadMessages > 0 && (
				<Box
					alignSelf="center"
					bg="contrast"
					justifyContent="center"
					alignItems="center"
					height={38}
					width={38}
					borderRadius={9999}>
					<Text preset="pMedium">
						{unreadMessages > 99 ? "+99" : unreadMessages}
					</Text>
				</Box>
			)}
		</PressableBox>
	)
}

export default ChatItem
