import { fireEvent, render, screen } from "@/testUtils"
import { Input } from "../Input"
import { PasswordInput } from "../PasswordInput"
import { Icon } from "@/components"

describe("component: Input", () => {
	it("should render with left and right icon if it was passed by prop", async () => {
		render(
			<Input
				placeholder="Some text"
				RightIcon={<Icon testID="eyeOff" name="eyeOff" />}
				LeftIcon={<Icon testID="eyeOn" name="eyeOn" />}
			/>
		)

		expect(await screen.findByTestId("eyeOff")).toBeTruthy()
		expect(await screen.findByTestId("eyeOn")).toBeTruthy()
	})

	it("should show and hide the password when the eye icon is clicked", async () => {
		render(
			<PasswordInput
				placeholder="Some text"
				RightIcon={<Icon testID="eyeOff" name="eyeOff" />}
			/>
		)

		const passwordInput = await screen.findByPlaceholderText("Some text")
		expect(passwordInput.props.secureTextEntry).toBe(true)
		const eyeIcon = await screen.findByTestId("eyeIcon")

		fireEvent.press(eyeIcon)
		expect(screen.getByPlaceholderText("Some text").props.secureTextEntry).toBe(false)
	})
	it("should show error message if it was passed by prop", async () => {
		render(<Input placeholder="Some text" errorMessage="Some error" />)

		expect(await screen.findByText("Some error")).toBeTruthy()
	})

	it("should call onPress when the input is pressed", async () => {
		const onPress = jest.fn()
		render(<Input placeholder="Some text" onPress={onPress} />)
		fireEvent.press(await screen.findByPlaceholderText("Some text"))
		expect(onPress).toHaveBeenCalled()
	})
})
