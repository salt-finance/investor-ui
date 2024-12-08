<!-- App.svelte -->
<script lang="ts">
    // Admin Layout
    import Dashboard from "./layouts/DashboardLayout.svelte";
    // Auth Layout
    import Auth from "./layouts/AuthLayout.svelte";

    // No Layout Pages
    import Router from "svelte-spa-router";
    import Index from "./views/Index.svelte";

    const routes = {
        // Exact path
        "/": Index,
        // Using named parameters, with last being optional
        "/auth": Auth,
        "/auth/*": Auth,
        "/dashboard": Dashboard,
        "/dashboard/*": Dashboard,
        // Catch-all
        // This is optional, but if present it must be the last
        "*": Index
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
  :global {
    :root {
      interpolate-size: allow-keywords;
    }
    
    font {
      background-color: inherit !important;
      box-shadow: none !important;
    }

    select {
      border-radius: 0.25rem;
    }

    .goog-te-gadget {


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
