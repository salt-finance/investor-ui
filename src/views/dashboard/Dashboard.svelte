<!--   in:blur|global={{ amount: 30, delay: 50, duration: 1000 }}
 -->
<div class="w-full">
  <div class="grid gap-4 grid-cols-2 md:grid-cols-8">
    <div
      class="w-full glass-effect sm:col-span-5 col-span-2 lg:col-span-6 motion-translate-x-in-[-30%] motion-translate-y-in-[40%] motion-opacity-in-[0%] motion-blur-in-[20px]"
    >
      <div class="relative flex flex-col min-w-0 break-words w-full h-full">
        <div class="mb-0 px-4 py-3">
          <div class="w-full max-w-full flex-grow flex-1">
            <h6 class="uppercase mb-1 font-extrabold">Total value over time</h6>
            <h2
              class="text-neutral-500 dark:text-neutral-200 text-4xl font-extralight"
            >
              Performance
            </h2>
          </div>
        </div>
        <CardLineChart />
      </div>
    </div>
    <div
      class="overflow-hidden col-span-2 md:col-span-3 lg:col-span-2 w-full glass-effect motion-translate-x-in-[30%] motion-translate-y-in-[40%] motion-opacity-in-[0%] motion-blur-in-[20px] motion-delay-200"
    >
      <div
        class="relative flex flex-col min-w-0 break-words w-full h-full justify-between"
      >
        <div class="mb-0 px-4 py-3">
          <div class="w-full max-w-full flex-grow flex-1">
            <h6 class="uppercase mb-1 font-extrabold">
              Portfolio distribution by category
            </h6>
            <h2
              class="text-neutral-500 dark:text-neutral-200 text-4xl font-extralight"
            >
              Spread
            </h2>
          </div>
        </div>
        <CardPieChart />
      </div>
    </div>

    <div
      class="sm:col-span-5 col-span-2 order-2 md:-order-none lg:col-span-6 w-full glass-effect motion-translate-x-in-[-30%] motion-translate-y-in-[40%] motion-opacity-in-[0%] motion-blur-in-[20px] motion-delay-700"
    >
      <div class="relative flex flex-col min-w-0 break-words w-full h-full">
        <div class="mb-0 px-4 py-3">
          <div class="w-full max-w-full flex-grow flex-1">
            <h6 class="uppercase mb-1 font-extrabold">
              Performance vs Previous year
            </h6>
            <h2
              class="text-neutral-500 dark:text-neutral-200 text-4xl font-extralight"
            >
              Comparison
            </h2>
          </div>
        </div>
        <CardBarChart />
      </div>
    </div>
    <div
      class="col-span-2 md:col-span-3 lg:col-span-2 overflow-hidden glass-effect motion-translate-x-in-[30%] motion-translate-y-in-[40%] motion-opacity-in-[0%] motion-blur-in-[20px] motion-delay-1000"
    >
      <div
        class="relative flex flex-col min-w-0 break-words w-full h-full justify-between"
      >
        <div class="mb-0 px-4 py-3">
          <div class="w-full max-w-full flex-grow flex-1">
            <h6 class="uppercase mb-1 font-extrabold">
              Average profit to loss ratio
            </h6>
            <h2
              class="text-neutral-500 dark:text-neutral-200 text-4xl font-extralight"
            >
              Profit/Loss
            </h2>
          </div>
        </div>
        <CardDoghnutChart />
      </div>
    </div>
  </div>
  <div class="flex flex-wrap mt-4 gap-4" in:fly|global={staggerdTransition(4)}>
    <Activity />

    <Holdings />
  </div>
</div>

<script lang="ts">
  // core components
  import CardBarChart from 'components/Cards/CardBarChart.svelte';
  import CardDoghnutChart from 'components/Cards/CardDoghnutChart.svelte';
  import CardLineChart from 'components/Cards/CardLineChart.svelte';
  import CardPieChart from 'components/Cards/CardPieChart.svelte';
  import Activity from './Activity.svelte';
  import Holdings from './Holdings.svelte';

  import { fly } from 'svelte/transition';
  import { staggerdTransition } from 'utils/animationTools';
</script>
