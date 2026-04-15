// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site: 'https://mitsubishi-sleman.online',
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/admin/'),
      serialize(item) {
        // Tambahkan .html ke semua URL kecuali homepage
        // agar konsisten dengan canonical URL dan build format: 'file'
        if (item.url !== 'https://mitsubishi-sleman.online/') {
          item.url = item.url.replace(/\/$/, '') + '.html';
        }
        return item;
      },
    }),
  ],
  build: {
    format: 'file'
  }
});
