import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import { spawn } from "node:child_process";
import css from "rollup-plugin-css-only";
import livereload from "rollup-plugin-livereload";
import svelte from "rollup-plugin-svelte";

// import { terser } from "rollup-plugin-terser";
// library that helps you import in svelte with
// absolute paths, instead of
// import Component  from "../../../../components/Component.svelte";
// we will be able to say
// import Component from "components/Component.svelte";
import alias from "@rollup/plugin-alias";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory
const production = !process.env.ROLLUP_WATCH;
const projectRootDir = path.resolve(__dirname);

// configure aliases for absolute imports
const aliases = alias({
  resolve: [".svelte", ".js"], //optional, by default this will just look for .js files or folders
  entries: [
    {
      find: "components",
      replacement: path.resolve(projectRootDir, "src/components"),
    },
    { find: "views", replacement: path.resolve(projectRootDir, "src/views") },
    { find: "assets", replacement: path.resolve(projectRootDir, "src/assets") },
  ],
});

const indexTemplate = `<!--
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />

    <link rel="shortcut icon" href="/favicon.ico" />
    <link rel="apple-touch-icon" sizes="76x76" href="/apple-icon.png" />
    <link rel="stylesheet" href="/build/bundle.css" />
    <link
      rel="stylesheet"
      href="/assets/vendor/@fortawesome/fontawesome-free/css/all.min.css"
    />
    <link rel="stylesheet" href="/assets/styles/tailwind.css" />
    <title>Notus Svelte</title>

    <script>
      if (process === undefined) {
        var process = { env: {<<process-env-status>>} };
      }
    </script>
    <script defer src="<<live-preview-link>>/build/bundle.js"></script>
  </head>

  <body class="text-blueGray-700 antialiased">
    <noscript>
      <strong
        >We're sorry but notus-svelte doesn't work properly without
        JavaScript enabled. Please enable it to continue.</strong
      >
    </noscript>
    <div id="app"></div>
  </body>
</html>
`;

if (production) {
  fs.writeFileSync(
    "./public/index.html",
    indexTemplate
      .replace("<<process-env-status>>", "PRODUCTION: true")
      .replace(/<<live-preview-link>>/g, "/investor-ui")
  );
  fs.writeFileSync(
    "./public/200.html",
    indexTemplate
      .replace("<<process-env-status>>", "PRODUCTION: true")
      .replace(/<<live-preview-link>>/g, "/notus-svelte")
  );
  fs.writeFileSync(
    "./public/404.html",
    indexTemplate
      .replace("<<process-env-status>>", "PRODUCTION: true")
      .replace(/<<live-preview-link>>/g, "/notus-svelte")
  );
} else {
  fs.writeFileSync(
    "./public/index.html",
    indexTemplate
      .replace("<<process-env-status>>", "")
      .replace(/<<live-preview-link>>/g, "")
  );
  fs.writeFileSync(
    "./public/200.html",
    indexTemplate
      .replace("<<process-env-status>>", "")
      .replace(/<<live-preview-link>>/g, "")
  );
  fs.writeFileSync(
    "./public/404.html",
    indexTemplate
      .replace("<<process-env-status>>", "")
      .replace(/<<live-preview-link>>/g, "")
  );
}

function serve() {
  let server;

  function toExit() {
    if (server) server.kill(0);
  }

  return {
    writeBundle() {
      if (server) return;
      server = spawn("npm", ["run", "start", "--", "--dev"], {
        stdio: ["ignore", "inherit", "inherit"],
        shell: true,
      });

      process.on("SIGTERM", toExit);
      process.on("exit", toExit);
    },
  };
}

export default {
  input: "src/main.js",
  output: {
    sourcemap: true,
    format: "iife",
    name: "app",
    file: "public/build/bundle.js",
  },

  plugins: [
    svelte({
      onwarn: (warning, handler) => {
        // e.g. don't warn on <marquee> elements, cos they're cool
        if (warning.code.includes("a11y")) return;
        if (warning.code === "CIRCULAR_DEPENDENCY") return;

        // let Rollup handle all other warnings normally
        handler(warning);
      },

      // css: function (css) {
      //   console.log(css.code); // the concatenated CSS
      //   console.log(css.map); // a sourcemap

      //   // creates `main.css` and `main.css.map`
      //   // using a falsy name will default to the bundle name
      //   // — pass `false` as the second argument if you don't want the sourcemap
      //   css.write('bundle.css');
      // },
      emitCss: true,
      // onwarn: (a, (warning) => {}),
      // enable run-time checks when not in production
      // dev: !production,
      // we'll extract any component CSS out into
      // a separate file - better for performance
      // css: (css) => {
      //   css.write("bundle.css");
      // },
    }),
    css({ output: "bundle.css" }),

    // If you have external dependencies installed from
    // npm, you'll most likely need these plugins. In
    // some cases you'll need additional configuration -
    // consult the documentation for details:
    // https://github.com/rollup/plugins/tree/master/packages/commonjs
    resolve({
      browser: true,
      dedupe: ["svelte"],
    }),
    commonjs(),

    // In dev mode, call `npm run start` once
    // the bundle has been generated
    !production && serve(),

    // Watch the `public` directory and refresh the
    // browser on changes when not in production
    !production && livereload("public"),

    // If we're building for production (npm run build
    // instead of npm run dev), minify
    // production && terser(),

    // for absolut imports
    // i.e., instead of
    // import Component  from "../../../../components/Component.svelte";
    // we will be able to say
    // import Component from "components/Component.svelte";
    aliases,
  ],
  watch: {
    clearScreen: false,
  },
};
