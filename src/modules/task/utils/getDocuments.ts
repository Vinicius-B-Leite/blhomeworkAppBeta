import { getExtension } from "@/utils"
import * as DocumentPicker from "expo-document-picker"
import * as FileSystem from "expo-file-system"

async function convertUriToBase64(uri: string) {
	try {
		const base64 = await FileSystem.readAsStringAsync(uri, {
			encoding: FileSystem.EncodingType.Base64,
		})
		return base64
	} catch (error) {
		return ""
	}
}

export async function getDocuments() {
	const response = await DocumentPicker.getDocumentAsync({
		type: ["image/png", "image/jpeg", "image/jpg", "application/pdf"],
		multiple: true,
	})

	if (response.canceled) {
		return null
	}

	const assets = await Promise.all(
		response.assets.map(async (asset) => {
			const base64 = await convertUriToBase64(asset.uri)
			return {
				name: asset.name,
				uri: asset.uri,
				extension: getExtension(asset.uri),
				base64: base64,
			}
		})
	)

	return assets
}
