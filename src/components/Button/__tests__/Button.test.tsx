import { fireEvent, render, screen } from "@/testUtils"
import { Button } from "../Button"

describe("component: Button", () => {
	it("should render correctly", () => {
		render(<Button>Test Button</Button>)

		expect(screen.getByText("Test Button")).toBeTruthy()
	})

	it("should show spinner when isLoading is true and it should be disabled", () => {
		render(<Button isloading={true}>Test Button</Button>)

		const spinner = screen.getByTestId("spinner")
		expect(spinner).toBeTruthy()

		fireEvent.press(spinner)
		expect(spinner).toBeDisabled()
	})

	it("should be disabled when disabled prop is true", () => {
		render(<Button disabled={true}>Test Button</Button>)

		const button = screen.getByText("Test Button")
		expect(button).toBeDisabled()
	})

	it("should have underline text when link prop is true", () => {
		render(<Button link={true}>Test Button</Button>)

		const button = screen.getByText("Test Button")
		expect(button.props.style[0].textDecorationLine).toBe("underline")
	})

	it("should not have underline text when link prop is false", () => {
		render(<Button link={false}>Test Button</Button>)

		const button = screen.getByText("Test Button")
		expect(button.props.style[0].textDecorationLine).not.toBe("underline")
	})
})
