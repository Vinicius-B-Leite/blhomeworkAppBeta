export type ClassroomType = {
	bannerUrl: string | null
	title: string
	id: string
}

export type ClassroomApiResponse = {
	classroom: {
		created_at: string
		deleted_at: string
		id: string
		name: string
		updated_at: string
		upload: {
			id: string
			path_url: string
			type: "image"
		} | null
	}
}
