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
  components/   landing/, layout/, ui/
  config/       Constantes et configuration
  hooks/        Hooks personnalisés
  lib/          Intégrations et helpers tiers
  pages/        Pages
  utils/        Fonctions utilitaires
tests/          Tests
```

L'alias `@` pointe vers `src/` (ex. `import logo from '@/assets/logo-avec-nom.svg'`).
