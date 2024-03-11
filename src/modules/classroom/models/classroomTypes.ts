export type ClassroomType = {
	bannerUrl: string
	title: string
	id: string
}

export type ClassroomApiResponse = {
	classroom: {
		banner_url: string
		created_at: string
		deleted_at: string
		id: string
		name: string
		updated_at: string
	}
}
