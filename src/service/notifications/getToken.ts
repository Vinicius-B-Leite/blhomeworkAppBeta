import * as Notifications from "expo-notifications"
import { requestNotificationPermisson } from "./requestPermisson"

export const getToken = async () => {
	await requestNotificationPermisson()
	const token = (await Notifications.getExpoPushTokenAsync()).data
	return token
}
