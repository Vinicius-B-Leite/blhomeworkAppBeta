import { render } from "@testing-library/react-native"
import { LoginScreen } from "../LoginScreen"

describe("integration: LoginScreen", () => {
	it("should render the LoginScreen", () => {
		render(<LoginScreen />)
	})
})
