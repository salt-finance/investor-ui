import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import terser from "@rollup/plugin-terser";
import { spawn } from "node:child_process";
import css from "rollup-plugin-css-only";
import livereload from "rollup-plugin-livereload";
import svelte from "rollup-plugin-svelte";
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
const production = process.env.BUILD === "production";
const watch = process.env.ROLLUP_WATCH;
const projectRootDir = path.resolve(__dirname);
const basePath = production ? "/investor-ui" : "";

// configure aliases for absolute imports
const aliases = alias({
  resolve: [".svelte", ".js"], //optional, by default this will just look for .js files or folders
  entries: [
    {
      find: "components",
      replacement: path.resolve(projectRootDir, "src/components"),
    },
    { find: "utils", replacement: path.resolve(projectRootDir, "src/utils") },
    { find: "views", replacement: path.resolve(projectRootDir, "src/views") },
    { find: "assets", replacement: path.resolve(projectRootDir, "src/assets") },
  ],
});

const indexTemplate = `
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width,initial-scale=1" />
    <title>Salt Finance Investor</title>
    <link rel="shortcut icon" href="<<live-preview-link>>/favicon.ico" />


    <link
      rel="apple-touch-icon"
      sizes="76x76"
      href="<<live-preview-link>>/apple-icon.png"
    />

    <script defer src="<<live-preview-link>>/build/bundle.min.js"></script>
    <link
      rel="preload"
      href="<<live-preview-link>>/assets/styles/tailwind.css"
      as="style"
      onload="this.onload=null;this.rel='stylesheet'"
    />
    <link
      rel="preload"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css"
      as="style"
      onload="this.onload=null;this.rel='stylesheet'"
    />
    <link
      rel="preload"
      href="<<live-preview-link>>/build/bundle.css"
      as="style"
      onload="this.onload=null;this.rel='stylesheet'"
    />

    <script>


      if (process === undefined) {
           var process = { env: {<<process-env-status>>} };
         }
    </script>
  </head>

  <body class="text-slate-700 antialiased">
 <script defer type="text/javascript">
      function setupGoogleTranslate() {
        new google.translate.TranslateElement(
          {
            pageLanguage: "en",
            multilanguagePage: false,
            includedLanguages: "am,en",
            layout: google.translate.TranslateElement.InlineLayout.HORIZONTAL,
          },
          "google_translate_element"
        );
        var a =
          google_translate_element.querySelector(".goog-te-gadget").firstChild;
        google_translate_element.querySelector(".goog-te-gadget").innerHTML =
          "";
        google_translate_element
          .querySelector(".goog-te-gadget")
          .appendChild(a);
        return;
      }

      function googleTranslateElementInit() {
        if (document.readyState !== "complete") {
          document.addEventListener("readystatechange", (event) => {
            if (document.readyState === "complete") {
              setupGoogleTranslate();
            }
          });
        } else {
          setupGoogleTranslate();
        }
      }
    </script>
    <script
      type="text/javascript"
      defer
      src="https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
    ></script>
    <noscript>
      <strong>
        We're sorry but salt finance doesn't work properly without JavaScript
        enabled. Please enable it to continue.
      </strong>
    </noscript>
    <div id="app"></div>
  </body>
</html>

`;

const processEnv =
  "PRODUCTION:" + `"${production}",` + "BASE_URL:" + `"${basePath}"`;

console.log("build args");
console.table(processEnv);

fs.writeFileSync(
  "./public/index.html",
  indexTemplate
    .replace("<<process-env-status>>", processEnv)
    .replace(/<<live-preview-link>>/g, basePath)
);
fs.writeFileSync(
  "./public/200.html",
  indexTemplate
    .replace("<<process-env-status>>", processEnv)
    .replace(/<<live-preview-link>>/g, basePath)
);
fs.writeFileSync(
  "./public/404.html",
  indexTemplate
    .replace("<<process-env-status>>", processEnv)
    .replace(/<<live-preview-link>>/g, basePath)
);

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
  input: `src/main.js`,
  output: [
    {
      sourcemap: true,
      format: "iife",
      name: "app",
      file: "public/build/bundle.js",
    },
    {
      file: "public/build/bundle.min.js",
      format: "iife",
      name: "version",
      plugins: [terser()],
    },
  ],

  plugins: [
    svelte({
      onwarn: (warning, handler) => {
        // e.g. don't warn on <marquee> elements, cos they're cool
        if (warning.code.includes("a11y")) return;
        if (warning.code === "CIRCULAR_DEPENDENCY") return;

        // let Rollup handle all other warnings normally
        handler(warning);
      },

      emitCss: true,
    }),
    css({ output: "bundle.css" }),
    resolve({
      browser: true,
      dedupe: ["svelte"],
    }),
    commonjs(),

    watch && serve(),

    watch && livereload("public"),

    aliases,
  ],
  watch: {
    clearScreen: false,
  },
};
