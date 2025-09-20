/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_URL: string
  readonly VITE_SUPABASE_ANON_KEY: string
  readonly VITE_SUPABASE_PROJECT_ID: string
  readonly VITE_GEMINI_API_KEY: string
  readonly VITE_GEMINI_API_KEY_NABIN: string
  readonly VITE_GEMINI_RECOMMENDATIONS_API_KEY: string
  readonly VITE_GEMINI_SCHOLARSHIP_API_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
