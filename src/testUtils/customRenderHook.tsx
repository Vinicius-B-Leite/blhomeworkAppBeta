import { Toast } from "@/components"
import { NavigationContainer } from "@react-navigation/native"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import {
	RenderHookOptions,
	RenderHookResult,
	renderHook,
} from "@testing-library/react-native"

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
			<Toast />
			<NavigationContainer>{children}</NavigationContainer>
		</QueryClientProvider>
	)
}

export const customRenderHook = <Result, Props>(
	renderCallback: (props: Props) => Result,
	options?: Omit<RenderHookOptions<Props>, "wrapper">
): RenderHookResult<Result, Props> => {
	return renderHook(renderCallback, { wrapper: Providers, ...options })
}
