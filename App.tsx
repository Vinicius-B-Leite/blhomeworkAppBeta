import { Routes } from "@/routes"
import { dark } from "@/theme"
import { ThemeProvider } from "@shopify/restyle"
import { SafeAreaProvider } from "react-native-safe-area-context"

export default function App() {
	return (
		<SafeAreaProvider>
			<ThemeProvider theme={dark}>
				<Routes />
			</ThemeProvider>
		</SafeAreaProvider>
	)
}
