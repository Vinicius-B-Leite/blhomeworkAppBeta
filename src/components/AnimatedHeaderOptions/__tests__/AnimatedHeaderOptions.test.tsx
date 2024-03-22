import React from "react"
import { render, fireEvent } from "@testing-library/react-native"
import { AnimatedHeaderOptions } from "../AnimatedHeaderOptions"
import { useAnimatedHeaderOptionsConfig, useAnimatedHeaderOptionsDispatch } from "@/store"

import { renderComponent } from "@/testUtils/customRender"

jest.mock("@/store")

describe("component: AnimatedHeaderOptions", () => {
	beforeAll(() => {
		jest.spyOn(
			require("@/store"),
			"useAnimatedHeaderOptionsDispatch"
		).mockReturnValue({
			hideAnimatedHeaderOptions: jest.fn(),
		})
	})

	it("renders correctly when visible", () => {
		jest.spyOn(require("@/store"), "useAnimatedHeaderOptionsConfig").mockReturnValue({
			rightOptions: [{ iconsName: "pen", onPress: jest.fn(), isLoading: false }],
			title: "Test Title",
			visible: true,
			titleColor: "black",
		})

		const { getByText, getByTestId } = renderComponent(<AnimatedHeaderOptions />)

		expect(getByText("Test Title")).toBeTruthy()
		expect(getByTestId("pen")).toBeTruthy()
	})

	it("does not render when not visible", () => {
		jest.spyOn(require("@/store"), "useAnimatedHeaderOptionsConfig").mockReturnValue({
			rightOptions: [],
			title: "",
			visible: false,
			titleColor: "black",
		})

		const { queryByText } = renderComponent(<AnimatedHeaderOptions />)

		expect(queryByText("Test Title")).toBeNull()
	})

	it("calls hideAnimatedHeaderOptions when back button is pressed", () => {
		const mockhideAnimatedHeaderOptions = jest.fn()
		jest.spyOn(
			require("@/store"),
			"useAnimatedHeaderOptionsDispatch"
		).mockReturnValue({
			hideAnimatedHeaderOptions: mockhideAnimatedHeaderOptions,
		})
		jest.spyOn(require("@/store"), "useAnimatedHeaderOptionsConfig").mockReturnValue({
			rightOptions: [{ iconsName: "pen", onPress: jest.fn(), isLoading: false }],
			title: "Test Title",
			visible: true,
			titleColor: "black",
		})

		const { getByTestId } = renderComponent(<AnimatedHeaderOptions />)

		fireEvent.press(getByTestId("back-button"))

		expect(mockhideAnimatedHeaderOptions).toHaveBeenCalled()
	})

	it("calls option onPress and hideAnimatedHeaderOptions when option is pressed", () => {
		const hideAnimatedHeaderOptionsMock = jest.fn()
		const optionOnPressMock = jest.fn()
		jest.spyOn(
			require("@/store"),
			"useAnimatedHeaderOptionsDispatch"
		).mockReturnValue({
			hideAnimatedHeaderOptions: hideAnimatedHeaderOptionsMock,
		})
		jest.spyOn(require("@/store"), "useAnimatedHeaderOptionsConfig").mockReturnValue({
			rightOptions: [
				{ iconsName: "pen", onPress: optionOnPressMock, isLoading: false },
			],
			title: "Test Title",
			visible: true,
			titleColor: "black",
		})

		const { getByTestId } = renderComponent(<AnimatedHeaderOptions />)

		fireEvent.press(getByTestId("pen"))

		expect(optionOnPressMock).toHaveBeenCalled()
		expect(hideAnimatedHeaderOptionsMock).toHaveBeenCalled()
	})
})
