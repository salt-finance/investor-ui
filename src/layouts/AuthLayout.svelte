<div class="flex w-screen flex-col lg:flex-row content-center">
  <div class="flex justify-center w-full">
    <div
      class="fixed top-4 mb-4 z-20 xl:max-w-screen-xl max-w-full w-full px-4 xl:px-0"
    >
      <IndexNavbar />
    </div>
    <div
      class="xl:max-w-screen-xl max-w-full w-full px-4 xl:px-0 flex flex-col justify-between gap-4 py-20 min-h-screen"
    >
      <div class="flex flex-col justify-end w-full gap-4 flex-grow">
        {#if currentRouteTitle !== undefined}
          <span
            class="capitalize my-0 mt-4 text-3xl font-extralight motion-preset-blur-up-lg motion-duration-500"
            >{currentRouteTitle}</span
          >
        {/if}
        <div
          class="flex flex-wrap z-10 flex-grow motion-translate-y-in-[20%] motion-opacity-in-[0%] motion-duration-[1.00s]/translate motion-duration-[1.00s]/opacity motion-ease-spring-bouncier"
        >
          <Router restoreScrollState={true} prefix={'/auth'} {routes}></Router>
        </div>
      </div>

      <Footer />
    </div>
  </div>
</div>

<script lang="ts">
  import Router, { location } from 'svelte-spa-router'; // components for this layout
  // pages for this layout
  import Login from 'views/auth/Login.svelte';
  import Register from 'views/auth/Register.svelte';
  import IndexNavbar from 'components/IndexNavbar.svelte';

  import Footer from 'components/Footer.svelte';
  const routes = {
    // Exact path
    '/login': Login,

    // Using named parameters, with last being optional
    '/register': Register,
    '*': Login
  };

  let currentRouteTitle = $state();

  location.subscribe((val) => {
    currentRouteTitle = undefined;
    var crumbs = val.split('/');
    currentRouteTitle = crumbs.at(crumbs.length - 1);
  });
</script>
