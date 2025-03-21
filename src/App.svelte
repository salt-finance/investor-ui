<Router {routes} />

<!-- App.svelte -->
<script lang="ts">
  // Admin Layout
  import Dashboard from './layouts/DashboardLayout.svelte';
  // Auth Layout
  import Signin from 'views/auth/Signin.svelte';

  import Register from 'views/auth/Signup.svelte';
  // No Layout Pages
  import Router from 'svelte-spa-router';
  import posthog from 'posthog-js';
  import { onMount } from 'svelte';

  const routes = new Map<string | RegExp, any>([
    // Exact path
    [new RegExp('dashboard'), Dashboard],
    [new RegExp('signin'), Signin],
    [new RegExp('signup'), Register],
    ['*', Signin]
  ]);

  onMount(() => {
    posthog.init('phc_faqICTnQr6DINP15c3R4tPyj1GbaGTsbDT6Ph05SNVm', {
      api_host: 'https://us.i.posthog.com',
      person_profiles: 'identified_only' // or 'always' to create profiles for anonymous users as well
    });
  });
</script>
