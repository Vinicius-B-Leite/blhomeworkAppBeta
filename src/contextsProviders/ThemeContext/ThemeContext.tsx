import { ColorSchemeName, useColorScheme } from "react-native"
import {
	PropsWithChildren,
	createContext,
	useCallback,
	useContext,
	useEffect,
	useState,
} from "react"
import { ThemeContext as ThemeContextType, ThemeOptions } from "./type"

import { storage } from "@/storage"

export const ThemeContext = createContext({} as ThemeContextType)

export function ThemeContextProvider({ children }: PropsWithChildren) {
	const [theme, setTheme] = useState<ThemeOptions>("dark")
	const [isLoadingTheme, setIsLoadingTheme] = useState(true)
	const colorSchema = useColorScheme()

	useEffect(() => {
		getThemeFromCache()
	}, [])
	useEffect(() => {
		handleColorSchemaChange(colorSchema)
	}, [colorSchema])

	const getThemeFromCache = async () => {
		setIsLoadingTheme(true)
		const themeCache = await storage.getItem<ThemeOptions>({ key: "theme" })
		if (themeCache) {
			setTheme(themeCache)
		}
		setIsLoadingTheme(false)
	}

	const handleColorSchemaChange = async (colorSchema: ColorSchemeName) => {
		if (colorSchema === "dark") {
			setTheme("dark")
			await saveThemeOnCache("dark")
		}
		if (colorSchema === "light") {
			setTheme("light")
			await saveThemeOnCache("light")
		}
	}

	const saveThemeOnCache = async (theme: ThemeOptions) => {
		await storage.setItem("theme", theme)
	}

	const toogleTheme = async () => {
		const toTheme = theme === "dark" ? "light" : "dark"
		setTheme(toTheme)

		await saveThemeOnCache(toTheme)
	}

	return (
		<ThemeContext.Provider value={{ theme, toogleTheme, isLoadingTheme }}>
			{children}
		</ThemeContext.Provider>
	)
}

export const useThemeContext = () => useContext(ThemeContext)
