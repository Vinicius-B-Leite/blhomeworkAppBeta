// FILEPATH: /Users/user/ViniciusLeite/bl-homework/src/components/Container/__tests__/Container.test.tsx

import { render, screen } from "@/testUtils"
import { Container } from "../Container"

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
})
