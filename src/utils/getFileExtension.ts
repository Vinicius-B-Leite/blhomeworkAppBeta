export function getExtension(uri: string): string {
	const url = new URL(uri)
	const parts = url.pathname.split(".")
	return "." + parts[parts.length - 1]
}
