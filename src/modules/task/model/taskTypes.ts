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
}

export type Task = {
	title: string
	id: string
	deadLine: Date
	description?: string
	subject: Subject
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
