import { RootRoutes, Stacks, StacksKeys } from "@/routes"
import { RouteProp, useRoute } from "@react-navigation/native"

export const useRouteParams = <RoutName extends StacksKeys>(routeName: RoutName) => {
	return useRoute<RouteProp<Stacks, RoutName>>().params
}
