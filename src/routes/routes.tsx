import { AnimatedHeaderOptions, Box, Toast } from "@/components"
import { useAppTheme } from "@/hooks/useAppTheme"
import { useAuth } from "@/modules/auth/context"
import { AuthRoutes } from "@/modules/auth/routes"

import { NavigationContainer, useTheme } from "@react-navigation/native"
import { StatusBar } from "react-native"
import { AppRoutes } from "./appRoutes"

export const Routes = () => {
	const theme = useAppTheme()
	const { user } = useAuth()
	const navigationTheme = useTheme()

	navigationTheme.colors.background = theme.colors.bg

	return (
		<Box bg="bg" flex={1}>
			<NavigationContainer theme={navigationTheme}>
				<StatusBar
					barStyle={"light-content"}
					translucent
					backgroundColor={"transparent"}
				/>
				{!!user ? <AppRoutes /> : <AuthRoutes />}
			</NavigationContainer>
			<AnimatedHeaderOptions />
			<Toast />
		</Box>
	)
}
