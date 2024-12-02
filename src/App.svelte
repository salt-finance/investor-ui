<!-- App.svelte -->
<script>
    // Admin Layout
    import Admin from "./layouts/Admin.svelte";
    // Auth Layout
    import Auth from "./layouts/Auth.svelte";

    // No Layout Pages
    import Router from "svelte-spa-router";
    import Index from "./views/Index.svelte";
    import Profile from "./views/Profile.svelte";

    const routes = {
        // Exact path
        "/": Index,
        // Using named parameters, with last being optional
        "/auth": Auth,
        "/auth/*": Auth,
        "/admin": Admin,
        "/admin/*": Admin,
        "/profile": Profile,
        // Catch-all
        // This is optional, but if present it must be the last
        "*": Index,
    };
</script>
<Router {routes}/>


<!-- // Base color classes
Gain - Mint - #10B981 emerald-500
Loss - Imperial Red - #EF4444 - red-500
Buy - Yellow Green - #84CC16 - lime-500
Sell - Xanthous - #EAB308 - yellow-500
Action - Azure - #3B82F6 - blue-500
Danger - Cornell red - #b91c1c - red-700 -->
<style lang="scss">
  @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,100..1000;1,9..40,100..1000&family=Libre+Bodoni:ital,wght@0,400..700;1,400..700&display=swap');

  :global {
    :root {
      interpolate-size: allow-keywords;
    }

    a.active {
      color: #3b82f6;
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

    .glass-effect {
      backdrop-filter: blur(10px);
      -webkit-backdrop-filter: blur(10px);

      // border: 1px solid rgba(255, 255, 255, 0.3);
    }
  }
</style>
