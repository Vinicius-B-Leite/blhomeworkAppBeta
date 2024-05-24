import {
	PropsWithChildren,
	createContext,
	useCallback,
	useContext,
	useEffect,
	useState,
} from "react"
import { UserType } from "@/modules/auth/models"
import { authStorage } from "@/modules/auth/storage"
import { storage } from "@/storage"

export type AuthContextType = {
	user: UserType | null
	updateUser: (userUpdated: UserType) => Promise<void>
	logout: () => Promise<void>
	isLoadingUser: boolean
}

const initialState: AuthContextType = {
	user: null,
	updateUser: async () => {},
	logout: async () => {},
	isLoadingUser: true,
}
const AuthContext = createContext<AuthContextType>(initialState)

export const AuthProvider = ({ children }: PropsWithChildren) => {
	const [user, setUser] = useState<UserType | null>(null)
	const [isLoadingUser, setIsLoadingUser] = useState(true)

	useEffect(() => {
		const getUser = async () => {
			setIsLoadingUser(true)
			const userStorage = await authStorage.getUser()
			setUser(userStorage)
			setIsLoadingUser(false)
		}
		getUser()
	}, [])

	const updateUser = useCallback(async (userUpdated: UserType) => {
		const newUser: UserType = {
			email: userUpdated.email,
			username: userUpdated.username,
			avatarUrl: userUpdated.avatarUrl,
			refreshtoken: userUpdated.refreshtoken,
			token: userUpdated.token,
			uid: userUpdated.uid,
		}
		setUser(newUser)
		await authStorage.updateUser(newUser)
	}, [])

	const logout = useCallback(async () => {
		setUser(null)
		await authStorage.removeUser()
		await storage.removeAll()
	}, [])

	return (
		<AuthContext.Provider value={{ user, updateUser, logout, isLoadingUser }}>
			{children}
		</AuthContext.Provider>
	)
}

export const useAuth = () => {
	const context = AuthContext
	if (context === undefined) {
		throw new Error("useAuth must be used within a AuthProvider")
	}
	return useContext(context)
}
