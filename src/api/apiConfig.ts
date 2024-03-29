import { createClient } from "@supabase/supabase-js"

const supabseUrl = process.env.EXPO_PUBLIC_SUPABASE_URLL ?? ""
const supabseApiKey = process.env.EXPO_PUBLIC_SUPABASE_API_KEY || ""

export const supabase = createClient(supabseUrl, supabseApiKey, {
	auth: {
		autoRefreshToken: true,
		persistSession: true,
		detectSessionInUrl: true,
	},
})
