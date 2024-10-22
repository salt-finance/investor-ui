<!-- App.svelte -->
<script>
  import { Route, Router } from "svelte-routing";
  // Admin Layout
  import Admin from "./layouts/Admin.svelte";
  // Auth Layout
  import Auth from "./layouts/Auth.svelte";

  // No Layout Pages
  import Index from "./views/Index.svelte";
  import Landing from "./views/Landing.svelte";
  import Profile from "./views/Profile.svelte";

let { basepath } = $props();
  console.log(basepath);
  console.log(window);
</script>

<Router  {basepath}>
  <!-- admin layout -->
  <Route path="admin/*admin" component={Admin} />
  <!-- auth layout -->
  <Route path="auth/*auth" component={Auth} />
  <!-- no layout pages -->
  <Route path="landing" component={Landing} />
  <Route path="profile" component={Profile} />
  <Route path="/" component={Index} />
</Router>
