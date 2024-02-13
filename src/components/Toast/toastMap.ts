import { Theme } from "@/theme"
import { iconMap } from "../Icon/iconMap"
import { ToastConfig } from "@/store"

export const toastMap: Record<
	ToastConfig["type"],
	{
		iconName: keyof typeof iconMap
		iconColor: keyof Theme["colors"]
	}
> = {
	success: {
		iconName: "check",
		iconColor: "scondContrast",
	},
	error: {
		iconName: "error",
		iconColor: "alert",
	},
	warning: {
		iconName: "warning",
		iconColor: "thirdContrast",
	},
}
