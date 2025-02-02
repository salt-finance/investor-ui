<Router {routes} />

<!-- App.svelte -->
<script lang="ts">
  // Admin Layout
  import Dashboard from './layouts/DashboardLayout.svelte';
  // Auth Layout
  // import Auth from './layouts/AuthLayout.svelte';
  import Signin from 'views/auth/Signin.svelte';
  import Register from 'views/auth/Register.svelte';
  // No Layout Pages
  import Router from 'svelte-spa-router';
  // import Index from './views/Index.svelte';

  const routes = new Map<string | RegExp, any>([
    // Exact path
    [new RegExp('dashboard'), Dashboard],
    [new RegExp('signin'), Signin],
    [new RegExp('signup'), Register],
    ['*', Signin]
  ]);
</script>
