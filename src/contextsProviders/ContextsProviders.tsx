import { AuthProvider } from "@/modules/auth/context"
import { PropsWithChildren } from "react"
import { ThemeContextProvider } from "./ThemeContext/ThemeContext"

export const ContextsProviders = ({ children }: PropsWithChildren) => {
	return (
		<ThemeContextProvider>
			<AuthProvider>{children}</AuthProvider>
		</ThemeContextProvider>
	)
}
