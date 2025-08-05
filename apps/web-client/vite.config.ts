/// <reference types='vitest' />

import { nxViteTsPaths } from "@nx/vite/plugins/nx-tsconfig-paths.plugin";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig(() => ({
    root: __dirname,
    cacheDir: "../../node_modules/.vite/apps/web-client",
    server: {
        port: 4200,
        host: "localhost",
    },
    preview: {
        port: 4200,
        host: "localhost",
    },
    plugins: [react(), tailwindcss(), nxViteTsPaths()],
    // Uncomment this if you are using workers.
    // worker: {
    //  plugins: [ nxViteTsPaths() ],
    // },
    build: {
        outDir: "./dist",
        emptyOutDir: true,
        reportCompressedSize: true,
        commonjsOptions: {
            transformMixedEsModules: true,
        },
    },
}));
