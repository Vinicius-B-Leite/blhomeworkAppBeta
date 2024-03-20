import { getExtension } from "@/utils"
import { Api } from "./apiTypes"
import uuid from "react-native-uuid"
import { decode } from "base64-arraybuffer"
import { supabase } from "./apiConfig"
import { mimeTypes } from "@/constant"

export const api: Api = {
	uploadFile: async (props) => {
		const { base64, bucketName, contentType, uri } = props
		const fileName = uuid.v4().toString()
		const extension = getExtension(uri)

		const arrayBuffer = decode(base64)

		const { data: uploadedFile, error: errorOnUpload } = await supabase.storage
			.from(bucketName)
			.upload(`${fileName}${extension}`, arrayBuffer, {
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
}
