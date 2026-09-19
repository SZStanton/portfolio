import { defineConfig, type Plugin } from 'vite';
import react, { reactCompilerPreset } from '@vitejs/plugin-react';
import babel from '@rolldown/plugin-babel';
import tailwindcss from '@tailwindcss/vite';

// The browser only finds a font once it has parsed the stylesheet that names it,
// which is late enough that the page renders in the fallback and then reflows when
// the real face arrives. Preloading starts the download with the HTML instead.
// Latin only: the other subsets are never needed for this site's copy.
function preloadLatinFonts(): Plugin {
  return {
    name: 'preload-latin-fonts',
    apply: 'build',
    transformIndexHtml(_html, ctx) {
      const files = Object.keys(ctx.bundle ?? {}).filter(name =>
        /(josefin-sans|manrope)-latin-wght-normal-[^/]*\.woff2$/.test(name),
      );

      return files.map(file => ({
        tag: 'link',
        attrs: {
          rel: 'preload',
          as: 'font',
          type: 'font/woff2',
          href: `/${file}`,
          // Fonts are always fetched anonymously, so the preload must match.
          crossorigin: '',
        },
        injectTo: 'head-prepend' as const,
      }));
    },
  };
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    tailwindcss(),
    preloadLatinFonts(),
  ],
});
