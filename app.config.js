export default {
	expo: {
		name: "bl-homework",
		slug: "bl-homework",
		version: "1.0.0",
		orientation: "portrait",
		icon: "./assets/icon.png",
		userInterfaceStyle: "automatic",
		splash: {
			image: "./assets/splash.png",
			resizeMode: "contain",
			backgroundColor: "#121212",
		},
		assetBundlePatterns: ["**/*"],
		ios: {
			supportsTablet: true,
			infoPlist: {
				NSFaceIDUsageDescription: "Permite BL Homewokr usar o Face ID.",
				UIBackgroundModes: ["location", "fetch", "remote-notification"],
			},
		},
		android: {
			googleServicesFile: process.env.EXPO_PUBLIC_GOOGLE_SERVICES,
			adaptiveIcon: {
				foregroundImage: "./assets/adaptive-icon.png",
				backgroundColor: "#121212",
			},
			permissions: [
				"android.permission.RECORD_AUDIO",
				"android.permission.SCHEDULE_EXACT_ALARM",
				"android.permission.USE_BIOMETRIC",
				"android.permission.USE_FINGERPRINT",
			],
			package: "com.viniciusbl21.blhomework",
		},
		web: {
			favicon: "./assets/favicon.png",
			output: "single",
			bundler: "metro",
		},
		experiments: {
			tsconfigPaths: true,
		},
		plugins: [
			[
				"expo-local-authentication",
				{
					faceIDPermission: "Permite BL Homewokr usar o Face ID.",
				},
			],
			[
				"expo-font",
				{
					fonts: [
						"node_modules/@expo-google-fonts/poppins/Poppins_400Regular.ttf",
						"node_modules/@expo-google-fonts/poppins/Poppins_400Regular_Italic.ttf",
						"node_modules/@expo-google-fonts/poppins/Poppins_700Bold.ttf",
					],
				},
			],
			[
				"expo-image-picker",
				{
					photosPermission:
						"O aplicativo precisa do acesso para selecionar uma foto.",
				},
			],
			[
				"expo-notifications",
				{
					color: "#48CAE4",
					icon: "./assets/notifcation-icon.png",
				},
			],
		],
		extra: {
			eas: {
				projectId: "e4345e61-24e7-4dac-980a-cbc5259ddb6b",
			},
		},
		runtimeVersion: {
			policy: "appVersion",
		},
		updates: {
			url: "https://u.expo.dev/e4345e61-24e7-4dac-980a-cbc5259ddb6b",
		},
	},
}
