import * as FileSystem from "expo-file-system"

export async function convertUriToBase64(uri: string) {
	try {
		const base64 = await FileSystem.readAsStringAsync(uri, {
			encoding: FileSystem.EncodingType.Base64,
		})
		return base64
	} catch (error) {
		throw error
	}
}
