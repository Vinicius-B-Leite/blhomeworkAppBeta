import { UserType } from "@/modules/auth/models"

const getChatMessages = [
	{
		chatId: 7,
		created_at: "2024-06-28T16:31:06.339544",
		deleted_at: null,
		id: 40,
		message: "teste testando teste",
		updated_at: null,
		uploadUrl: null,
		user: {
			avatar_url:
				"https://rtytyzrzvqaujajwgnyc.supabase.co/storage/v1/object/public/avatars/a7502fcf-3dc5-49ef-9b08-65649b5f74bc/fa44a353-0e8c-41ad-aa9a-626ee3d27338.png",
			email: "teste@teste.com",
			id: "a7502fcf-3dc5-49ef-9b08-65649b5f74bc",
			notification_token: "ExponentPushToken[FqTUDXPHmyJhejIF69DY8z]",
			user_name: "Vini teste",
		},
		userId: "a7502fcf-3dc5-49ef-9b08-65649b5f74bc",
	},
	{
		chatId: 7,
		created_at: "2024-06-28T16:31:19.880003",
		deleted_at: null,
		id: 41,
		message: null,
		updated_at: null,
		uploadUrl:
			"https://rtytyzrzvqaujajwgnyc.supabase.co/storage/v1/object/public/chat/7/05ee32ec-ed4d-4ddd-8ccb-ac4448236bbf.png",
		user: {
			avatar_url:
				"https://rtytyzrzvqaujajwgnyc.supabase.co/storage/v1/object/public/avatars/a7502fcf-3dc5-49ef-9b08-65649b5f74bc/fa44a353-0e8c-41ad-aa9a-626ee3d27338.png",
			email: "teste@teste.com",
			id: "a7502fcf-3dc5-49ef-9b08-65649b5f74bc",
			notification_token: "ExponentPushToken[FqTUDXPHmyJhejIF69DY8z]",
			user_name: "Vini teste",
		},
		userId: "a7502fcf-3dc5-49ef-9b08-65649b5f74bc",
	},
	{
		chatId: 7,
		created_at: "2024-07-04T21:52:15.172086",
		deleted_at: null,
		id: 42,
		message: "Mandei a mensagem ",
		updated_at: null,
		uploadUrl: null,
		user: {
			avatar_url:
				"https://rtytyzrzvqaujajwgnyc.supabase.co/storage/v1/object/public/avatars/a7502fcf-3dc5-49ef-9b08-65649b5f74bc/fa44a353-0e8c-41ad-aa9a-626ee3d27338.png",
			email: "teste@teste.com",
			id: "a7502fcf-3dc5-49ef-9b08-65649b5f74bc",
			notification_token: "ExponentPushToken[FqTUDXPHmyJhejIF69DY8z]",
			user_name: "Vini teste",
		},
		userId: "a7502fcf-3dc5-49ef-9b08-65649b5f74bc",
	},
	{
		chatId: 7,
		created_at: "2024-07-17T11:42:21.518353",
		deleted_at: null,
		id: 46,
		message: "Eaeeee",
		updated_at: null,
		uploadUrl: null,
		user: {
			avatar_url: "",
			email: "",
			id: "d9ba2665-03a0-49bc-b7a9-99ea7f802aa8",
			notification_token: "ExponentPushToken[FqTUDXPHmyJhejIF69DY8z]",
			user_name: "assado",
		},
		userId: "d9ba2665-03a0-49bc-b7a9-99ea7f802aa8",
	},
	{
		chatId: 7,
		created_at: "2024-07-17T11:42:40.536925",
		deleted_at: null,
		id: 47,
		message: "Salve fioeteeee",
		updated_at: null,
		uploadUrl: null,
		user: {
			avatar_url:
				"https://rtytyzrzvqaujajwgnyc.supabase.co/storage/v1/object/public/avatars/a7502fcf-3dc5-49ef-9b08-65649b5f74bc/fa44a353-0e8c-41ad-aa9a-626ee3d27338.png",
			email: "teste@teste.com",
			id: "a7502fcf-3dc5-49ef-9b08-65649b5f74bc",
			notification_token: "ExponentPushToken[FqTUDXPHmyJhejIF69DY8z]",
			user_name: "Vini teste",
		},
		userId: "a7502fcf-3dc5-49ef-9b08-65649b5f74bc",
	},
]

const chatParam = {
	classroom: {
		adminId: "a7502fcf-3dc5-49ef-9b08-65649b5f74bc",
		bannerUrl:
			"https://rtytyzrzvqaujajwgnyc.supabase.co/storage/v1/object/public/classroomsBanners/3988b02a-d4bf-429c-a5a9-17904c376dc1.png",
		id: "c363a351-81c3-49a1-9f70-532501374d80",
		title: "Sala 1",
	},
	id: "7",
	lastMessage: "Salve fioeteeee",
	messages: [
		{
			chatId: "7",
			createdAt: "2024-06-28T19:31:06.339Z",
			deletedAt: null,
			id: "40",
			message: "teste testando teste]",
			updatedAt: null,
			uploadUrl: null,
			user: [Object],
			userId: "a7502fcf-3dc5-49ef-9b08-65649b5f74bc",
		},
		{
			chatId: "7",
			createdAt: "2024-06-28T19:31:19.880Z",
			deletedAt: null,
			id: "41",
			message: null,
			updatedAt: null,
			uploadUrl:
				"https://rtytyzrzvqaujajwgnyc.supabase.co/storage/v1/object/public/chat/7/05ee32ec-ed4d-4ddd-8ccb-ac4448236bbf.png",
			user: [Object],
			userId: "a7502fcf-3dc5-49ef-9b08-65649b5f74bc",
		},
		{
			chatId: "7",
			createdAt: "2024-07-05T00:52:15.172Z",
			deletedAt: null,
			id: "42",
			message: "Mandei a mensagem ",
			updatedAt: null,
			uploadUrl: null,
			user: [Object],
			userId: "a7502fcf-3dc5-49ef-9b08-65649b5f74bc",
		},
		{
			chatId: "7",
			createdAt: "2024-07-17T14:42:21.518Z",
			deletedAt: null,
			id: "46",
			message: "Eaeeee",
			updatedAt: null,
			uploadUrl: null,
			user: [Object],
			userId: "d9ba2665-03a0-49bc-b7a9-99ea7f802aa8",
		},
		{
			chatId: "7",
			createdAt: "2024-07-17T14:42:40.536Z",
			deletedAt: null,
			id: "47",
			message: "Salve fioeteeee",
			updatedAt: null,
			uploadUrl: null,
			user: [Object],
			userId: "a7502fcf-3dc5-49ef-9b08-65649b5f74bc",
		},
	],
}

const messages = [
	{
		chatId: "7",
		createdAt: new Date("2024-07-18T14:16:40.608Z"),
		deletedAt: null,
		id: "48",
		message: "Teste",
		updatedAt: null,
		uploadUrl: null,
		user: {
			avatarUrl:
				"https://rtytyzrzvqaujajwgnyc.supabase.co/storage/v1/object/public/avatars/a7502fcf-3dc5-49ef-9b08-65649b5f74bc/fa44a353-0e8c-41ad-aa9a-626ee3d27338.png",
			email: "teste@teste.com",
			id: "a7502fcf-3dc5-49ef-9b08-65649b5f74bc",
			username: "Vini teste",
		},
		userId: "a7502fcf-3dc5-49ef-9b08-65649b5f74bc",
	},
]
const user: UserType = {
	avatarUrl:
		"https://rtytyzrzvqaujajwgnyc.supabase.co/storage/v1/object/public/avatars/a7502fcf-3dc5-49ef-9b08-65649b5f74bc/fa44a353-0e8c-41ad-aa9a-626ee3d27338.png",
	email: "teste@teste.com",
	refreshtoken: "2zQp8BsFmu4xoIHQhKyRhg",
	token: "eyJhbGciOiJIUzI1NiIsImtpZCI6IlNXTXF4ZzhrOU03VVRYZXkiLCJ0eXAiOiJKV1QifQ.eyJhdWQiOiJhdXRoZW50aWNhdGVkIiwiZXhwIjoxNzIwNzA4NDA2LCJpYXQiOjE3MjA3MDQ4MDYsImlzcyI6Imh0dHBzOi8vcnR5dHl6cnp2cWF1amFqd2dueWMuc3VwYWJhc2UuY28vYXV0aC92MSIsInN1YiI6ImE3NTAyZmNmLTNkYzUtNDllZi05YjA4LTY1NjQ5YjVmNzRiYyIsImVtYWlsIjoidGVzdGVAdGVzdGUuY29tIiwicGhvbmUiOiIiLCJhcHBfbWV0YWRhdGEiOnsicHJvdmlkZXIiOiJlbWFpbCIsInByb3ZpZGVycyI6WyJlbWFpbCJdfSwidXNlcl9tZXRhZGF0YSI6eyJhdmF0YXJVcmwiOiJodHRwczovL3J0eXR5enJ6dnFhdWphandnbnljLnN1cGFiYXNlLmNvL3N0b3JhZ2UvdjEvb2JqZWN0L3B1YmxpYy9hdmF0YXJzL2E3NTAyZmNmLTNkYzUtNDllZi05YjA4LTY1NjQ5YjVmNzRiYy9mYTQ0YTM1My0wZThjLTQxYWQtYWE5YS02MjZlZTNkMjczMzgucG5nIiwidXNlcm5hbWUiOiJWaW5pIHRlc3RlIn0sInJvbGUiOiJhdXRoZW50aWNhdGVkIiwiYWFsIjoiYWFsMSIsImFtciI6W3sibWV0aG9kIjoicGFzc3dvcmQiLCJ0aW1lc3RhbXAiOjE3MjA3MDQ4MDV9XSwic2Vzc2lvbl9pZCI6IjM1OTU0NWU5LTNhZDQtNDQ1MS1iZmY3LWI4ZjgzZWQzMmFiZiIsImlzX2Fub255bW91cyI6ZmFsc2V9.S0PSGa5hWvydjK7pDcSayp7uIyPLjNBAKORzVrQnpjE",
	uid: "a7502fcf-3dc5-49ef-9b08-65649b5f74bc",
	username: "Vini teste",
}
export const mocks = {
	getChatMessages,
	chatParam,
	messages,
	user,
}
