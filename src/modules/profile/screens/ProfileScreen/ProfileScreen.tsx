import {
	Box,
	CircleImage,
	Container,
	Icon,
	IconProps,
	PressableBox,
	Text,
} from "@/components"
import React, { useCallback } from "react"
import ImageNotFound from "@/assets/images/ImageNotfound.png"
import { useProfileScreenViewController } from "./profileScreen.viewController"
import { string } from "zod"

const ProfileScreen: React.FC = () => {
	const { user, handleToggleTheme, theme, logout, handleNavigateToUpdateProfile } =
		useProfileScreenViewController()

	const Option = useCallback(
		({
			text,
			icon,
			onPress,
		}: {
			text: string
			icon: IconProps["name"]
			onPress: () => void
		}) => {
			return (
				<PressableBox
					onPress={onPress}
					bg="secondsBg"
					flexDirection="row"
					width="100%"
					paddingVertical={14}
					paddingHorizontal={14}
					gap={14}
					mt={14}
					borderRadius={8}
					justifyContent="space-between"
					alignItems="center">
					<Box flexDirection="row" gap={14} alignItems="center" flex={1}>
						<Box bg="darkContrast" p={8} borderRadius={9999}>
							<Icon name={icon} color="contrast" />
						</Box>

						<Text preset="pMedium" style={{ flex: 1 }} numberOfLines={1}>
							{text}
						</Text>
					</Box>

					<Icon name="right" />
				</PressableBox>
			)
		},
		[]
	)

	return (
		<Container
			goBack={{
				title: "Perfil",
			}}
			scrollable>
			<Box flex={1} alignItems="center" mt={36}>
				<CircleImage
					source={
						user?.avatarUrl
							? {
									uri: user?.avatarUrl,
							  }
							: ImageNotFound
					}
					size={150}
				/>
				<Text preset="pLargeBold" mt={8}>
					{user?.username}
				</Text>
				<Text preset="pMedium" mb={24}>
					{user?.email}
				</Text>

				<Option
					icon="user"
					text="Dados de usuário"
					onPress={handleNavigateToUpdateProfile}
				/>
				<Option
					icon={theme === "dark" ? "moon" : "sun"}
					text="Tema"
					onPress={handleToggleTheme}
				/>
				<Option icon="leave" text="Sair da conta" onPress={logout} />
			</Box>
		</Container>
	)
}

export default ProfileScreen
