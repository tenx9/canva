/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_GEMINI_API_KEY: string
  readonly VITE_IMAGE_MODEL: string
  readonly VITE_TEXT_MODEL: string
  readonly VITE_AUDIO_MODEL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
