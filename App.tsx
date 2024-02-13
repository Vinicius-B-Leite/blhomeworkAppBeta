import { Routes } from "@/routes"
import { dark } from "@/theme"
import { ThemeProvider } from "@shopify/restyle"
import { SafeAreaProvider } from "react-native-safe-area-context"
import {
	useFonts,
	Poppins_400Regular,
	Poppins_400Regular_Italic,
} from "@expo-google-fonts/poppins"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"

const queryClient = new QueryClient()

export default function App() {
	let [fontsLoaded, fontError] = useFonts({
		Poppins_400Regular,
		Poppins_400Regular_Italic,
	})

	if (!fontsLoaded && !fontError) {
		return null
	}
	return (
		<QueryClientProvider client={queryClient}>
			<SafeAreaProvider>
				<ThemeProvider theme={dark}>
					<Routes />
				</ThemeProvider>
			</SafeAreaProvider>
		</QueryClientProvider>
	)
}
