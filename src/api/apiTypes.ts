import { mimeTypes } from "@/constant"

export type UploadFileProps = {
	base64: string

	bucketName: string
	contentType: keyof typeof mimeTypes
	uri: string
	folder?: string
}

type ListFilesFromFolderProps = {
	bucketName: string
	folder: string
}

export type Api = {
	uploadFile: (props: UploadFileProps) => Promise<{ downloadUrl: string; type: string }>
	listFilesFromFolder: (props: ListFilesFromFolderProps) => Promise<{ name: string }[]>
	removeFiles: (props: { bucketName: string; filesPath: string[] }) => Promise<void>
}
