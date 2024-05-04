export type TaskApiResponse = {
	classroom: {
		admin_id: string
		banner_id: string | null
		created_at: string
		deleted_at: string | null
		id: string
		name: string
		updated_at: string | null
	}
	classroom_id: string
	dead_line: string
	description: string
	id: string
	subject: {
		classroom_id: string
		color_rgb: string
		id: string
		short_name: string
		title: string
	}
	subject_id: string
	title: string
	created_at: string
	updated_at: string | null
	deleted_at: string | null
}

export type Task = {
	title: string
	id: string
	deadLine: Date
	description?: string
	subject: Subject
	uploads: Upload[] | null
	isDone?: boolean
}

export type Subject = {
	name: string
	id: string
	shortName: string
	color: string
}

export type SubjectApiResponse = {
	title: string
	id: string
	short_name: string
	color_rgb: string
}

export type File = {
	name: string
	uri: string
	extension: string
	base64: string
}

export type UploadApiResponse = {
	id: string
	type: string
	path_url: string
	task_id?: string
}

export type Upload = {
	id: string
	type: string
	donwloadUrl: string
	taskId: string | null
}
