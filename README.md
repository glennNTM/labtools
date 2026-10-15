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
| `bun run preview`   | Prévisualiser le build        |

## Structure

```
src/
  assets/       Logos et images importés
  components/   landing/ (une section = un composant), layout/, ui/
  config/       site.ts (coordonnées, envoi du formulaire), content.ts (tous les textes)
  hooks/        Hooks personnalisés (animations GSAP, meta de page)
  lib/          gsap.ts, router.ts (mini-routeur sans dépendance)
  pages/        Accueil, pages légales, 404
  types/        Types TypeScript partagés
  utils/        Fonctions utilitaires
tests/          Tests
```

Les design tokens (couleurs, typo, rayons, ombres) sont dans `src/index.css` (`@theme`).

Le site utilise des routes côté client (`/mentions-legales`, `/confidentialite`, `/cookies`) : en production, l'hébergeur doit renvoyer `index.html` pour toutes les routes.

L'alias `@` pointe vers `src/` (ex. `import logo from '@/assets/logo-avec-nom.svg'`).
