import * as LocalAuthentication from "expo-local-authentication"

export const canUseLocalAuthentication = async () => {
	const deviceHasLocalAuthentication = await LocalAuthentication.hasHardwareAsync()
	const hasFingerPrintsOrFaceId = await LocalAuthentication.isEnrolledAsync()

	return deviceHasLocalAuthentication && hasFingerPrintsOrFaceId
}
