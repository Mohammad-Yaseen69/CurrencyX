/// <reference types="vite-plugin-pwa/client" />

interface ImportMetaEnv {
    readonly VITE_API_KEY: string
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
declare module "*.css";