import { RootRoutes, Screens, ScreensKeys } from "@/routes"
import { RouteProp, useRoute } from "@react-navigation/native"

export const useRouteParams = <RoutName extends ScreensKeys>(routeName: RoutName) => {
	return useRoute<RouteProp<Screens, RoutName>>().params
}
