import { AuthProvider } from "@/modules/auth/context"
import { PropsWithChildren } from "react"

export const ContextsProviders = ({ children }: PropsWithChildren) => {
	return <AuthProvider>{children}</AuthProvider>
}
