import * as Notifications from "expo-notifications"

export async function requestNotificationPermisson() {
	const settings = await Notifications.getPermissionsAsync()

	if (!settings.granted) {
		await Notifications.requestPermissionsAsync()
	}
}
