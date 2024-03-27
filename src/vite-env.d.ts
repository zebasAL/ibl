/// <reference types="vite/client" />

declare module 'vite/client' {
  import { ViteEnv } from '/src/types/vite-env';

  interface ImportMetaEnv extends ViteEnv {}
}

interface ImportMetaEnv {
  readonly VITE_APP_JWT_KEY_SECRET: string
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}