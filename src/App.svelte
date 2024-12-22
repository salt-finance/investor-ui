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

