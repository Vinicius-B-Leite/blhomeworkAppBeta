import { render, screen, waitForElementToBeRemoved } from "@/testUtils"
import { Toast } from "../Toast"
import { toastMap } from "../toastMap"
import { useToastConfig, useToastDispatch } from "@/store"

jest.mock("@/store")

const mockHideToast = jest.fn()

const mockedUseToastConfig = jest.mocked(useToastConfig)
const nockedUseToastDispatch = jest.mocked(useToastDispatch)

nockedUseToastDispatch.mockReturnValue({ hideToast: mockHideToast, showToast: jest.fn() })
describe("component: Toast", () => {
	beforeAll(() => {
		jest.useFakeTimers()
	})

	afterAll(() => {
		jest.useRealTimers()
	})

	beforeEach(() => {
		jest.clearAllMocks()
	})
	it("should render with success props ", async () => {
		mockedUseToastConfig.mockReturnValue({
			message: "Success message",
			type: "success",
			visible: true,
		})

		render(<Toast />)

		const message = screen.getByText(/Success message/i)
		const icon = screen.getByTestId(`toastIcon-${toastMap.success.iconName}`)

		expect(message).toBeTruthy()
		expect(icon).toBeTruthy()

		jest.runAllTimers()

		expect(mockHideToast).toHaveBeenCalled()
	})
	it("should render with error props ", async () => {
		mockedUseToastConfig.mockReturnValue({
			message: "error message",
			type: "error",
			visible: true,
		})

		render(<Toast />)

		const message = screen.getByText(/error message/i)
		const icon = screen.getByTestId(`toastIcon-${toastMap.error.iconName}`)

		expect(message).toBeTruthy()
		expect(icon).toBeTruthy()

		jest.runAllTimers()

		expect(mockHideToast).toHaveBeenCalled()
	})
	it("should render with warning props ", async () => {
		mockedUseToastConfig.mockReturnValue({
			message: "warning message",
			type: "warning",
			visible: true,
		})

		render(<Toast />)

		const message = screen.getByText(/warning message/i)
		const icon = screen.getByTestId(`toastIcon-${toastMap.warning.iconName}`)

		expect(message).toBeTruthy()
		expect(icon).toBeTruthy()

		jest.runAllTimers()

		expect(mockHideToast).toHaveBeenCalled()
	})
})
