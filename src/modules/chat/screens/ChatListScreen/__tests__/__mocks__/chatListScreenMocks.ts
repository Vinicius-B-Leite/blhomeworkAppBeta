import { UserType } from "@/modules/auth/models"
import { ChatApiResponse } from "@/modules/chat/models"

const chatList: ChatApiResponse[] = [
	{
		classroom: {
			admin_id: "a7502fcf-3dc5-49ef-9b08-65649b5f74bc",
			created_at: "2024-06-28T16:20:31.79391",
			deleted_at: null,
			id: "c363a351-81c3-49a1-9f70-532501374d80",
			name: "Sala 1",
			updated_at: "2024-07-11T16:31:27.576",
			upload: null,
		},
		classroomId: "c363a351-81c3-49a1-9f70-532501374d80",
		id: 7,
		last_message: "Mandei a mensagem ",
		messages: [
			{
				chatId: 7,
				created_at: "2024-07-11T16:31:27.576",
				deleted_at: null,
				id: 1,
				message: "Mandei a mensagem ",
				updated_at: null,
				uploadUrl: null,
				userId: "a7502fcf-3dc5-49ef-9b08-65649b5f74bc",
				user: {
					avatar_url: null,
					email: "asd@asdsa.com",
					id: "a7502fcf-3dc5-49ef-9b08-65649b5f74bc",
					user_name: "fulano",
				},
			},
		],
	},
	{
		classroom: {
			admin_id: "a7502fcf-3dc5-49ef-9b08-65649b5f74bc",
			created_at: "2024-06-28T16:20:47.5375",
			deleted_at: null,
			id: "d4315d1e-984d-4ed5-99f2-f73569102874",
			name: "Sala 2",
			updated_at: "2024-07-08T22:30:16.954",
			upload: null,
		},
		classroomId: "d4315d1e-984d-4ed5-99f2-f73569102874",
		id: 8,
		last_message: null,
		messages: [],
	},
]

const storageMessage = {
	data: [
		{
			chatId: "7",
			createdAt: "2024-07-11T16:33:52.886Z",
			deletedAt: null,
			id: "44",
			message: "Uia",
			updatedAt: null,
			uploadUrl: null,
			user: [Object],
			userId: "a7502fcf-3dc5-49ef-9b08-65649b5f74bc",
		},
		{
			chatId: 7,
			createdAt: "2024-07-11T16:36:38.482Z",
			deletedAt: null,
			id: "45",
			message: "Leto lero",
			updatedAt: null,
			uploadUrl: null,
			user: [Object],
			userId: "a7502fcf-3dc5-49ef-9b08-65649b5f74bc",
		},
	],
	timestamp: 1720704999979,
}

const serverChatMessages = [
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
			notification_token: "ExponentPushToken[LSXgqHCXbzoLRwO9QQpZeZ]",
			user_name: "Vini teste",
		},
		userId: "a7502fcf-3dc5-49ef-9b08-65649b5f74bc",
	},
	{
		chatId: 8,
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
			notification_token: "ExponentPushToken[LSXgqHCXbzoLRwO9QQpZeZ]",
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
			notification_token: "ExponentPushToken[LSXgqHCXbzoLRwO9QQpZeZ]",
			user_name: "Vini teste",
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
const userApi = {
	avatar_url:
		"https://rtytyzrzvqaujajwgnyc.supabase.co/storage/v1/object/public/avatars/a7502fcf-3dc5-49ef-9b08-65649b5f74bc/fa44a353-0e8c-41ad-aa9a-626ee3d27338.png",
	email: "teste@teste.com",
	id: "a7502fcf-3dc5-49ef-9b08-65649b5f74bc",
	notification_token: "ExponentPushToken[LSXgqHCXbzoLRwO9QQpZeZ]",
	user_name: "Vini teste",
}
export const chatListMock = {
	serverChatMessages,
	storageMessage,
	chatList,
	user,
	userApi,
}
