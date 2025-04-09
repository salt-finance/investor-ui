<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@200;400;600;700;800&display=swap" rel="stylesheet">
<link  href="https://fonts.googleapis.com/css2?family=DM+Serif+Display:ital@0;1&display=swap" rel="stylesheet">
<link  href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&icon_names=alternate_email,backspace,cancel,category,close,dark_mode,dashboard,key,leaderboard,light_mode,lock,lock_open,menu,money,more_vert,night_sight_auto,north_east,person,pie_chart,priority_high,search,search_activity,settings,speed,storefront,swap_horiz,trending_down,trending_up&display=swap" rel="stylesheet">

<Router {routes} />

<!-- App.svelte -->
<script lang="ts">
  // Admin Layout
  import Dashboard from './layouts/DashboardLayout.svelte'
  // Auth Layout
  import Signin from 'views/auth/Signin.svelte'

  import Register from 'views/auth/Signup.svelte'
  // No Layout Pages
  import { onMount } from 'svelte'
  import Router from 'svelte-spa-router'

  const routes = new Map<string | RegExp, any>([
    // Exact path
    [new RegExp('dashboard'), Dashboard],
    [new RegExp('signin'), Signin],
    [new RegExp('signup'), Register],
    ['*', Signin]
  ]);

  if (process.env.NODE_ENV !== 'development') {
    onMount(async () => {
      let {posthog} = await import("posthog-js/");
      posthog.init('phc_faqICTnQr6DINP15c3R4tPyj1GbaGTsbDT6Ph05SNVm', {
        api_host: 'https://us.i.posthog.com',
        person_profiles: 'identified_only' // or 'always' to create profiles for anonymous users as well
      });
    });
  }
</script>
