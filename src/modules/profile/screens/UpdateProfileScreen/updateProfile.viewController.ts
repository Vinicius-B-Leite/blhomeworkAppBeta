import { useAuth } from "@/modules/auth/context"
import { useForm } from "react-hook-form"
import { UpdateProfileSchema, updateProfileSchema } from "./updateProfileSchema"
import { zodResolver } from "@hookform/resolvers/zod"
import { pickImage } from "@/utils"

export function useUpdateProfileScreenViewController() {
	const { user } = useAuth()
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
		console.log(data)
	})

	const handleSelectImage = async () => {
		const res = await pickImage()
		setValue("avatar", res?.uri)
	}

	const avatarUrl = watch("avatar")
	return { user, control, errors, submit, isValid, handleSelectImage, avatarUrl }
}
