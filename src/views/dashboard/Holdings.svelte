<!--{#snippet actionSnippet(value: ISecurity)}-->
<!--  <TableDropdown {value} />-->
<!--{/snippet}-->
<div class="motion-preset-fade w-full block">
  <div class="flex justify-between">
    <span class="page-title m-4 block">
      Holdings
      {getTitle()}
    </span>
    {#if showTop && all.length > maxTop}
      <button
        class="base-button mb-3"
        onclick={() => {
          replace('/dashboard/holdings');
        }}
        >Show all
      </button>
    {/if}
  </div>

  <div class="card bg-opacity-40">
    {#if loading}
      <div class="h-8 m-4 flex items-center">
        <Loading />
      </div>
    {:else if mobile.current}
      <div class="flex flex-col">
        {#if filtered.length === 0}
          <span class="p-6"> No results found. </span>
        {:else}
          <span
            class="p-4 flex flex-col w-full bg-accent/20 dark:bg-accent-dark/20"
          >
            <span class="flex justify-between flex-wrap gap-2">
              Security name
              <span class="font-bold text-sm"> Ticker </span>
            </span>
            <span class="flex justify-between flex-wrap gap-2">
              <span> Gain / Loss </span>
              <span class="body-text dark-light-text">Market value</span>
            </span>
          </span>
          {#each filtered as holding}
            <button
              onclick={() => onRowTap(holding)}
              class="unset hover:bg-accent/30 dark:hover:bg-accent-dark/30"
            >
              <span class="flex w-full justify-between p-4">
                <span class="flex items-center w-full justify-between">
                  <RoundedImage
                    src={holding.securityLogoUrl}
                    fallBackText={holding.securityName}
                  />
                  <span class="flex flex-col w-[calc(100%-4rem)] gap-y-2">
                    <span class="flex justify-between flex-wrap gap-x-4">
                      {holding.securityName}
                      <span class="font-bold text-sm">{holding.symbol} </span>
                    </span>
                    <span class="flex justify-between flex-wrap gap-x-4">
                      <span
                        class="body-text {styleForValue(holding.averageROI)}"
                        >{formatPercentage(holding.averageROI)}</span
                      >
                      <span class="body-text dark-light-text"
                        >{currencyFormat()(holding.marketValue)}</span
                      >
                    </span>
                  </span>
                </span>
              </span>
            </button>
          {/each}
        {/if}
      </div>
    {:else}
      <CardTable
        {onRowTap}
        {columns}
        bind:data={filtered}
        sortIndex={7}
        sortDirection="desc"
      />
    {/if}
  </div>
</div>

<Tearsheet bind:this={tearsheetModal} />

<script lang="ts">
  import CardTable, {
    type TableColumn
  } from '../../components/Cards/CardTable.svelte';

  import { MediaQuery } from 'svelte/reactivity';
  import {
    currencyFormat,
    formatPercentage,
    styleForValue
  } from 'utils/formatTools.js';
  import { onDestroy, type SvelteComponent } from 'svelte';
  import Tearsheet from 'components/Modals/Tearsheet.svelte';

  import { replace } from 'svelte-spa-router';
  import RoundedImage from 'components/RoundedImage.svelte';
  import { accountStore, holdingsStore, fetchHoldings } from '@/store/account';
  import type { IHolding } from 'models/holding';
  import Loading from 'components/Loading.svelte';

  let all: IHolding[] = $state([]);
  let filtered: IHolding[] = $state([]);
  let loading = $state(true);

  const maxTop = 5;

  const accountSubscription = accountStore.subscribe((account) => {
    if (account === undefined || all.length > 0) {
      return;
    }

    fetchHoldings(account.id).finally(() => (loading = false));
  });

  const holdingsSubscription = holdingsStore.subscribe((holdings) => {
    if (holdings) {
      all = holdings;
      if (showTop && all.length > maxTop) {
        filtered = all?.filter((_, index) => index < maxTop);
      } else {
        filtered = all;
      }
    }
  });

  const getTitle = () => {
    if (filtered.length <= 0) {
      return '';
    }

    if (showTop && all.length !== filtered.length) {
      return `(${maxTop} of ${all.length})`;
    }
    return `(${all.length})`;
  };

  let { showTop } = $props<{
    showTop?: boolean;
  }>();

  onDestroy(() => {
    accountSubscription;
    holdingsSubscription;
  });

  let tearsheetModal: SvelteComponent | undefined = $state();
  const onRowTap = (data: IHolding) => {
    tearsheetModal?.show(undefined, data.securityId);
  };

  let mobile = new MediaQuery('max-width: 1024px');

  // Column definitions
  const columns: TableColumn<IHolding>[] = [
    {
      key: 'securityLogoUrl',
      header: '',
      sortable: false,
      type: 'image',
      imageFallBackProp: 'name'
    },
    { key: 'securityName', header: 'Security Name', sortable: true },
    {
      key: 'symbol',
      header: 'Ticker',
      sortable: true,
      bodyClasses: 'font-bold'
    },
    { key: 'openPrice', header: 'Price', sortable: true, format: 'currency' },
    {
      key: 'quantity',
      header:
        ' <div class="inline-flex flex-col"><span> Quantity</span> <span>(Shares)</span> </div> ',
      sortable: true,
      format: 'number'
    },
    { key: 'totalCost', header: 'Cost', sortable: true, format: 'currency' },

    {
      key: 'averageROI',
      header: 'Gain / Loss',
      type: 'gainLoss',
      format: 'percentage',
      sortable: true,
      childColumn: {
        key: 'totalGainLoss',
        header: 'Gain / Loss',
        type: 'gainLoss',
        format: 'currencyChange'
      }
    },

    {
      key: 'marketValue',
      header: 'Market value',
      sortable: true,
      format: 'currency'
    }
  ];
</script>
