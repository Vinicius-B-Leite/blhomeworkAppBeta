import { AppRoutes } from "@/routes"

declare global {
	namespace ReactNavigation {
		interface RootParamList extends AppRoutes {}
	}
}
