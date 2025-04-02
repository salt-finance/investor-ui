<script lang="ts">
  // core components

  import CardDoghnutChart from 'components/Cards/CardDoghnutChart.svelte'
  import CardLineChart from 'components/Cards/CardLineChart.svelte'
  import Activity from './Activity.svelte'
  import Holdings from './Holdings.svelte'

  import { onDestroy, type SvelteComponent, tick, unmount } from 'svelte'
  import { fly } from 'svelte/transition'

  import { accountStore } from '@/store/account'
  import Loading from 'components/Loading.svelte'
  import type { IAccount } from 'models/account'
  import { staggerdTransition } from 'utils/animationTools'
  import { mountChart } from 'utils/chartTools'

  let roiChart: SvelteComponent | undefined = $state()
  let requiresFunding = $state(false)

  let loading = $state(true)

  let chartContainer: HTMLElement | undefined = $state()
  let chart: Record<string, any> | undefined

  let account: IAccount | undefined = $state()

  const accountSubscription = accountStore.subscribe(async (value) => {
    loading = false
    account = value
    requiresFunding = account !== undefined && account.fundingMethod == null

    // Wait one frame to allow the dialog to render
    await tick()
    if (chartContainer) {
      chart = mountChart(CardLineChart, chartContainer, {
        startingValue: value?.balance?.total,
        disabled: requiresFunding,
      })
    }
    roiChart?.show()
  })

  onDestroy(async () => {
    accountSubscription()
    if (chart) {
      await unmount(chart)
      chart = undefined
    }
  })
</script>

<span class="page-title my-4 flex gap-2 items-center">
  <span class="material-symbols-outlined skiptranslate thin">dashboard</span>
  Dashboard
</span>
{#if loading}
  <Loading />
{:else}
  <div class="w-full motion-preset-focus-lg motion-duration-500">
    <div
      class="grid gap-y-4 sm:gap-4 grid-rows-1 sm:grid-cols-6 md:grid-cols-8">
      <div
        class:opacity-50={requiresFunding}
        class="w-full card bg-opacity-40 col-span-2 sm:col-span-4 md:col-span-5 lg:col-span-6 motion-preset-fade">
        <div class="relative flex flex-col min-w-0 break-words w-full h-full">
          <div class="mb-0 px-4 py-3">
            <div class="w-full max-w-full flex-grow flex-1">
              <p class="text-sm uppercase mb-1 font-extrabold">
                Value over time
              </p>
              <h2
                class="text-neutral-500 dark:text-neutral-200 card-title font-extralight">
                Total value
              </h2>
            </div>
          </div>
          <div class="h-60 lg:h-72 xl:h-80 m-4 grid" bind:this={chartContainer}>
          </div>
        </div>
      </div>

      <div
        class:opacity-50={requiresFunding}
        class="col-span-2 sm:col-span-2 md:col-span-3 lg:col-span-2 overflow-hidden card bg-opacity-40 motion-preset-fade">
        <div
          class="relative flex flex-col min-w-0 break-words w-full h-full justify-start">
          <div class="mb-0 px-4 py-3">
            <div class="w-full max-w-full flex-grow flex-1">
              <p class="text-sm uppercase mb-1 font-extrabold">
                Average return on investment
              </p>
              <h2
                class="text-neutral-500 dark:text-neutral-200 card-title font-extralight">
                Performance
              </h2>
            </div>
          </div>
          <div
            class="aspect-[2] sm:aspect-square lg:h-72 xl:h-80 m-4 mb-0 grid">
            <CardDoghnutChart
              bind:this={roiChart}
              value={Math.round((account?.balance?.roi ?? 0) * 100)} />
          </div>
        </div>
      </div>
    </div>
    <div
      class="flex flex-wrap mt-4 gap-4"
      in:fly|global={staggerdTransition(4)}>
      <Activity />

      <Holdings showTop />
    </div>
  </div>
{/if}
