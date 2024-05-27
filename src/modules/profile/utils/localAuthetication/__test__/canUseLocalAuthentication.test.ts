import * as LocalAuthentication from "expo-local-authentication"
import { canUseLocalAuthentication } from "../canUseLocalAuthentication"

jest.mock("expo-local-authentication")

describe("prfileUtils: canUseLocalAuthentication", () => {
	it("returns true when the device has local authentication and is enrolled", async () => {
		jest.spyOn(
			require("expo-local-authentication"),
			"hasHardwareAsync"
		).mockResolvedValue(true)
		jest.spyOn(
			require("expo-local-authentication"),
			"isEnrolledAsync"
		).mockResolvedValue(true)

		const result = await canUseLocalAuthentication()

		expect(result).toBe(true)
	})

	it("returns false when the device does not have local authentication", async () => {
		jest.spyOn(
			require("expo-local-authentication"),
			"hasHardwareAsync"
		).mockResolvedValue(false)
		jest.spyOn(
			require("expo-local-authentication"),
			"isEnrolledAsync"
		).mockResolvedValue(true)

		const result = await canUseLocalAuthentication()

		expect(result).toBe(false)
	})

	it("returns false when the device is not enrolled", async () => {
		jest.spyOn(
			require("expo-local-authentication"),
			"hasHardwareAsync"
		).mockResolvedValue(true)
		jest.spyOn(
			require("expo-local-authentication"),
			"isEnrolledAsync"
		).mockResolvedValue(false)

		const result = await canUseLocalAuthentication()

		expect(result).toBe(false)
	})
})
