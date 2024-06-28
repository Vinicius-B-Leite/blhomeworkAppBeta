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

import { LogBox } from "react-native"
import { useCacheControll, useNotificationControll } from "@/hooks"
import { useEffect } from "react"
import {
	initializeNotifications,
	requestNotificationPermisson,
} from "@/service/notifications"
import { Index } from "./src"
import { dark } from "@/theme"
import * as SplashScreen from "expo-splash-screen"

LogBox.ignoreLogs(["Non-serializable values were found in the navigation state"])

const queryClient = new QueryClient()
initializeNotifications()
SplashScreen.preventAutoHideAsync()

export default function App() {
	useCacheControll()

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
