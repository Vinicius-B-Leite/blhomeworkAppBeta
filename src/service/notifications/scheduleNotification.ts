import * as Notifications from "expo-notifications"

type ScheduleNotificationProps = {
	title: string
	body: string
	subtitle?: string
	date: Date
	data?: Notifications.NotificationRequestInput["content"]["data"]
}

export async function scheduleNotification({
	body,
	date,
	title,
	subtitle,
	data,
}: ScheduleNotificationProps) {
	await Notifications.scheduleNotificationAsync({
		content: {
			title,
			body,
			subtitle,
			data,
		},
		trigger: {
			date,
		},
	})
}
