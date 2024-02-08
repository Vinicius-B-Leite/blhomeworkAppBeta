import { Routes } from "@/routes"
import { dark } from "@/theme"
import { ThemeProvider } from "@shopify/restyle"
import { SafeAreaProvider } from "react-native-safe-area-context"
import {
	useFonts,
	Poppins_400Regular,
	Poppins_400Regular_Italic,
} from "@expo-google-fonts/poppins"

export default function App() {
	let [fontsLoaded, fontError] = useFonts({
		Poppins_400Regular,
		Poppins_400Regular_Italic,
	})

	if (!fontsLoaded && !fontError) {
		return null
	}
	return (
		<SafeAreaProvider>
			<ThemeProvider theme={dark}>
				<Routes />
			</ThemeProvider>
		</SafeAreaProvider>
	)
}
