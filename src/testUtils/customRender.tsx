import { Alert, AnimatedHeaderOptions, Toast } from "@/components"

import { ContextsProviders } from "@/contextsProviders/ContextsProviders"
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

const IntegrationProviders = ({ children }: React.PropsWithChildren) => {
	return (
		<QueryClientProvider client={queryClient}>
			<SafeAreaProvider>
				<ThemeProvider theme={dark}>
					<ContextsProviders>
						<NavigationContainer>{children}</NavigationContainer>
						<AnimatedHeaderOptions />
						<Alert />
						<Toast />
					</ContextsProviders>
				</ThemeProvider>
			</SafeAreaProvider>
		</QueryClientProvider>
	)
}

const UnitProviders = ({ children }: React.PropsWithChildren) => {
	return (
		<SafeAreaProvider>
			<ThemeProvider theme={dark}>{children}</ThemeProvider>
		</SafeAreaProvider>
	)
}

const renderScreen = (ui: React.ReactElement, options = {}) => {
	return render(ui, { wrapper: IntegrationProviders, ...options })
}

const renderComponent = (ui: React.ReactElement, options = {}) => {
	return render(ui, { wrapper: UnitProviders, ...options })
}

export { renderScreen, renderComponent }
