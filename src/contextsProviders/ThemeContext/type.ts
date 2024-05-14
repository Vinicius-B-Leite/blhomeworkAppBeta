export type ThemeContext = {
	toogleTheme: () => void
	theme: ThemeOptions
	isLoadingTheme: boolean
}

export type ThemeOptions = "dark" | "light"
