import { storage } from "@/storage"
import { ThemeOptions } from "../type"

type ThemeStorage = {
	getThemeFromCache: () => Promise<ThemeOptions | null>
	saveThemeOnCache: (theme: ThemeOptions) => Promise<void>
}

export const themeStorage: ThemeStorage = {
	getThemeFromCache: async () => {
		const res = await storage.getItem<ThemeOptions>({ key: "theme" })
		return res
	},
	saveThemeOnCache: async (theme: ThemeOptions) => {
		await storage.setItem("theme", theme)
	},
}
