<!-- App.svelte -->
<script>
  // Admin Layout
  import Admin from "./layouts/Admin.svelte";
  // Auth Layout
  import Auth from "./layouts/Auth.svelte";

  // No Layout Pages
  import Router from 'svelte-spa-router';
  import Index from "./views/Index.svelte";
  import Landing from "./views/Landing.svelte";
  import Profile from "./views/Profile.svelte";



  let { url } = $props();


  const routes = {
    // Exact path
    '/': Index,

    // Using named parameters, with last being optional
    '/landing': Landing,
    '/admin/*': Admin,
    '/auth': Auth,
    '/auth/*': Auth,
    '/admin': Admin,
    '/admin/*': Admin,
    '/profile': Profile,
    // Catch-all
    // This is optional, but if present it must be the last
    '*': Landing,
}
</script>
<style>
:global(a.active) {
    color: red;
}
</style>

<Router {routes} />
