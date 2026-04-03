// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://ogtortellini.github.io',
  base: '/AlexGrusinPortfolio',
  vite: {
    plugins: [tailwindcss()],
  },
});
