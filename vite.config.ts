import {defineConfig} from "vite";
import {svelte} from "@sveltejs/vite-plugin-svelte";
import path from "path";
import cssInjectedByJsPlugin from "vite-plugin-css-injected-by-js";

// https://vite.dev/config/
export default defineConfig({
    build: {
        minify: "terser"
    },
    base: "/investor-ui",
    resolve: {
        alias: {
            "components": path.resolve(__dirname, "src/components"),
            "utils": path.resolve(__dirname, "src/utils"),
            "models": path.resolve(__dirname, "src/models"),
            "views": path.resolve(__dirname, "src/views")
        }
    },
    plugins: [svelte(), cssInjectedByJsPlugin({dev: {enableDev: false}})]
});
