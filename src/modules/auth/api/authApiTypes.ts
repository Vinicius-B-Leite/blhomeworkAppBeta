import { SingUpProps } from "../models"
import { AuthResponse } from "../models/authTypes"

export type AuthApi = {
	singUp: (props: SingUpProps) => Promise<AuthResponse>
}
