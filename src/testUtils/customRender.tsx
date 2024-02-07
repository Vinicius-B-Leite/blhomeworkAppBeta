import { render } from "@testing-library/react-native"
import React from "react"
import { SafeAreaProvider } from "react-native-safe-area-context"

const Providers = ({ children }: React.PropsWithChildren) => {
	return <SafeAreaProvider>{children}</SafeAreaProvider>
}

const customRender = (ui: React.ReactElement, options = {}) => {
	return render(ui, { wrapper: Providers, ...options })
}

export * from "@testing-library/react-native"
export { customRender as render }
