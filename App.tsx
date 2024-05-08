import { Routes } from "@/routes"
import { dark } from "@/theme"
import { ThemeProvider } from "@shopify/restyle"
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
import { useCacheControll } from "@/hooks"

LogBox.ignoreLogs(["Non-serializable values were found in the navigation state"])

const queryClient = new QueryClient()

export default function App() {
	useCacheControll()
	let [fontsLoaded, fontError] = useFonts({
		Poppins_400Regular,
		Poppins_400Regular_Italic,
		Poppins_700Bold,
	})

	if (!fontsLoaded && !fontError) {
		return null
	}

	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<QueryClientProvider client={queryClient}>
				<SafeAreaProvider>
					<ThemeProvider theme={dark}>
						<ContextsProviders>
							<Routes />
						</ContextsProviders>
					</ThemeProvider>
				</SafeAreaProvider>
			</QueryClientProvider>
		</GestureHandlerRootView>
	)
}
