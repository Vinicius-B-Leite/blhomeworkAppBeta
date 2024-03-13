import React from "react"

import { FloatButton } from "../FloatButton"
import { fireEvent, renderScreen } from "@/testUtils"
import { renderComponent } from "@/testUtils/customRender"

describe("FloatButton", () => {
	it("renders correctly", () => {
		const { getByTestId } = renderScreen(<FloatButton onPress={() => {}} />)
		const button = getByTestId("float-button")
		expect(button).toBeTruthy()
	})

	it("calls onPress when pressed", () => {
		const onPressMock = jest.fn()
		const { getByTestId } = renderComponent(<FloatButton onPress={onPressMock} />)
		const button = getByTestId("float-button")

		fireEvent.press(button)

		expect(onPressMock).toHaveBeenCalled()
	})
})
