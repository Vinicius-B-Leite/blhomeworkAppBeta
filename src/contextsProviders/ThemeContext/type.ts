export type ThemeContext = {
	toogleTheme: () => Promise<void>
	theme: ThemeOptions
	isLoadingTheme: boolean
}

export type ThemeOptions = "dark" | "light"
