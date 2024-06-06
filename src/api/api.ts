import { getExtension } from "@/utils"
import { Api } from "./apiTypes"
import uuid from "react-native-uuid"
import { decode } from "base64-arraybuffer"
import { supabase } from "./apiConfig"
import { mimeTypes } from "@/constant"
import { Platform } from "react-native"

export const api: Api = {
	uploadFile: async (props) => {
		const { base64, bucketName, contentType, uri, folder } = props
		const fileName = uuid.v4().toString()

		const extension = getExtension(uri)

		const path = folder
			? `${folder}/${fileName}${extension}`
			: `${fileName}${extension}`

		const isWeb = Platform.OS === "web"
		const fileBody = isWeb ? await fetch(uri).then((r) => r.blob()) : decode(base64)

		const { data: uploadedFile, error: errorOnUpload } = await supabase.storage
			.from(bucketName)
			.upload(path, fileBody, {
				contentType: mimeTypes[contentType],
			})

		if (errorOnUpload) {
			throw new Error(errorOnUpload.message)
		}

		const { data } = supabase.storage.from(bucketName).getPublicUrl(uploadedFile.path)
		const pathUrl = data.publicUrl || null

		if (!pathUrl) {
			throw new Error("Error to get file url")
		}

		return { downloadUrl: pathUrl, type: contentType }
	},
	listFilesFromFolder: async ({ bucketName, folder }) => {
		const { data, error } = await supabase.storage.from(bucketName).list(folder)

		if (error) {
			throw new Error(error.message)
		}

		return data.map((file) => ({ name: file.name }))
	},
	removeFiles: async ({ bucketName, filesPath }) => {
		const { error } = await supabase.storage.from(bucketName).remove(filesPath)

		if (error) {
			throw new Error(error.message)
		}
	},
}
