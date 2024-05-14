import { ThemeProvider } from "@shopify/restyle"
import { useThemeContext } from "./contextsProviders/ThemeContext/ThemeContext"
import { Routes } from "./routes"
import { dark, light } from "./theme"
import { useAuth } from "./modules/auth/context"
import * as SplashScreen from "expo-splash-screen"

export function Index() {
	const { theme, isLoadingTheme } = useThemeContext()
	const { isLoadingUser } = useAuth()

	if (!isLoadingUser && !isLoadingTheme) {
		SplashScreen.hideAsync()
	}
	return (
		<ThemeProvider theme={theme === "dark" ? dark : light}>
			<Routes />
		</ThemeProvider>
	)
}
