import { defineConfig } from "vite"
import { svelte } from "@sveltejs/vite-plugin-svelte"
import tsconfigPaths from "vite-tsconfig-paths"

// https://vite.dev/config/
export default defineConfig({
    plugins: [svelte(), tsconfigPaths()],
    server: {
        port: 3008,
        host: true,
        proxy: {
            "/api": {
                target: "http://localhost:8860",
                changeOrigin: true,
                rewrite: path => path.replace(/^\/api/, ""),
            },
        },
    },
})
