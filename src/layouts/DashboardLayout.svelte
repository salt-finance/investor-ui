<div class="flex flex-col lg:flex-row justify-center w-screen flex-wrap px-5">
  <div
    class="flex justify-center w-full min-h-fit xl:max-w-screen-2xl relative"
  >
    <div class="navbar-fixed top-4 w-full px-5 xl:px-0 z-20">
      <IndexNavbar isLoggedIn={true} />
    </div>

    <div
      class=" w-full flex flex-col justify-between gap-4 pt-[calc(80px+2rem)] pb-10 min-h-screen"
    >
      <div class="flex flex-col justify-end w-full gap-4 flex-grow">
        <HeaderStats />

        <div class="flex flex-wrap z-10 flex-grow flex-col content-center">
          {#if loading}
            <div class="mx-auto h-10 flex items-center">
              <Loading />
            </div>
          {:else}
            <Router
              on:routeLoaded={navigateToTop}
              restoreScrollState={true}
              {routes}
            />
          {/if}
        </div>
      </div>
      <FooterAdmin />
    </div>
  </div>
</div>

<script lang="ts">
  import Router, { replace } from 'svelte-spa-router';
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
  import { userStore } from '@/store/user';
  import { getUser } from '@/api/api_user';
  import { tokenTest } from '@/api/api_auth';
  import Portfolio from 'views/dashboard/Portfolio.svelte';
  import { fetchAccounts } from '@/store/account';
  import Loading from 'components/Loading.svelte';

  const routes = {
    '/dashboard/holdings': Holdings,
    '/dashboard/activity': Activity,
    '/dashboard/market': Market,
    '/dashboard/settings': Settings,
    '/dashboard/portfolio': Portfolio,
    '/dashboard/sector/:sectorId': SectorDetail,
    // '/': Dashboard,
    '*': Dashboard
  };

  let loading = $state(true);

  tokenTest().catch(() => {
    replace('/');
  });

  const navigateToTop = () => {
    document.body.scroll({ behavior: 'smooth', top: 0 });
  };

  getUser()
    .then((user) => {
      if (user.response) {
        userStore.set(user.response);
        loading = false;
      }
    })
    .catch(() => {
      replace('/');
    });

  fetchAccounts();
</script>
