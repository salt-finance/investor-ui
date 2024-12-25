<!-- App.svelte -->
<script lang="ts">
    // Admin Layout
    import Dashboard from "./layouts/DashboardLayout.svelte";
    // Auth Layout
    import Auth from "./layouts/AuthLayout.svelte";

    // No Layout Pages
    import Router, {type WrappedComponent} from "svelte-spa-router";
    import Index from "./views/Index.svelte";

    const routes = new Map<string | RegExp, any>(
        [
            // Exact path

            // Using named parameters, with last being optional
            [new RegExp("auth"), Auth],
            [new RegExp("dashboard"), Dashboard],
            ["*", Index]

        ]
    );
</script>
<Router {routes}/>

