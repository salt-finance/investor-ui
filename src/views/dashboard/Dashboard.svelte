<!--   in:blur|global={{ amount: 30, delay: 50, duration: 1000 }}
 -->
{#if loading}
  <Loading />
{:else}
  <div class="w-full">
    {#if requiresFunding && account !== undefined}
      <div
        class="grid gap-y-4 sm:gap-4 grid-rows-1 sm:grid-cols-6 md:grid-cols-8"
      >
        <div
          class="mb-4 px-4 py-3 glass-effect col-span-2 sm:col-span-4 md:col-span-5 lg:col-span-6"
        >
          <div class="w-full max-w-full flex-grow flex-1">
            <p class=" mb-1"> Fund your account to start investing </p>
            <h2
              class="text-neutral-500 dark:text-neutral-200 card-title text-2xl font-extralight"
            >
              Fund your account
            </h2>
          </div>
          <div class="mt-4 h-fit flex">
            <a
              href="/dashboard/settings/#fund"
              use:link
              class=" base-button bg-amber-500 hover:bg-amber-700 text-white hover:text-white hover:no-underline"
            >
              Fund now
              <span class="ml-4 material-symbols-outlined">money </span>
            </a>
          </div>
        </div>
      </div>
    {/if}

    <div
      class="grid gap-y-4 sm:gap-4 grid-rows-1 sm:grid-cols-6 md:grid-cols-8"
    >
      <div
        class:opacity-50={requiresFunding}
        class="w-full card bg-opacity-40 col-span-2 sm:col-span-4 md:col-span-5 lg:col-span-6 motion-preset-fade"
      >
        <div class="relative flex flex-col min-w-0 break-words w-full h-full">
          <div class="mb-0 px-4 py-3">
            <div class="w-full max-w-full flex-grow flex-1">
              <p class="text-sm uppercase mb-1 font-extrabold">
                Value over time
              </p>
              <h2
                class="text-neutral-500 dark:text-neutral-200 card-title font-extralight"
              >
                Total value
              </h2>
            </div>
          </div>
          <div class="h-60 lg:h-72 xl:h-80 m-4 grid">
            <CardLineChart bind:this={lineChart} />
          </div>
        </div>
      </div>

      <div
        class:opacity-50={requiresFunding}
        class="col-span-2 sm:col-span-2 md:col-span-3 lg:col-span-2 overflow-hidden card bg-opacity-40 motion-preset-fade"
      >
        <div
          class="relative flex flex-col min-w-0 break-words w-full h-full justify-start"
        >
          <div class="mb-0 px-4 py-3">
            <div class="w-full max-w-full flex-grow flex-1">
              <p class="text-sm uppercase mb-1 font-extrabold">
                Average return on investment
              </p>
              <h2
                class="text-neutral-500 dark:text-neutral-200 card-title font-extralight"
              >
                Performance
              </h2>
            </div>
          </div>
          <div
            class="aspect-[2] sm:aspect-square lg:h-72 xl:h-80 m-4 mb-0 grid"
          >
            <CardDoghnutChart
              bind:this={roiChart}
              value={Math.round((account?.balance?.roi ?? 0) * 100)}
            />
          </div>
        </div>
      </div>
    </div>
    <div
      class="flex flex-wrap mt-4 gap-4"
      in:fly|global={staggerdTransition(4)}
    >
      <Activity />

      <Holdings showTop />
    </div>
  </div>
{/if}

<script lang="ts">
  // core components

  import CardDoghnutChart from 'components/Cards/CardDoghnutChart.svelte';
  import CardLineChart from 'components/Cards/CardLineChart.svelte';
  import Activity from './Activity.svelte';
  import Holdings from './Holdings.svelte';

  import { onDestroy, type SvelteComponent } from 'svelte';
  import { fly } from 'svelte/transition';
  import { link } from 'svelte-spa-router';

  import { staggerdTransition } from 'utils/animationTools';
  import { accountStore } from '@/store/account';
  import Loading from 'components/Loading.svelte';
  import type { IAccount } from 'models/account';

  let lineChart: SvelteComponent | undefined = $state();
  let roiChart: SvelteComponent | undefined = $state();
  let requiresFunding = $state(true);

  let loading = $state(true);

  let account: IAccount | undefined = $state();

  const accountSubscription = accountStore.subscribe((value) => {
    loading = false;
    account = value;
    requiresFunding = account !== undefined && account.fundingMethod == null;
    setTimeout(() => {
      lineChart?.show(value?.balance?.total, true);
      roiChart?.show();
    }, 100);
  });

  onDestroy(accountSubscription);
</script>
