import * as Notifications from "expo-notifications"

export async function getAllScheduleNotifications() {
	return await Notifications.getAllScheduledNotificationsAsync()
}
