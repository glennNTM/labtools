# LabTools

React 19 + Vite + TypeScript + Tailwind CSS 4.

## Démarrage

```bash
bun install
bun run dev
```

## Scripts

| Commande            | Description                   |
| ------------------- | ----------------------------- |
| `bun run dev`       | Serveur de développement      |
| `bun run build`     | Typecheck + build de production |
| `bun run typecheck` | Vérification TypeScript       |
| `bun run lint`      | ESLint                        |
| `bun run lint:fix`  | ESLint avec corrections auto  |
| `bun run test`      | Tests unitaires et d'intégration (Vitest) |
| `bun run test:ui`   | Tests Vitest, débogage dans le navigateur |
| `bun run test:coverage` | Couverture de code |
| `bun run test:e2e`  | Tests E2E Playwright (build de prod, desktop + mobile, axe WCAG 2.2 AA) |
| `bun run test:e2e:ui` | Tests E2E, mode UI Playwright dans le navigateur |
| `bun run test:e2e:debug` | Tests E2E pas à pas avec l'inspecteur Playwright |

Premier lancement des tests E2E : `bunx playwright install chromium`.
Avant la mise en ligne : `RELEASE=1 bun run test` échoue tant qu'il reste des placeholders `[…]`.

## Mesure d'audience

Google Analytics 4, chargé uniquement après accord dans le bandeau cookies (`src/lib/consent.ts`, `src/lib/analytics.ts`).
Copier `.env.example` en `.env.local` et renseigner `VITE_GA_MEASUREMENT_ID` : sans ID, rien n'est chargé.
| `bun run preview`   | Prévisualiser le build        |

## Structure

```
src/
  assets/       Logos et images importés
  components/   landing/ (une section = un composant), layout/, ui/
  config/       site.ts (coordonnées, envoi du formulaire), content.ts (tous les textes)
  hooks/        Hooks personnalisés (animations GSAP, meta de page)
  lib/          gsap.ts, router.ts (mini-routeur), consent.ts (consentement cookies), analytics.ts (GA4)
  pages/        Accueil, pages légales, 404
  types/        Types TypeScript partagés
  utils/        Fonctions utilitaires
tests/          unit/, integration/ (Vitest), e2e/ (Playwright)
```

Les design tokens (couleurs, typo, rayons, ombres) sont dans `src/index.css` (`@theme`).

Le site utilise des routes côté client (`/mentions-legales`, `/confidentialite`, `/cookies`) : en production, l'hébergeur doit renvoyer `index.html` pour toutes les routes.

L'alias `@` pointe vers `src/` (ex. `import logo from '@/assets/logo-avec-nom.svg'`).
