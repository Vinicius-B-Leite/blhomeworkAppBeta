import * as FileSystem from "expo-file-system"
import { Platform } from "react-native"

export async function convertUriToBase64(uri: string) {
	try {
		const isWeb = Platform.OS === "web"
		if (!isWeb) {
			const base64 = await FileSystem.readAsStringAsync(uri, {
				encoding: FileSystem.EncodingType.Base64,
			})
			return base64
		}

		const response = await fetch(uri)
		const blob = await response.blob()
		const reader = new FileReader()
		const base64 = await new Promise((resolve, reject) => {
			reader.onerror = reject
			reader.onload = () => {
				resolve(reader.result)
			}
			reader.readAsDataURL(blob)
		})

		return String(base64)
	} catch (error) {
		throw error
	}
}
