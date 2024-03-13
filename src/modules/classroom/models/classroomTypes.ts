export type ClassroomType = {
	bannerUrl: string | null
	title: string
	id: string
	adminId: string
}

export type ClassroomApiResponse = {
	classroom: {
		created_at: string
		deleted_at: string
		id: string
		name: string
		admin_id: string
		updated_at: string
		upload: {
			id: string
			path_url: string
			type: "image"
		} | null
	}
}
