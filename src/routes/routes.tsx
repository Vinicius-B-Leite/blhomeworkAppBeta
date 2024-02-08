import { Box } from "@/components"
import { useAppTheme } from "@/hooks/useAppTheme"
import { LoginRoutes } from "@/modules/auth/routes"
import { NavigationContainer, useTheme } from "@react-navigation/native"
import { StatusBar } from "react-native"

export const Routes = () => {
	const theme = useAppTheme()
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
				<LoginRoutes />
			</NavigationContainer>
		</Box>
	)
}
