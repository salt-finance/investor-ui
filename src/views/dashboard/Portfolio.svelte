<script lang="ts">
  // core components
  import CardBarChart from 'components/Cards/CardBarChart.svelte'
  import CardDoghnutChart from 'components/Cards/CardDoghnutChart.svelte'
  import CardLineChart from 'components/Cards/CardLineChart.svelte'
  import CardPieChart from 'components/Cards/CardPieChart.svelte'

  import { accountStore } from '@/store/account'
  import type { IAccount } from 'models/account'
  import { onDestroy, type SvelteComponent, tick, unmount } from 'svelte'
  import { mountChart } from 'utils/chartTools'

  let roiChart: SvelteComponent | undefined = $state()

  let chartContainer: HTMLElement | undefined = $state()
  let chart: Record<string, any> | undefined

  let account: IAccount | undefined = $state()

  let requiresFunding = $state(false)

  const accountSubscription = accountStore.subscribe(async (value) => {
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

<!--   in:blur|global={{ amount: 30, delay: 50, duration: 1000 }}
 -->

<span class="page-title my-4 flex gap-2 items-center">
  <span class="material-symbols-outlined skiptranslate thin">pie_chart</span>
  Portfolio
</span>

<div class="w-full motion-preset-focus-lg motion-duration-150" class:opacity-50={requiresFunding}>
  <div class="grid gap-y-4 sm:gap-4 grid-rows-1 md:grid-cols-8">
    <div
      class="w-full glass-effect col-span-2 sm:col-span-5 lg:col-span-6 motion-preset-fade">
      <div class="relative flex flex-col min-w-0 break-words w-full h-full">
        <div class="mb-0 px-4 py-3">
          <div class="w-full max-w-full flex-grow flex-1">
            <p class="text-sm uppercase mb-1 font-extrabold">Value over time</p>
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
      class="overflow-hidden col-span-2 md:col-span-3 lg:col-span-2 w-full glass-effect motion-preset-fade">
      <div
        class="relative flex flex-col min-w-0 break-words w-full h-full justify-between">
        <div class="mb-0 px-4 py-3">
          <div class="w-full max-w-full flex-grow flex-1">
            <p class="text-sm uppercase mb-1 font-extrabold">
              Portfolio distribution by category
            </p>
            <h2
              class="text-neutral-500 dark:text-neutral-200 card-title font-extralight">
              Spread
            </h2>
          </div>
        </div>
        <CardPieChart />
      </div>
    </div>

    <div
      class="sm:col-span-5 col-span-2 order-2 md:-order-none lg:col-span-6 w-full glass-effect motion-preset-fade">
      <div class="relative flex flex-col min-w-0 break-words w-full h-full">
        <div class="mb-0 px-4 py-3">
          <div class="w-full max-w-full flex-grow flex-1">
            <p class="text-sm uppercase mb-1 font-extrabold">
              Performance vs Previous year
            </p>
            <h2
              class="text-neutral-500 dark:text-neutral-200 card-title font-extralight">
              Comparison
            </h2>
          </div>
        </div>
        <div class="h-60 md:h-full lg:h-72 xl:h-80 m-4 mt-0 grid">
          <CardBarChart />
        </div>
      </div>
    </div>
    <div
      class="col-span-2 sm:col-span-3 lg:col-span-2 overflow-hidden glass-effect motion-preset-fade">
      <div
        class="relative flex flex-col min-w-0 break-words w-full h-full justify-between">
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
        <div class="aspect-[2] sm:aspect-square lg:h-72 xl:h-80 m-4 mb-0 grid">
          <CardDoghnutChart
            bind:this={roiChart}
            value={Math.round((account?.balance?.roi ?? 0) * 100)} />
        </div>
      </div>
    </div>
  </div>
</div>
