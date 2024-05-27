import {
	Box,
	Button,
	CircleImage,
	Container,
	FormInput,
	FormPasswordInput,
	Icon,
	Input,
	PressableBox,
} from "@/components"
import React from "react"
import { useUpdateProfileScreenViewController } from "./updateProfile.viewController"
import NotFoundImage from "@/assets/images/ImageNotfound.png"

export const UpdateProfileScreen: React.FC = () => {
	const {
		user,
		control,
		errors,
		submit,
		isValid,
		handleSelectImage,
		avatarUrl,
		isLoading,
	} = useUpdateProfileScreenViewController()

	return (
		<Container
			goBack={{
				title: "Atualizar Perfil",
			}}
			scrollable>
			<Box flex={1} alignItems="center" mt={24}>
				<PressableBox
					onPress={handleSelectImage}
					style={{ position: "relative" }}>
					<CircleImage
						source={avatarUrl ? { uri: avatarUrl } : NotFoundImage}
						size={150}
						testID="avatar-image"
					/>
					<Box
						style={{ position: "absolute", bottom: 20 }}
						alignSelf="flex-end"
						borderRadius={9999}
						borderWidth={1}
						elevation={10}
						borderColor="text">
						<Icon name="plus" size={30} />
					</Box>
				</PressableBox>

				<Box flex={1} width={"100%"} gap={14} mt={24}>
					<FormInput
						control={control}
						name="username"
						placeholder={user?.username || "Novo nome"}
						errorMessage={errors.username?.message}
						LeftIcon={<Icon name="user" />}
					/>
					<Input
						value={user?.email}
						LeftIcon={<Icon name="email" />}
						editable={false}
					/>
					<FormPasswordInput
						control={control}
						name="password"
						placeholder={"Nova senha"}
						errorMessage={errors.password?.message}
					/>
					<FormPasswordInput
						control={control}
						name="confirmPassword"
						placeholder={"Confirme a nova senha"}
						errorMessage={errors.confirmPassword?.message}
					/>

					<Button
						onPress={submit}
						disabled={!isValid}
						isloading={isLoading}
						mt={14}>
						Salvar
					</Button>
				</Box>
			</Box>
		</Container>
	)
}
