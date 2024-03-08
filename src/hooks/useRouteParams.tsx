import { RootRoutes } from "@/routes"
import { RouteProp, useRoute } from "@react-navigation/native"

type RoutesKeys = keyof RootRoutes
export const useRouteParams = <RoutName extends RoutesKeys>(routeName: RoutName) => {
	return useRoute<RouteProp<RootRoutes, RoutName>>().params
}
