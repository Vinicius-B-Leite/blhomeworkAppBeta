import { Box, Container, Icon, Input, PressableBox, Text } from "@/components"
import React from "react"
import { useMessagesViewController } from "./useMessages.viewController"
import { SectionList } from "react-native"
import MessageItem from "./components/MessageItem/MessageItem"
import { Spinner } from "@/components/Spinner/Spinner"
import ImageView from "@/components/ImageView/ImageView"

const MessagesScreen: React.FC = () => {
	const {
		params,
		isLoading,
		sectionMessages,
		handleChangeMessageInput,
		messageInput,
		handleSelectImage,
		isSendingMessage,
		handleSendMessage,
		imageInput,
		handleCleanImageInput,
	} = useMessagesViewController()

	if (isLoading) {
		return (
			<Container alignItems="center" justifyContent="center">
				<Spinner color="contrast" size={22} />
			</Container>
		)
	}

	return (
		<>
			<Container
				goBack={{
					title: params?.chat.classroom.title || "Chat",
				}}>
				<Box flex={1} mt={36}>
					<SectionList
						inverted
						sections={sectionMessages}
						renderItem={({ item }) => <MessageItem message={item} />}
						renderSectionFooter={({ section: { title } }) => (
							<Text preset="pSmall" textAlign="center" mt={12}>
								{title}
							</Text>
						)}
						showsVerticalScrollIndicator={false}
						stickySectionHeadersEnabled={false}
					/>
				</Box>

				<Input
					value={messageInput}
					onChangeText={handleChangeMessageInput}
					placeholder="Digite sua mensage"
					multiline
					RightIcon={
						<Box flexDirection="row" gap={14} alignItems="center">
							<PressableBox onPress={handleSelectImage}>
								<Icon name="image" color="contrast" size={20} />
							</PressableBox>

							<PressableBox
								onPress={handleSendMessage}
								disabled={isSendingMessage}
								backgroundColor="contrast"
								p={4}
								borderRadius={9999}>
								{isSendingMessage ? (
									<Spinner size={22} />
								) : (
									<Icon name="send" size={24} />
								)}
							</PressableBox>
						</Box>
					}
					boxProps={{ maxHeight: "40%", mt: 24 }}
				/>
			</Container>
			<ImageView
				uri={imageInput?.uri || ""}
				visible={!!imageInput?.uri}
				onClose={handleCleanImageInput}
				onSend={handleSendMessage}
			/>
		</>
	)
}

export default MessagesScreen
