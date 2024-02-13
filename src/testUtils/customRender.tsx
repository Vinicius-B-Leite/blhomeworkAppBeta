import { dark } from "@/theme"
import { NavigationContainer } from "@react-navigation/native"
import { ThemeProvider } from "@shopify/restyle"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { render } from "@testing-library/react-native"
import React from "react"
import { SafeAreaProvider } from "react-native-safe-area-context"

const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			retry: false,
			gcTime: Infinity,
		},
		mutations: {
			retry: false,
			gcTime: Infinity,
		},
	},
})

const Providers = ({ children }: React.PropsWithChildren) => {
	return (
		<QueryClientProvider client={queryClient}>
			<SafeAreaProvider>
				<ThemeProvider theme={dark}>
					<NavigationContainer>{children}</NavigationContainer>
				</ThemeProvider>
			</SafeAreaProvider>
		</QueryClientProvider>
	)
}

const customRender = (ui: React.ReactElement, options = {}) => {
	return render(ui, { wrapper: Providers, ...options })
}

export { customRender }
