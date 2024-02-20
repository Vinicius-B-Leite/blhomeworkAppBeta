import { AppRoutes } from "@/routes"
import { RouteProp, useRoute } from "@react-navigation/native"

type RoutesKeys = keyof AppRoutes
export const useRouteParams = <RoutName extends RoutesKeys>(routeName: RoutName) => {
	return useRoute<RouteProp<AppRoutes, RoutName>>().params
}
