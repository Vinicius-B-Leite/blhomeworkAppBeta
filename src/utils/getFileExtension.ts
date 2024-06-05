import { Platform } from "react-native"

export function getExtension(uri: string): string {
	const isWeb = Platform.OS === "web"
	if (isWeb) {
		const parts = uri.split(";")[0].split("/")
		return "." + parts[1]
	}
	const url = new URL(uri)
	const parts = url.pathname.split(".")
	return "." + parts[parts.length - 1]
}
