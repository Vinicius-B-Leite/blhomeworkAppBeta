const globalEnvs = {
	DEV: {
		SUPABASE_URL: process.env.EXPO_PUBLIC_SUPABASE_URL_DEV ?? "",
		SUPABASE_API_KEY: process.env.EXPO_PUBLIC_SUPABASE_API_KEY_DEV ?? "",
	},
	PROD: {
		SUPABASE_URL: process.env.EXPO_PUBLIC_SUPABASE_URL_PROD ?? "",
		SUPABASE_API_KEY: process.env.EXPO_PUBLIC_SUPABASE_API_KEY_PROD ?? "",
	},
}

const environment: keyof typeof globalEnvs = __DEV__ ? "DEV" : "PROD"
export const envs = globalEnvs[environment]
