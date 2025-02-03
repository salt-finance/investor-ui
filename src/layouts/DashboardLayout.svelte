<div class="flex flex-col lg:flex-row justify-center w-screen flex-wrap px-5">
  <div
    class="flex justify-center w-full min-h-fit xl:max-w-screen-2xl relative"
  >
    <div class="navbar-fixed top-4 w-full px-5 xl:px-0 z-20">
      <IndexNavbar isLoggedIn={true} />
    </div>

    <div
      class=" w-full flex flex-col justify-between gap-4 pt-[100px] pb-10 min-h-screen"
    >
      <div class="flex flex-col justify-end w-full gap-4 flex-grow pt-8">
        <HeaderStats />
        <div class="flex flex-wrap z-10 flex-grow flex-col content-start">
          <Router restoreScrollState={false} {routes} />
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
  import { getUser } from '@/api/user/api_user';
  import { tokenTest } from '@/api/user/api_auth';

  const routes = {
    '/dashboard/holdings': Holdings,
    '/dashboard/activity': Activity,
    '/dashboard/market': Market,
    '/dashboard/settings': Settings,
    '/dashboard/sector/:sectorId': SectorDetail,
    // '/': Dashboard,
    '*': Dashboard
  };

  tokenTest().catch(() => {
    replace('/');
  });

  getUser().then((user) => {
    if (user.response) {
      userStore.set(user.response);
    }
  });
</script>
