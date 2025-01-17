<div class="flex flex-col lg:flex-row justify-center w-screen flex-wrap">
  <div
    class="flex justify-center w-full min-h-fit xl:max-w-screen-2xl relative px-5"
  >
    <div class="navbar-fixed top-4 w-full z-20 px-5">
      <IndexNavbar isLoggedIn={true} />
    </div>

    <div
      class=" w-full xl:px-0 flex flex-col justify-between gap-4 pt-20 pb-10 min-h-screen"
    >
      <div class="flex flex-col justify-end w-full gap-4 flex-grow pt-8">
        <HeaderStats />
        <!--{#if currentRouteTitle !== undefined}-->
        <!--  <span-->
        <!--    class="capitalize text-3xl font-extralight motion-preset-blur-up-lg motion-duration-500"-->
        <!--    >{currentRouteTitle}</span-->
        <!--  >-->
        <!--{/if}-->
        <div class="flex flex-wrap z-10 flex-grow flex-col content-start">
          <Router restoreScrollState={false} {routes} />
        </div>
      </div>
      <FooterAdmin />
    </div>
  </div>
</div>

<script lang="ts">
  import Router from 'svelte-spa-router';
  // components for this layout
  import FooterAdmin from 'components/Footer.svelte';
  import HeaderStats from 'components/Headers/HeaderStats.svelte';
  // pages for this layout
  import IndexNavbar from 'components/IndexNavbar.svelte';
  import Activity from 'views/dashboard/Activity.svelte';
  import Dashboard from 'views/dashboard/Dashboard.svelte';
  import Holdings from 'views/dashboard/Holdings.svelte';
  import Market from 'views/dashboard/Market.svelte';
  import Settings from 'views/dashboard/Settings.svelte';
  import SectorDetail from 'views/dashboard/market/SectorDetail.svelte';

  const routes = {
    '/dashboard/holdings': Holdings,
    '/dashboard/activity': Activity,
    '/dashboard/market': Market,
    '/dashboard/settings': Settings,
    '/dashboard/sector/:sectorId': SectorDetail,
    // '/': Dashboard,
    '*': Dashboard
  };

  // let currentRouteTitle = $state();
  //
  // location.subscribe((val) => {
  //   currentRouteTitle = undefined;
  //   let crumbs = val.split('/');
  //   currentRouteTitle = crumbs.at(crumbs.length - 1);
  // });
</script>
