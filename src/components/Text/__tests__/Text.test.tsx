import { render, screen } from "@/testUtils"
import { Text } from "../Text"

import { presets } from "../variants"

describe("component: Text", () => {
	it("should render with correct preset", () => {
		Object.keys(presets).forEach((p) => {
			const preset = p as keyof typeof presets
			render(<Text preset={preset}>Hello World</Text>)

			expect(screen.getByText("Hello World")).toHaveStyle({
				...presets[preset],
			})
		})
	})
})
