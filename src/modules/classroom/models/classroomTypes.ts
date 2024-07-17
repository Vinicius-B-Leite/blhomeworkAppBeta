export type ClassroomType = {
	bannerUrl: string | null
	title: string
	id: string
	adminId: string
}

export type ClassroomApiResponse = {
	classroom: {
		created_at: string
		deleted_at: string | null
		id: string
		name: string
		admin_id: string
		updated_at: string
		upload: {
			id: string
			path_url: string
			type: string
		} | null
	}
}

export type StudentApiResponse = {
	user: {
		avatar_url: string | null
		email: string
		id: string
		user_name: string
	}
}

export type Student = {
	avatarUrl: string | null
	email: string
	id: string
	userName: string
}
