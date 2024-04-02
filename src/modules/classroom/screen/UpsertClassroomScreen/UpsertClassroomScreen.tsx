import React from "react"

import {
	Button,
	CircleImage,
	Container,
	FormInput,
	Icon,
	PressableBox,
} from "@/components"

import { useUpsertClassroomScreenModelView } from "./upsertClassroomScreen..viewController"

export const UpsertClassroomScreen: React.FC = () => {
	const {
		control,
		errors,
		isValid,
		handleCreateClassroom,
		selectBannerImage,
		isLoading,
		bannerUri,
	} = useUpsertClassroomScreenModelView()

	return (
		<Container
			goBack={{
				title: "Criar sala",
			}}>
			<PressableBox
				onPress={selectBannerImage}
				alignSelf="center"
				bg="secondsBg"
				alignItems="center"
				justifyContent="center"
				height={150}
				width={150}
				borderRadius={9999}
				mt={50}
				mb={36}
				testID="select-banner">
				{bannerUri && bannerUri.length > 0 ? (
					<CircleImage source={{ uri: bannerUri }} size={150} />
				) : (
					<Icon name="image" color="secondText" size={36} />
				)}
			</PressableBox>

			<FormInput
				control={control}
				name="classroomName"
				placeholder="Nome da sala"
				errorMessage={errors.classroomName?.message}
			/>

			<Button
				onPress={handleCreateClassroom}
				isloading={isLoading}
				disabled={!isValid}
				mt={24}
				testID="create-classroom">
				Criar sala
			</Button>
		</Container>
	)
}
