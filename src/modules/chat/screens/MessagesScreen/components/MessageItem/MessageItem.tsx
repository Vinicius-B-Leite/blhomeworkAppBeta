import { Box, CircleImage, Image, Text } from "@/components"
import { useAuth } from "@/modules/auth/context"
import { Message } from "@/modules/chat/models"
import { Image as RNImage } from "react-native"
import React, { useEffect } from "react"
import { LinearGradient } from "expo-linear-gradient"
import { useAppTheme } from "@/hooks"
import { Dimensions } from "react-native"
import ResponsiveImage from "../ResponsiveImage/ResponsiveImage"

type MessageItemProps = {
	message: Message
}
const MessageItem: React.FC<MessageItemProps> = ({ message }) => {
	const { user } = useAuth()
	const theme = useAppTheme()
	const isUserOwnerMessage = user?.uid === message.user.id
	const align = isUserOwnerMessage ? "flex-end" : "flex-start"
	const gradientColors = isUserOwnerMessage
		? [theme.colors.secondsBg, theme.colors.secondsBg]
		: [theme.colors.lightBlue600, theme.colors.lightBlue700]
	const messageIsImage = !!message.uploadUrl

	return (
		<Box
			alignSelf={align}
			flexDirection="row"
			gap={14}
			marginVertical={12}
			maxWidth={"80%"}>
			{!isUserOwnerMessage && (
				<CircleImage
					source={
						message.user.avatarUrl
							? { uri: message.user.avatarUrl }
							: require("@/assets/images/ImageNotfound.png")
					}
					size={40}
				/>
			)}

			{messageIsImage && message!.uploadUrl ? (
				<ResponsiveImage url={message.uploadUrl} />
			) : (
				<Box>
					{!isUserOwnerMessage && (
						<Text preset="pSmall">{message.user.username}</Text>
					)}
					<LinearGradient
						style={{
							paddingVertical: theme.spacing[8],
							paddingHorizontal: theme.spacing[14],
							borderRadius: theme.borderRadii[10],
							borderTopLeftRadius: isUserOwnerMessage
								? theme.borderRadii[10]
								: 0,
							borderTopRightRadius: isUserOwnerMessage
								? 0
								: theme.borderRadii[10],
						}}
						colors={gradientColors}
						start={{ x: 0, y: 0 }}
						end={{
							x: 1,
							y: 1,
						}}>
						<Text preset="pSmall">{message.message}</Text>
					</LinearGradient>
				</Box>
			)}
		</Box>
	)
}

export default MessageItem
