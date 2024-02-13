import { SingUpProps, AuthResponse } from "@/modules/auth/models"

export type AuthApi = {
	singUp: (props: SingUpProps) => Promise<AuthResponse>
}
