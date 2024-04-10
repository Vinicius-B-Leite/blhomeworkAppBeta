// FILEPATH: /Users/user/ViniciusLeite/bl-homework/src/components/Alert/__tests__/Alert.test.tsx

import React from "react"
import { render, fireEvent, screen } from "@/testUtils"
import { Alert } from "../Alert"
import { useAlertConfig, useAlertDispatch } from "@/store" // replace with your actual path
import { renderComponent } from "@/testUtils/customRender"

jest.mock("@/store")

describe("Alert", () => {
	it("renders correctly when visible", () => {
		jest.spyOn(require("@/store"), "useAlertConfig").mockReturnValue({
			buttons: [
				{ text: "Yes", type: "confirm", onPress: jest.fn() },
				{ text: "No", type: "cancel", onPress: jest.fn() },
			],
			message: "Test message",
			visible: true,
			title: "Test title",
		})
		jest.spyOn(require("@/store"), "useAlertDispatch").mockReturnValue({
			hideAlert: jest.fn(),
		})

		renderComponent(<Alert />)

		expect(screen.getByText("Test title")).toBeTruthy()
		expect(screen.getByText("Test message")).toBeTruthy()
		expect(screen.getByText("Yes")).toBeTruthy()
		expect(screen.getByText("No")).toBeTruthy()
	})

	it("does not render when not visible", () => {
		jest.spyOn(require("@/store"), "useAlertConfig").mockReturnValue({
			buttons: [],
			message: "",
			visible: false,
			title: "",
		})
		jest.spyOn(require("@/store"), "useAlertDispatch").mockReturnValue({
			hideAlert: jest.fn(),
		})

		renderComponent(<Alert />)

		expect(screen.queryByText("Atenção")).toBeNull()
	})

	it("calls the button onPress and hideAlert when a button is clicked", () => {
		const mockOnPress = jest.fn()
		const mockHideAlert = jest.fn()

		jest.spyOn(require("@/store"), "useAlertConfig").mockReturnValue({
			buttons: [{ text: "Yes", type: "confirm", onPress: mockOnPress }],
			message: "Test message",
			visible: true,
			title: "Test title",
		})
		jest.spyOn(require("@/store"), "useAlertDispatch").mockReturnValue({
			hideAlert: mockHideAlert,
		})

		render(<Alert />)

		fireEvent.press(screen.getByText("Yes"))

		expect(mockOnPress).toHaveBeenCalled()
		expect(mockHideAlert).toHaveBeenCalled()
	})
})
