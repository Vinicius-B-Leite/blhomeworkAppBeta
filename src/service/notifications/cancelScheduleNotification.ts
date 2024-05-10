import * as Notifications from "expo-notifications"

type CancelScheduleNotificationProps = {
	notificationId: string
}
export async function cancelScheduleNotification({
	notificationId,
}: CancelScheduleNotificationProps) {
	await Notifications.cancelScheduledNotificationAsync(notificationId)
}

export async function cancelAllScheduledNotifications() {
	await Notifications.cancelAllScheduledNotificationsAsync()
}
