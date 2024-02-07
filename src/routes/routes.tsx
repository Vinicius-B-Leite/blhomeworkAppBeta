import { LoginRoutes } from "@/modules/login/routes"
import { NavigationContainer } from "@react-navigation/native"
import { StatusBar } from "react-native"

export const Routes = () => {
	return (
		<NavigationContainer>
			<StatusBar
				barStyle={"light-content"}
				translucent
				backgroundColor={"transparent"}
			/>
			<LoginRoutes />
		</NavigationContainer>
	)
}
