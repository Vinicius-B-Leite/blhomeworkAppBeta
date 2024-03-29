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

export type AuthContextType = {
	user: UserType | null
	updateUser: (userUpdated: UserType) => Promise<void>
}

const initialState: AuthContextType = {
	user: null,
	updateUser: async () => {},
}
const AuthContext = createContext<AuthContextType>(initialState)

export const AuthProvider = ({ children }: PropsWithChildren) => {
	const [user, setUser] = useState<UserType | null>(null)

	useEffect(() => {
		const getUser = async () => {
			const userStorage = await authStorage.getUser()

			setUser(userStorage)
		}
		getUser()
	}, [])

	const updateUser = useCallback(async (userUpdated: UserType) => {
		setUser(userUpdated)
		await authStorage.updateUser(userUpdated)
	}, [])

	return (
		<AuthContext.Provider value={{ user, updateUser }}>
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
