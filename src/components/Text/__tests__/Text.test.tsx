import { render, screen } from "@/testUtils"
import { Text } from "../Text"

import { textPresets } from "../variants"

describe("component: Text", () => {
	it("should render with correct preset", () => {
		Object.keys(textPresets).forEach((p) => {
			const preset = p as keyof typeof textPresets
			render(<Text preset={preset}>Hello World</Text>)

			expect(screen.getByText("Hello World")).toHaveStyle({
				...textPresets[preset],
			})
		})
	})
})
