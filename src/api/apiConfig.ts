import { envs } from "@/envs/envs"
import { createClient } from "@supabase/supabase-js"

const supabseUrl = envs.SUPABASE_URL
const supabseApiKey = envs.SUPABASE_API_KEY

export const supabase = createClient(supabseUrl, supabseApiKey, {
	auth: {
		autoRefreshToken: true,
		persistSession: true,
		detectSessionInUrl: true,
	},
})
