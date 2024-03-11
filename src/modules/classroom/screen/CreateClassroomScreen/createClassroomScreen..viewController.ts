import { useForm } from "react-hook-form"
import {
	CreateClassroomScreenSchema,
	createClassroomScreenSchema,
} from "./createClassroomScreenSchema"
import { zodResolver } from "@hookform/resolvers/zod"

import { useCreateClassroom } from "@/modules/classroom/modelView"
import { CreateClassroomServiceProps } from "@/modules/classroom/models"
import { useToastDispatch } from "@/store"
import { useNavigation } from "@react-navigation/native"
import { pickImage } from "@/utils"

export function useCreateClassroomScreenModelView() {
	const { showToast } = useToastDispatch()
	const navigation = useNavigation()
	const {
		control,
		formState: { isValid, errors },
		handleSubmit,
		setValue,
		watch,
	} = useForm<CreateClassroomScreenSchema>({
		resolver: zodResolver(createClassroomScreenSchema),
		defaultValues: {
			bannerUri: {
				base64: "",
				uri: "",
			},
			classroomName: "",
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

	const createClassroom = (data: CreateClassroomScreenSchema) => {
		let props: Omit<CreateClassroomServiceProps, "userId"> = {
			name: data.classroomName,
		}
		if (data.bannerUri?.uri && data.bannerUri?.uri.length > 0) {
			props.baner = {
				uri: data.bannerUri.uri,
				base64: data.bannerUri.base64,
			}
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
		handleCreateClassroom: handleSubmit(createClassroom),
		selectBannerImage,
		isLoading,
		bannerUri: watch("bannerUri.uri"),
	}
}
