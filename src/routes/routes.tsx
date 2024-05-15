import { Alert, AnimatedHeaderOptions, Box, Toast } from "@/components"
import { useAppTheme } from "@/hooks/useAppTheme"
import { useAuth } from "@/modules/auth/context"
import { AuthRoutes } from "@/modules/auth/routes"

import {
	NavigationContainer,
	useTheme as useNavigationTheme,
} from "@react-navigation/native"
import { StatusBar } from "react-native"
import { AppRoutes } from "./appRoutes"
import { useThemeContext } from "@/contextsProviders"

export const Routes = () => {
	const theme = useAppTheme()
	const isDarkTheme = useThemeContext().theme === "dark"
	const { user } = useAuth()
	const navigationTheme = useNavigationTheme()

	navigationTheme.colors.background = theme.colors.bg

	return (
		<Box bg="bg" flex={1}>
			<NavigationContainer theme={navigationTheme}>
				<StatusBar
					barStyle={isDarkTheme ? "light-content" : "dark-content"}
					translucent
					backgroundColor={"transparent"}
				/>
				{!!user ? <AppRoutes /> : <AuthRoutes />}
			</NavigationContainer>
			<AnimatedHeaderOptions />
			<Alert />
			<Toast />
		</Box>
	)
}
