import { useAuth } from "@/modules/auth/context"
import { set, useForm } from "react-hook-form"
import { UpdateProfileSchema, updateProfileSchema } from "./updateProfileSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { pickImage } from "@/utils"
import { useUpdateProfileModelView } from "../../modelView"
import { useToastDispatch } from "@/store"
import { useNavigation } from "@react-navigation/native"

export function useUpdateProfileScreenViewController() {
	const { user } = useAuth()

	const navigation = useNavigation()
	const { showToast } = useToastDispatch()
	const { updateProfile, isPending } = useUpdateProfileModelView({
		onSuccess: () => {
			showToast({
				type: "success",
				message: "Perfil atualizado com sucesso!",
			})
			navigation.navigate("ProfileRoutes", { screen: "Profile" })
		},
		onError: (error) => {
			const message = error?.message || "Ocorreu um erro ao atualizar o perfil!"

			showToast({
				type: "error",
				message,
			})
		},
	})
	const {
		control,
		formState: { errors, isValid },
		handleSubmit,
		setValue,
		watch,
	} = useForm<UpdateProfileSchema>({
		resolver: zodResolver(updateProfileSchema),
		defaultValues: {
			avatar: user?.avatarUrl || undefined,
			username: user?.username,
		},

		mode: "onChange",
	})

	const submit = handleSubmit((data) => {
		updateProfile({
			avatarUrl: data.avatar,
			username: data.username,
			password: data.password,
			base64: data.base64,
		})
	})

	const handleSelectImage = async () => {
		const res = await pickImage()

		setValue("avatar", res?.uri)
		if (res?.base64) {
			setValue("base64", res?.base64)
		}
	}

	const avatarUrl = watch("avatar")
	return {
		user,
		control,
		errors,
		submit,
		isValid,
		handleSelectImage,
		avatarUrl,
		isLoading: isPending,
	}
}
