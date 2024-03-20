const tasks = [
	{
		deadLine: new Date(),
		id: "1",
		subject: {
			name: "subject",
			id: "1",
			shortName: "shortName",
			color: "#fff",
		},
		title: "title",
		uploads: [
			{
				id: "1",
				donwloadUrl: "http://example.com",
				type: "pdf",
				taskId: "1",
			},
		],
		description: "description",
	},
]

export const mocks = {
	task: tasks,
}
