import React from "react"

import { CircleImage } from "../CircleImage"
import { render, screen } from "@/testUtils"
import { dark } from "@/theme"

describe("CircleImage", () => {
	it("renders correctly with default size", () => {
		render(
			<CircleImage source={{ uri: "https://example.com/image.png" }} testID="img" />
		)

		const image = screen.getByTestId("img")
		expect(image).toHaveStyle({
			width: 20,
			height: 20,
			borderRadius: dark.borderRadii[9999],
		})
	})

	it("renders correctly with custom size", () => {
		render(
			<CircleImage
				source={{ uri: "https://example.com/image.png" }}
				size={30}
				testID="img"
			/>
		)

		const image = screen.getByTestId("img")
		expect(image).toHaveStyle({
			width: 30,
			height: 30,
			borderRadius: dark.borderRadii[9999],
		})
	})
})
