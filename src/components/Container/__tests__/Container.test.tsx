// FILEPATH: /Users/user/ViniciusLeite/bl-homework/src/components/Container/__tests__/Container.test.tsx

import { fireEvent, render, screen } from "@/testUtils"
import { Container } from "../Container"
import { Text } from "react-native"

const mockedGoBack = jest.fn()
jest.mock("@react-navigation/native", () => {
	return {
		...jest.requireActual("@react-navigation/native"),
		useNavigation: () => ({
			goBack: mockedGoBack,
		}),
	}
})
describe("component: Container", () => {
	it("should render ScrollBox when scrollable is true", () => {
		render(<Container scrollable={true} />)

		const container = screen.getByTestId("container")

		expect(container._fiber.elementType).toBe("RCTScrollView")
	})

	it("should render Box when scrollable is false", () => {
		render(<Container scrollable={false} />)

		const container = screen.getByTestId("container")

		expect(container._fiber.elementType).toBe("View")
	})
	it("should show go back button if goBack is passed", () => {
		render(<Container goBack={{ title: "title" }} />)

		const goBack = screen.getByText("title")
		expect(goBack).toBeTruthy()

		fireEvent.press(goBack)
		expect(mockedGoBack).toHaveBeenCalled()
	})

	it("should show Submit button if submitButton is passed", async () => {
		render(
			<Container
				goBack={{
					title: "title",
				}}
				submitButton={{
					onPress: () => {},
					isLoading: false,
				}}
			/>
		)

		expect(await screen.findByText("Criar")).toBeTruthy()
	})
	it("should show RightComponent before submitButton", async () => {
		render(
			<Container
				goBack={{
					title: "title",
					righComponent: <Text>Hello</Text>,
				}}
				submitButton={{
					onPress: () => {},
					isLoading: false,
				}}
			/>
		)

		expect(await screen.findByText("Hello")).toBeTruthy()
		expect(screen.queryByText("Criar")).not.toBeTruthy()
	})
	it("should show spinner  if submitButton loading is true", async () => {
		render(
			<Container
				goBack={{
					title: "title",
				}}
				submitButton={{
					onPress: () => {},
					isLoading: true,
				}}
			/>
		)

		expect(await screen.findByTestId("submitButton-spinner")).toBeTruthy()
	})
})
