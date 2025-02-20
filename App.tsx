import { SafeAreaProvider } from "react-native-safe-area-context"
import {
	useFonts,
	Poppins_400Regular,
	Poppins_400Regular_Italic,
	Poppins_700Bold,
} from "@expo-google-fonts/poppins"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

import { ContextsProviders } from "@/contextsProviders/ContextsProviders"
import { GestureHandlerRootView } from "react-native-gesture-handler"

import { LogBox, Platform } from "react-native"
import { useCacheControll } from "@/hooks"
import { useEffect } from "react"
import {
	initializeNotifications,
	requestNotificationPermisson,
} from "@/service/notifications"
import { Index } from "./src"
import { dark } from "@/theme"
import * as SplashScreen from "expo-splash-screen"
import * as QuickActions from "expo-quick-actions"

LogBox.ignoreLogs(["Non-serializable values were found in the navigation state"])

const queryClient = new QueryClient()
initializeNotifications()
SplashScreen.preventAutoHideAsync()

export default function App() {
	useCacheControll()

	useEffect(() => {
		QuickActions.setItems([
			{
				title: "Wait! Don't delete me!",
				subtitle: "We're here to help",
				icon:
					Platform.OS === "ios"
						? "symbol:person.crop.circle.badge.questionmark"
						: undefined,
				id: "0",
				params: { href: "/ForgetPasswordScreen" },
			},
		])
	}, [])

	useEffect(() => {
		requestNotificationPermisson()
	})
	let [fontsLoaded, fontError] = useFonts({
		Poppins_400Regular,
		Poppins_400Regular_Italic,
		Poppins_700Bold,
	})

	if (!fontsLoaded && !fontError) {
		return null
	}

	return (
		<GestureHandlerRootView style={{ flex: 1, backgroundColor: dark.colors.bg }}>
			<QueryClientProvider client={queryClient}>
				<SafeAreaProvider>
					<ContextsProviders>
						<Index />
					</ContextsProviders>
				</SafeAreaProvider>
			</QueryClientProvider>
		</GestureHandlerRootView>
	)
}
