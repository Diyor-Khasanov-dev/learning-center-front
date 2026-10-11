import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import tseslint from 'typescript-eslint'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  // `landing/` — alohida Next.js loyihasi, o'z ESLint sozlamasi bilan.
  globalIgnores(['dist', 'dist-demo', 'landing']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      js.configs.recommended,
      // Non-type-aware (fast) rules. The type-aware preset would need
      // projectService; types are already checked by `tsc -b` in `npm run typecheck`.
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      globals: globals.browser,
    },
  },
])
