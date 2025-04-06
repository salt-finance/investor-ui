<script lang="ts">
  import Router, { link, type RouteLoadedEvent } from 'svelte-spa-router'
  // components for this layout
  import FooterAdmin from 'components/Footer.svelte'
  import HeaderStats from 'components/Headers/HeaderStats.svelte'
// pages for this layout
  import StillThere from 'components/Modals/StillThere.svelte'

  import { logout, tokenTest } from '@/api/api_auth'
  import { accountStore, fetchAccounts } from '@/store/account'
  import { fetchUser } from '@/store/user'
  import IndexNavbar from 'components/IndexNavbar.svelte'
  import Loading from 'components/Loading.svelte'
  import type { IAccount } from 'models/account'
  import { onDestroy, onMount } from 'svelte'
  import Activity from 'views/dashboard/Activity.svelte'
  import Dashboard from 'views/dashboard/Dashboard.svelte'
  import Holdings from 'views/dashboard/Holdings.svelte'
  import Market from 'views/dashboard/Market.svelte'
  import Portfolio from 'views/dashboard/Portfolio.svelte'
  import Settings from 'views/dashboard/Settings.svelte'
  import SectorDetail from 'views/dashboard/market/SectorDetail.svelte'

  const routes = {
    '/dashboard/holdings': Holdings,
    '/dashboard/activity': Activity,
    '/dashboard/market': Market,
    '/dashboard/settings': Settings,
    '/dashboard/settings/*': Settings,
    '/dashboard/portfolio': Portfolio,
    '/dashboard/sector/:sectorId': SectorDetail,
    // '/': Dashboard,
    '*': Dashboard,
  }

  let loading = $state(true)
  let isSettingsPage = $state(false)

  let requiresFunding = $state(false)

  onMount(async () => {
    const result = await tokenTest()

    if (result.error) {
      await logout()
      return
    }
    await fetchUser()
    await fetchAccounts()
    loading = false
  })

  const navigateToTop = (e: RouteLoadedEvent) => {
    isSettingsPage = e.detail.location.includes('settings')
    document.body.scroll({ behavior: 'smooth', top: 0 })
  }

  let account: IAccount | undefined = $state()

  const accountSubscription = accountStore.subscribe((value) => {
    account = value
    requiresFunding = account !== undefined && account.fundingMethod == null
  })
  onDestroy(accountSubscription)
</script>

<div class="flex flex-col lg:flex-row justify-center w-screen flex-wrap">
  <div
    class="flex justify-center w-full min-h-fit xl:max-w-screen-xl relative px-5 xl:px-0">
       <IndexNavbar isLoggedIn={true} />

    <div
      class=" w-full flex flex-col justify-between gap-4 pt-[calc(80px+2rem)] pb-10 min-h-screen">
      <div class="flex flex-col justify-end w-full gap-4 flex-grow">
        {#if requiresFunding && account !== undefined}
          {#if !isSettingsPage}
            <div
              class="mb-0 px-4 py-3 glass-effect col-span-2 sm:col-span-4 md:col-span-5 lg:col-span-6">
              <div class="w-full max-w-full flex-grow flex-1">
                <p class=" mb-1">Fund your account to start investing</p>
                <h2
                  class="text-neutral-500 dark:text-neutral-200 card-title text-2xl font-extralight">
                  Fund your account
                </h2>
              </div>
              <div class="mt-4 h-fit flex">
                <a
                  href="/dashboard/settings"
                  use:link
                  class=" base-button bg-emerald-600 hover:bg-emerald-700 text-white hover:text-white hover:no-underline">
                  Fund now
                  <span
                    class="ml-4 material-symbols-outlined thin text-[1.5rem]">
                    money
                  </span>
                </a>
              </div>
            </div>
          {/if}
        {:else}
          <HeaderStats />
        {/if}

        <div class="flex flex-wrap z-10 flex-grow flex-col content-center">
          {#if loading}
            <div class="mx-auto h-10 flex items-center">
              <Loading />
            </div>
          {:else}
            <Router
              on:routeLoaded={navigateToTop}
              restoreScrollState={true}
              {routes} />
          {/if}
        </div>
      </div>
      <FooterAdmin />
    </div>
  </div>

  <StillThere />
</div>
