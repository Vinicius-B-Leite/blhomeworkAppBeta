import { mimeTypes } from "@/constant"

export type UploadFileProps = {
	base64: string

	bucketName: string
	contentType: keyof typeof mimeTypes
	uri: string
}

export type Api = {
	uploadFile: (props: UploadFileProps) => Promise<{ downloadUrl: string; type: string }>
}
