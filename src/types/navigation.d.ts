import { RootRoutes } from "@/routes"

declare global {
	namespace ReactNavigation {
		interface RootParamList extends RootRoutes {}
	}
}
