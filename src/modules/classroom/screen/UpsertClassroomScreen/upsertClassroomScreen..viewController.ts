import { useForm } from "react-hook-form"
import { UpsertClassroomScreenSchema } from "./upsertClassroomScreenSchema"
import { zodResolver } from "@hookform/resolvers/zod"

import { useCreateClassroom, useUpdateClassroom } from "@/modules/classroom/modelView"
import { UpdateClassroomServiceProps } from "@/modules/classroom/models"
import { useToastDispatch } from "@/store"
import { useNavigation } from "@react-navigation/native"
import { pickImage } from "@/utils"
import { useRouteParams } from "@/hooks"

export function useUpsertClassroomScreenModelView() {
	const { showToast } = useToastDispatch()
	const navigation = useNavigation()
	const params = useRouteParams("UpsertClassroomScreen")
	const classroom = params?.classroom
	const isUpdatingClassroom = !!classroom
	const {
		control,
		formState: { isValid, errors },
		handleSubmit,
		setValue,
		watch,
	} = useForm<UpsertClassroomScreenSchema>({
		resolver: zodResolver(UpsertClassroomScreenSchema),
		defaultValues: {
			bannerUri: {
				base64: "",
				uri:
					isUpdatingClassroom && classroom.bannerUrl
						? classroom?.bannerUrl
						: "",
			},
			classroomName: isUpdatingClassroom ? classroom?.title : "",
		},
		mode: "onChange",
	})
	const { createClassroom: createClassroomModelView, isLoading } = useCreateClassroom({
		onSuccess: () => {
			showToast({ message: "Sala criada com sucesso!", type: "success" })
			navigation.goBack()
		},
		onError: () => {
			showToast({ message: "Erro ao criar sala!", type: "error" })
		},
	})
	const { updateClassroom, isLoading: isUpdateLoading } = useUpdateClassroom({
		onSuccess: () => {
			showToast({ message: "Sala atualizada com sucesso!", type: "success" })
			navigation.goBack()
		},
		onError: () => {
			showToast({ message: "Erro ao atualizar sala!", type: "error" })
		},
	})
	const upsertClassroom = async (data: UpsertClassroomScreenSchema) => {
		let props: UpdateClassroomServiceProps = {
			name: data.classroomName,
		}
		if (data.bannerUri?.uri && data.bannerUri?.uri.length > 0) {
			props.bannerUri = data.bannerUri.uri
		}

		if (isUpdatingClassroom) {
			updateClassroom({
				name: props.name,
				bannerUri: props.bannerUri,
				classroomId: classroom!.id,
			})
			return
		}
		createClassroomModelView(props)
	}

	const selectBannerImage = async () => {
		const result = await pickImage()

		if (result && result.uri && result.base64) {
			setValue("bannerUri.uri", result.uri)
			setValue("bannerUri.base64", result!.base64)
		}
	}

	return {
		control,
		isValid,
		errors,
		handleUpsertClassroom: handleSubmit(upsertClassroom),
		selectBannerImage,
		isLoading: isLoading || isUpdateLoading,
		bannerUri: watch("bannerUri.uri"),
		isUpdatingClassroom,
	}
}
