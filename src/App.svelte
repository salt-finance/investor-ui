<!-- App.svelte -->
<script>
  // Admin Layout
  import Admin from "./layouts/Admin.svelte";
  // Auth Layout
  import Auth from "./layouts/Auth.svelte";

  // No Layout Pages
  import Router from "svelte-spa-router";
  import Index from "./views/Index.svelte";
  import Landing from "./views/Landing.svelte";
  import Profile from "./views/Profile.svelte";

  let { url } = $props();

  const routes = {
    // Exact path
    "/": Index,

    // Using named parameters, with last being optional
    "/landing": Landing,
    "/admin/*": Admin,
    "/auth": Auth,
    "/auth/*": Auth,
    "/admin": Admin,
    "/admin/*": Admin,
    "/profile": Profile,
    // Catch-all
    // This is optional, but if present it must be the last
    "*": Landing,
  };
</script>

<Router {routes} />

<style lang="scss">
  :global {
    * {
      font-family: "Poppins", "sans-serif";
    }
    a.active {
      color: red;
    }
    font {
      background-color: inherit !important;
      box-shadow: none !important;
    }
    select {
      border-radius: 0.25rem;
    }

    .goog-te-gadget {
      width: 100%;
      border: none !important;

      img {
        display: none !important;
      }

      .goog-te-combo {
        width: 100%;
        font-family: inherit;
      }
      > span {
        width: 100%;
        display: none;
      }
    }

    .goog-te-gadget-icon {
      display: none !important;
    }
    div#goog-gt-tt {
      display: none !important;
    }
    body {
      top: inherit !important;
    }
    div.skiptranslate {
      iframe {
        display: none;
      }
    }
  }
</style>
