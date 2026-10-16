/// <reference types="vite/client" />

// Fusion de déclarations avec ImportMetaEnv de Vite : une interface est nécessaire.
// eslint-disable-next-line @typescript-eslint/consistent-type-definitions
interface ImportMetaEnv {
  /** ID de mesure Google Analytics 4 (G-XXXXXXXXXX). Vide = pas de mesure d'audience. */
  readonly VITE_GA_MEASUREMENT_ID?: string
}
